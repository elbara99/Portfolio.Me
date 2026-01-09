import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, Video, Globe, CheckSquare, ChevronLeft, ChevronRight, Copy, Linkedin, Github } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, startOfToday } from "date-fns";
import headshot from "@/assets/headshot.png";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
    phone: "",
  });

  const timeSlots = [
    "6:30am", "7:00am", "7:30am", "8:00am", "8:30am", "9:00am",
    "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm",
    "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm",
    "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm"
  ];

  const timeSlots24h = [
    "06:30", "07:00", "07:30", "08:00", "08:30", "09:00",
    "09:30", "10:00", "10:30", "11:00", "11:30", "12:00",
    "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Date & Time Required",
        description: "Please select a date and time for your consultation.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          ...formData,
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
        },
      });

      if (error) throw error;

      toast({
        title: "Request Sent!",
        description: `Consultation requested for ${format(selectedDate, "MMM d")} at ${selectedTime}. I'll confirm shortly!`,
      });
      setFormData({ name: "", email: "", topic: "", message: "", phone: "" });
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("elbaraemoueffek@gmail.com");
    toast({
      title: "Email copied!",
      description: "Email address copied to clipboard.",
    });
  };

  // Calendar logic
  const today = startOfToday();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get starting day offset (0 = Sunday)
  const startDay = monthStart.getDay();
  const emptyDays = Array(startDay).fill(null);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">Contact</p>
              <h1 className="text-4xl md:text-5xl font-serif mb-6">
                Book Your <span className="italic bg-gradient-to-r from-primary via-neon-purple to-neon-pink bg-clip-text text-transparent">Free Consultation</span>
              </h1>

              {/* Email & Social */}
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>elbaraemoueffek@gmail.com</span>
                </button>

                <div className="flex items-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/elbara-mouaffak-781655206/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/elbara99"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Unified Booking Layout */}
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">

                {/* Left Column: Calendar & Time */}
                <div className="space-y-6">
                  <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
                    {/* Meeting Info Header */}
                    <div className="p-6 border-b border-border/50 bg-muted/20">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={headshot}
                          alt="Elbara Mouaffak"
                          className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div>
                          <p className="text-sm text-muted-foreground">Elbara Mouaffak</p>
                          <h3 className="text-lg font-bold">30 Min Consultation</h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>30 min</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Video className="w-4 h-4 text-green-500" />
                          <span>Google Meet</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Globe className="w-4 h-4" />
                          <span>Africa/Algiers</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 grid md:grid-cols-2 gap-6">
                      {/* Calendar */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-sm">
                            {format(currentMonth, "MMMM yyyy")}
                          </h4>
                          <div className="flex gap-1">
                            <button onClick={prevMonth} className="p-1 hover:bg-muted rounded"><ChevronLeft className="w-4 h-4" /></button>
                            <button onClick={nextMonth} className="p-1 hover:bg-muted rounded"><ChevronRight className="w-4 h-4" /></button>
                          </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                            <div key={d} className="text-muted-foreground py-1">{d}</div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                          {emptyDays.map((_, i) => <div key={`empty-${i}`} />)}
                          {days.map(day => {
                            const isPast = isBefore(day, today);
                            const isSelected = selectedDate && isSameDay(day, selectedDate);
                            return (
                              <button
                                key={day.toString()}
                                onClick={() => !isPast && setSelectedDate(day)}
                                disabled={isPast}
                                className={`
                                  aspect-square rounded-md text-sm flex items-center justify-center transition-all
                                  ${isSelected ? "bg-primary text-primary-foreground font-bold" : ""}
                                  ${!isPast && !isSelected ? "hover:bg-muted" : "text-muted-foreground/30 cursor-not-allowed"}
                                  ${isToday(day) && !isSelected ? "border border-primary/50" : ""}
                                `}
                              >
                                {format(day, "d")}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div className="border-t md:border-t-0 md:border-l border-border/50 pt-6 md:pt-0 md:pl-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-sm">
                            {selectedDate ? format(selectedDate, "EEE, MMM d") : "Select date"}
                          </h4>
                          <div className="flex text-[10px] bg-muted rounded p-0.5">
                            <button onClick={() => setTimeFormat("12h")} className={`px-2 py-0.5 rounded ${timeFormat === "12h" ? "bg-background shadow-sm" : ""}`}>12h</button>
                            <button onClick={() => setTimeFormat("24h")} className={`px-2 py-0.5 rounded ${timeFormat === "24h" ? "bg-background shadow-sm" : ""}`}>24h</button>
                          </div>
                        </div>

                        <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2 scrollbar-thin">
                          {(timeFormat === "12h" ? timeSlots : timeSlots24h).map(time => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              disabled={!selectedDate}
                              className={`
                                w-full py-2 px-3 rounded text-sm border transition-all text-left
                                ${selectedTime === time
                                  ? "border-primary bg-primary/5 text-primary font-medium"
                                  : "border-border/50 hover:border-border"}
                                ${!selectedDate ? "opacity-50 cursor-not-allowed" : ""}
                              `}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 md:p-8 h-fit">
                  <h3 className="text-xl font-bold mb-6">Your Details</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20 outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20 outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Topic</label>
                      <select
                        required
                        value={formData.topic}
                        onChange={e => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
                      >
                        <option value="" disabled>Select a topic...</option>
                        <option value="AI Implementation">AI Implementation</option>
                        <option value="Automation">Automation</option>
                        <option value="Chatbots">Chatbots</option>
                        <option value="Workflows">Workflows</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Phone (Optional)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20 outline-none"
                        placeholder="+1 234 567 890"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Project Description</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-lg bg-foreground text-background font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 mt-2"
                    >
                      {isSubmitting ? "Sending Request..." : (
                        selectedDate && selectedTime
                          ? `Book for ${format(selectedDate, "MMM d")} at ${selectedTime}`
                          : "Select Date & Time to Book"
                      )}
                    </button>

                    {!selectedDate && (
                      <p className="text-xs text-center text-muted-foreground">
                        * Please select a date and time from the calendar to proceed.
                      </p>
                    )}
                  </form>
                </div>

              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
