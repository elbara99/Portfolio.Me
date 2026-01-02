import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MessageSquare, Clock, Video, Globe, CheckSquare, ChevronLeft, ChevronRight, Copy, Linkedin, Github } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore, startOfToday } from "date-fns";
import headshot from "@/assets/headshot.png";

const Contact = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"book" | "message">("book");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", subject: "", message: "", phone: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookCall = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select date and time",
        description: "Choose a date and time slot to book your call.",
        variant: "destructive",
      });
      return;
    }

    // Open Google Meet or calendar link
    const dateStr = format(selectedDate, "yyyyMMdd");
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=30 Min Meeting with Elbara&dates=${dateStr}/${dateStr}&details=Meeting scheduled via portfolio website`;
    window.open(calendarUrl, "_blank");
    
    toast({
      title: "Redirecting to calendar",
      description: `Meeting scheduled for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}`,
    });
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
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">Contact</p>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">
              Let's Get <span className="italic bg-gradient-to-r from-primary via-neon-purple to-neon-pink bg-clip-text text-transparent">In Touch</span>
            </h1>
            
            {/* Email */}
            <button 
              onClick={copyEmail}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <Copy className="w-4 h-4" />
              <span>elbaraemoueffek@gmail.com</span>
            </button>
            
            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mb-8">
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

          {/* Tabs */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex rounded-full border border-border/50 p-1 bg-card/50">
              <button
                onClick={() => setActiveTab("book")}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === "book"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Calendar className="w-4 h-4" />
                Book a Call
              </button>
              <button
                onClick={() => setActiveTab("message")}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === "message"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === "book" ? (
            <div className="max-w-5xl mx-auto">
              <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
                <div className="grid md:grid-cols-[280px_1fr_220px]">
                  {/* Left - Meeting Info */}
                  <div className="p-6 border-b md:border-b-0 md:border-r border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={headshot} 
                        alt="Elbara Mouaffak"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Elbara Mouaffak</p>
                    <h3 className="text-xl font-bold mb-4">30 Min Meeting</h3>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <CheckSquare className="w-4 h-4" />
                        <span>Requires confirmation</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>30m</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Video className="w-4 h-4 text-green-500" />
                        <span>Google Meet</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Globe className="w-4 h-4" />
                        <span>Africa/Algiers</span>
                      </div>
                    </div>
                  </div>

                  {/* Center - Calendar */}
                  <div className="p-6 border-b md:border-b-0 md:border-r border-border/50">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-medium">
                        {format(currentMonth, "MMMM")} <span className="text-muted-foreground">{format(currentMonth, "yyyy")}</span>
                      </h4>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={prevMonth}
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={nextMonth}
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                        <div key={day} className="py-2 text-xs text-muted-foreground font-medium">
                          {day}
                        </div>
                      ))}
                      
                      {emptyDays.map((_, index) => (
                        <div key={`empty-${index}`} className="py-2" />
                      ))}
                      
                      {days.map((day) => {
                        const isPast = isBefore(day, today);
                        const isSelected = selectedDate && isSameDay(day, selectedDate);
                        const isTodayDate = isToday(day);
                        
                        return (
                          <button
                            key={day.toString()}
                            onClick={() => !isPast && setSelectedDate(day)}
                            disabled={isPast}
                            className={`
                              py-2 rounded-lg text-sm font-medium transition-all relative
                              ${isPast 
                                ? "text-muted-foreground/30 cursor-not-allowed" 
                                : "hover:bg-muted cursor-pointer"
                              }
                              ${isSelected 
                                ? "bg-foreground text-background" 
                                : ""
                              }
                              ${!isPast && !isSelected 
                                ? "bg-muted/50" 
                                : ""
                              }
                            `}
                          >
                            {format(day, "d")}
                            {isTodayDate && !isSelected && (
                              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right - Time Slots */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">
                        {selectedDate ? (
                          <>
                            {format(selectedDate, "EEE")} <span className="text-muted-foreground">{format(selectedDate, "dd")}</span>
                          </>
                        ) : (
                          "Select a date"
                        )}
                      </h4>
                      <div className="flex items-center gap-1 text-xs">
                        <button
                          onClick={() => setTimeFormat("12h")}
                          className={`px-2 py-1 rounded ${timeFormat === "12h" ? "bg-muted" : ""}`}
                        >
                          12h
                        </button>
                        <button
                          onClick={() => setTimeFormat("24h")}
                          className={`px-2 py-1 rounded ${timeFormat === "24h" ? "bg-muted" : ""}`}
                        >
                          24h
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                      {(timeFormat === "12h" ? timeSlots : timeSlots24h).map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          disabled={!selectedDate}
                          className={`
                            w-full py-2.5 px-4 rounded-lg border text-sm font-medium transition-all
                            ${selectedTime === time
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border/50 hover:border-border text-foreground"
                            }
                            ${!selectedDate ? "opacity-50 cursor-not-allowed" : ""}
                          `}
                        >
                          {time}
                        </button>
                      ))}
                    </div>

                    {selectedDate && selectedTime && (
                      <button
                        onClick={handleBookCall}
                        className="w-full mt-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                      >
                        Confirm Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Send Message Form */
            <div className="max-w-lg mx-auto">
              <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="contact@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Subject of your request"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                      Description of your project
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-y"
                      placeholder="Brief description of your project"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="+213 778 877 361"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-4"
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
};

export default Contact;
