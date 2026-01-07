import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Copy, Check, ExternalLink, Zap, FileJson, Search, Filter } from 'lucide-react';

interface WorkflowTemplate {
    name: string;
    nodes: any[];
    connections: any;
    description?: string;
    category?: string;
    json: string;
}

const WorkflowsGallery: React.FC = () => {
    const [workflows, setWorkflows] = useState<WorkflowTemplate[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWorkflows = async () => {
            const modules = import.meta.glob('../Freeworkflows/*.json');
            const loadedWorkflows: WorkflowTemplate[] = [];

            for (const path in modules) {
                try {
                    const content = await modules[path]() as any;
                    const workflowData = content.default || content;

                    // Extract description from sticky notes if possible
                    const stickyNotes = workflowData.nodes?.filter((n: any) => n.type === 'n8n-nodes-base.stickyNote');
                    const description = stickyNotes?.[0]?.parameters?.content || "A powerful n8n workflow template to automate your business processes.";

                    loadedWorkflows.push({
                        name: workflowData.name || path.split('/').pop()?.replace('.json', '') || 'Unnamed Workflow',
                        nodes: workflowData.nodes || [],
                        connections: workflowData.connections || {},
                        description: description.substring(0, 150) + (description.length > 150 ? '...' : ''),
                        json: JSON.stringify(workflowData, null, 2)
                    });
                } catch (error) {
                    console.error(`Error loading workflow at ${path}:`, error);
                }
            }
            setWorkflows(loadedWorkflows);
            setLoading(false);
        };

        loadWorkflows();
    }, []);

    const handleCopy = (json: string, name: string) => {
        navigator.clipboard.writeText(json);
        setCopiedId(name);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDownload = (json: string, name: string) => {
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name.toLowerCase().replace(/\s+/g, '_')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const filteredWorkflows = workflows.filter(w =>
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="py-20 relative overflow-hidden" id="free-workflows">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <Zap className="w-4 h-4 text-neon-cyan" />
                        <span className="text-sm font-medium text-white/80 uppercase tracking-wider">Free Resources</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        n8n Workflow <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Templates</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Ready-to-use automation blueprints. Download or copy these templates directly into your n8n instance to jumpstart your productivity.
                    </motion.p>
                </div>

                {/* Search and Filters */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-cyan transition-colors" />
                        <input
                            type="text"
                            placeholder="Search workflows (e.g., 'AI', 'Lead Gen', 'Social')..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all"
                        />
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-neon-cyan/20 border-t-neon-cyan rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredWorkflows.map((workflow, index) => (
                                <motion.div
                                    key={workflow.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 flex flex-col h-full"
                                >
                                    {/* Card Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                            <FileJson className="w-7 h-7 text-neon-cyan" />
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleCopy(workflow.json, workflow.name)}
                                                className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-neon-cyan hover:bg-white/10 transition-all"
                                                title="Copy JSON"
                                            >
                                                {copiedId === workflow.name ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                            </button>
                                            <button
                                                onClick={() => handleDownload(workflow.json, workflow.name)}
                                                className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-neon-purple hover:bg-white/10 transition-all"
                                                title="Download JSON"
                                            >
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                                        {workflow.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                                        {workflow.description}
                                    </p>

                                    {/* Card Footer */}
                                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                            <Zap className="w-3 h-3" />
                                            <span>{workflow.nodes.length} Nodes</span>
                                        </div>
                                        <button
                                            onClick={() => handleCopy(workflow.json, workflow.name)}
                                            className="text-sm font-semibold text-neon-cyan flex items-center gap-1 group/btn"
                                        >
                                            {copiedId === workflow.name ? 'Copied!' : 'Get Template'}
                                            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredWorkflows.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                            <Search className="w-10 h-10 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No workflows found</h3>
                        <p className="text-gray-500">Try adjusting your search terms.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default WorkflowsGallery;
