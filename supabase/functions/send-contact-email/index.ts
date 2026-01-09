import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
  topic?: string;
  phone?: string;
  date?: string;
  time?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }
    const resend = new Resend(resendApiKey);

    const { name, email, message, topic, phone, date, time }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, topic, date, time });

    // Validate input
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Construct Google Calendar Link
    let gCalLink = "";
    if (date && time) {
      try {
        // Parse Date: "2026-01-10" -> "20260110"
        const dateStr = date.replace(/-/g, "");

        // Parse Time: "4:00pm" -> "160000"
        let [hoursStr, minutesStr] = time.replace(/(am|pm)/i, "").trim().split(":");
        let hours = parseInt(hoursStr);
        const minutes = parseInt(minutesStr);

        if (time.toLowerCase().includes("pm") && hours < 12) hours += 12;
        if (time.toLowerCase().includes("am") && hours === 12) hours = 0;

        // Format Start Time
        const startDateTime = new Date(0); // Helper to calculate end time easily
        startDateTime.setHours(hours, minutes, 0);

        const pad = (n: number) => n.toString().padStart(2, "0");
        const startTimeStr = `${pad(hours)}${pad(minutes)}00`;

        // Calculate End Time (Start + 30 mins)
        const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);
        const endHours = endDateTime.getHours();
        const endMinutes = endDateTime.getMinutes();
        const endTimeStr = `${pad(endHours)}${pad(endMinutes)}00`;

        // Construct Dates Param: YYYYMMDDTHHmmss/YYYYMMDDTHHmmss
        // Note: We use local time (no 'Z') so it adapts to the user's calendar timezone.
        const datesParam = `${dateStr}T${startTimeStr}/${dateStr}T${endTimeStr}`;

        const eventTitle = `Consultation: ${name} - ${topic || "General"}`;
        const eventDetails = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nTopic: ${topic}\nMessage: ${message}`;
        const location = "Google Meet";

        // Add client email to 'add' parameter to auto-invite them
        gCalLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(location)}&dates=${datesParam}&add=${encodeURIComponent(email)}`;

      } catch (e) {
        console.error("Error generating calendar link:", e);
        // Fallback to simple link without dates if parsing fails
        const eventTitle = `Consultation: ${name}`;
        gCalLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&add=${encodeURIComponent(email)}`;
      }
    }

    // Send email to the portfolio owner
    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["elbaraemoueffek@gmail.com"],
      subject: `New Consultation Request: ${topic || "General Inquiry"} from ${name}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Topic:</strong> ${topic || "Not specified"}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Requested Date:</strong> ${date || "Not specified"}</p>
        <p><strong>Requested Time:</strong> ${time || "Not specified"}</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f0f9ff; border-left: 4px solid #0284c7; border-radius: 4px;">
          <p style="margin: 0; font-weight: bold; color: #0284c7;">Action Required:</p>
          <p style="margin: 5px 0;">Click below to add this to your calendar. <strong>The client (${email}) is already added as a guest.</strong></p>
          <p style="margin: 5px 0 15px 0;">When you click "Save" in Google Calendar, choose <strong>"Send"</strong> to email the invitation to the client.</p>
          <a href="${gCalLink}" style="display: inline-block; padding: 10px 20px; background-color: #0284c7; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">📅 Add to Calendar & Invite Client</a>
        </div>

        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

Deno.serve(handler);
