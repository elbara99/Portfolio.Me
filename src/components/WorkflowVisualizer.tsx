import { motion } from "framer-motion";
import { Database, Mail, MessageSquare, Zap, CheckCircle2, Play } from "lucide-react";

const nodes = [
    { id: "trigger", icon: MessageSquare, label: "New Lead", x: 50, y: 50, color: "text-neon-cyan" },
    { id: "process", icon: Zap, label: "AI Analysis", x: 250, y: 50, color: "text-neon-purple" },
    { id: "database", icon: Database, label: "CRM Sync", x: 450, y: 50, color: "text-neon-green" },
    { id: "notify", icon: Mail, label: "Email Sent", x: 650, y: 50, color: "text-neon-pink" },
];

const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
];

export function WorkflowVisualizer() {
    return (
        <div className="relative w-full h-48 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden p-4">
            <div className="absolute top-2 left-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Live Automation Pipeline</span>
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connections.map((conn, i) => (
                    <motion.line
                        key={i}
                        x1={nodes[conn.from].x + 40}
                        y1={nodes[conn.from].y + 40}
                        x2={nodes[conn.to].x + 40}
                        y2={nodes[conn.to].y + 40}
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-border/30"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                ))}
                {/* Animated pulses */}
                {connections.map((conn, i) => (
                    <motion.circle
                        key={`pulse-${i}`}
                        r="3"
                        fill="hsl(var(--primary))"
                        initial={{
                            cx: nodes[conn.from].x + 40,
                            cy: nodes[conn.from].y + 40,
                            opacity: 0
                        }}
                        animate={{
                            cx: nodes[conn.to].x + 40,
                            cy: nodes[conn.to].y + 40,
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </svg>

            <div className="relative z-10 flex justify-between items-center h-full px-4 sm:px-8">
                {nodes.map((node, i) => (
                    <motion.div
                        key={node.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-card border border-border/50 flex items-center justify-center shadow-lg group hover:border-primary/50 transition-colors`}>
                            <node.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${node.color}`} />

                            {/* Status Indicator */}
                            <motion.div
                                className="absolute -top-1 -right-1"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.2 + 0.5 }}
                            >
                                <CheckCircle2 className="w-4 h-4 text-neon-green bg-card rounded-full" />
                            </motion.div>
                        </div>
                        <span className="text-[10px] sm:text-xs font-medium text-muted-foreground whitespace-nowrap">
                            {node.label}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Play button overlay */}
            <div className="absolute bottom-2 right-4">
                <div className="flex items-center gap-2 px-2 py-1 rounded bg-primary/10 border border-primary/20">
                    <Play className="w-3 h-3 text-primary fill-primary" />
                    <span className="text-[10px] font-mono text-primary">Active</span>
                </div>
            </div>
        </div>
    );
}
