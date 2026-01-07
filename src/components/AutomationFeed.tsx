import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, CheckCircle2, Clock, Zap, Database, Mail, MessageSquare } from "lucide-react";

const activities = [
    { id: 1, type: "n8n", action: "Lead Qualification", status: "Success", time: "Just now", icon: Zap, color: "text-primary" },
    { id: 2, type: "AI", action: "Content Generation", status: "Success", time: "2m ago", icon: MessageSquare, color: "text-neon-purple" },
    { id: 3, type: "CRM", action: "Database Sync", status: "Success", time: "5m ago", icon: Database, color: "text-neon-green" },
    { id: 4, type: "Email", action: "Automated Follow-up", status: "Success", time: "12m ago", icon: Mail, color: "text-neon-pink" },
    { id: 5, type: "n8n", action: "API Webhook Processed", status: "Success", time: "15m ago", icon: Zap, color: "text-primary" },
];

export function AutomationFeed() {
    const [items, setItems] = useState(activities.slice(0, 3));

    useEffect(() => {
        const interval = setInterval(() => {
            setItems((prev) => {
                const nextIndex = (activities.findIndex(a => a.id === prev[0].id) + 1) % activities.length;
                const newItems = [...prev.slice(1), activities[nextIndex]];
                return newItems;
            });
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-card/40 backdrop-blur-md rounded-xl border border-border/50 overflow-hidden flex flex-col h-[200px]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-muted/20">
                <div className="flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Live Activity Log</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                </div>
            </div>

            <div className="p-3 space-y-3 overflow-hidden flex-1">
                <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center justify-between gap-3 p-2 rounded-lg bg-muted/10 border border-border/20 group hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-md bg-background border border-border/50 ${item.color}`}>
                                    <item.icon className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium text-foreground leading-none mb-1">{item.action}</p>
                                    <p className="text-[9px] text-muted-foreground uppercase tracking-tighter">{item.type} Pipeline</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center gap-1">
                                    <CheckCircle2 className="w-2.5 h-2.5 text-neon-green" />
                                    <span className="text-[9px] font-mono text-neon-green uppercase">Success</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="w-2.5 h-2.5" />
                                    <span className="text-[9px] font-mono">{item.time}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Bottom scanning line effect */}
            <div className="h-0.5 w-full bg-primary/20 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-primary"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </div>
        </div>
    );
}
