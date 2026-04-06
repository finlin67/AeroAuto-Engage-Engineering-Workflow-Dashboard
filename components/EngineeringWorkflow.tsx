
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Zap, 
  TrendingDown, 
  ShieldCheck, 
  Plane, 
  Car, 
  Package, 
  Shield, 
  Award, 
  CheckCircle2, 
  ShieldAlert,
  ArrowRight,
  FileText,
  Loader2,
  Search,
  Box,
  Binary,
  X,
  Target,
  AlertTriangle,
  Trophy,
  Activity
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface StatsState {
  duration: number;
  compliance: number;
  optimization: number;
}

interface ValidationReport {
  component: string;
  roadmap: string[];
  riskFactor: string;
}

interface PhaseDetail {
  phase: string;
  title: string;
  months: string;
  icon: any;
  subIcon?: any;
  description: string;
  metrics: string[];
  challenges: string[];
  outcomes: string[];
  tags?: string[];
  color: string;
}

const PHASE_DATA: PhaseDetail[] = [
  {
    phase: "Validation Phase",
    title: "Engineering Validation",
    months: "01-12",
    icon: Plane,
    subIcon: Car,
    description: "Initial CAD development, high-fidelity digital twin simulation, and structural stress analysis for aerospace and automotive components.",
    metrics: ["99.9% Simulation Accuracy", "15,000+ Stress Test Iterations", "Digital Twin Synchronization < 10ms"],
    challenges: ["Thermal variance in turbine housing", "Weight-to-strength ratio optimization for composite struts"],
    outcomes: ["Verified structural integrity for 50k hours", "Full digital footprint for audit trail"],
    tags: ["Digital Twin", "CAD Design"],
    color: "primary"
  },
  {
    phase: "Integration Phase",
    title: "Supply Chain Integration",
    months: "13-24",
    icon: Package,
    description: "Optimizing global logistics networks and material sourcing to ensure scalable manufacturing readiness.",
    metrics: ["14% Logistics Cost Reduction", "Real-time Tier-1 Supplier Tracking", "98% Resource Allocation Efficiency"],
    challenges: ["Global raw material shortages (Nickel/Cobalt)", "JIT synchronization across 3 continents"],
    outcomes: ["Zero assembly line downtime during pilot run", "Verified multi-source sustainability model"],
    tags: ["Logistics", "Scaling"],
    color: "primary"
  },
  {
    phase: "Certification Phase",
    title: "Certification Milestones",
    months: "25-34",
    icon: ShieldAlert,
    description: "Rigorous safety checkpoints and regulatory audits for final air and roadworthiness certificates.",
    metrics: ["100% First-pass Certification Rate", "Zero Non-conformity Reports", "3,500+ Safety Test Protocols"],
    challenges: ["Evolving EU Battery Safety Regulations", "Acoustic threshold testing for urban mobility"],
    outcomes: ["Full FAA and NHTSA Type Certification", "ISO 9001:2015 Quality Management Award"],
    color: "primary"
  },
  {
    phase: "Market Ready",
    title: "Market Ready",
    months: "36",
    icon: Award,
    description: "Full certification award and global distribution kickoff. Engineering excellence achieved with market-leading standards.",
    metrics: ["12% Faster Time-to-Market", "Initial Batch 100% Pre-sold", "95% Customer Readiness Score"],
    challenges: ["Global logistics scaling for launch", "Final edge-case validation in variable climates"],
    outcomes: ["Global market dominance in segment", "Standard-setting safety ratings achieved"],
    color: "emerald-500"
  }
];

export default function EngineeringWorkflow() {
  const [stats, setStats] = useState<StatsState>({
    duration: 36,
    compliance: 100,
    optimization: -15
  });

  const [aiLoading, setAiLoading] = useState(false);
  const [componentName, setComponentName] = useState('');
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [conceptImage, setConceptImage] = useState<string | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<PhaseDetail | null>(null);

  // Recursive timeout for organic jitter
  const updateStats = useCallback(() => {
    let timeoutId: number;
    const jitter = () => {
      setStats(prev => ({
        ...prev,
        compliance: Math.min(100, Math.max(99.8, prev.compliance + (Math.random() - 0.5) * 0.05)),
        optimization: Math.min(-14.5, Math.max(-15.5, prev.optimization + (Math.random() - 0.5) * 0.1))
      }));
      timeoutId = window.setTimeout(jitter, 2000 + Math.random() * 3000);
    };
    jitter();
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const cleanup = updateStats();
    return cleanup;
  }, [updateStats]);

  const handleAnalyze = async () => {
    if (!componentName.trim()) return;
    setAiLoading(true);
    setReport(null);
    setConceptImage(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    try {
      const textResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a short technical engineering validation roadmap for a "${componentName}" in a 36-month aerospace/automotive cycle. 
        Format as JSON: { "component": "${componentName}", "roadmap": ["Phase 1: ...", "Phase 2: ...", "Phase 3: ..."], "riskFactor": "Low/Medium/High" }`,
        config: { responseMimeType: "application/json" }
      });

      const parsedReport = JSON.parse(textResponse.text || '{}');
      setReport(parsedReport);

      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `A high-tech blueprint and 3D render of an advanced engineering component: ${componentName}. Cyberpunk aesthetic, blueprint grid background, cinematic lighting, 4k resolution.` }]
        }
      });

      for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setConceptImage(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="w-full bg-background-dark text-white font-display overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary rounded-lg">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold tracking-tight uppercase">
              AeroAuto <span className="text-primary">Engage</span>
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {['Expertise', 'Case Studies', 'Workflows', 'Contact'].map((link) => (
              <a 
                key={link} 
                href="#" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
          <button className="bg-primary hover:bg-primary/90 px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20">
            Partner With Us
          </button>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[900px] flex flex-col items-center justify-start py-20 px-4 overflow-hidden bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700">
          <div className="absolute inset-0 blueprint-grid opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-dark/90"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-5xl text-center mb-24"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
              <Zap className="w-3 h-3 text-yellow-400" /> High-Fidelity Engineering
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6">
              The 36-Month Engineering <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Excellence Workflow
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
              A rigorous, multi-phase qualification cycle ensuring automotive and aerospace market readiness through high-precision validation.
            </p>
          </motion.div>

          {/* Stats Overlay */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 w-full max-w-4xl px-4">
            <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-6 rounded-xl flex flex-col gap-2 border-l-4 border-l-primary">
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Total Duration</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{stats.duration}</span>
                <span className="text-xl text-blue-200">Months</span>
              </div>
              <div className="text-emerald-400 flex items-center gap-1 text-sm font-bold">
                <TrendingDown className="w-4 h-4" /> {stats.optimization.toFixed(1)}% Optimization
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-6 rounded-xl flex flex-col gap-2 border-l-4 border-l-primary">
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Audit Compliance</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{stats.compliance.toFixed(1)}</span>
                <span className="text-xl text-blue-200">%</span>
              </div>
              <div className="text-emerald-400 flex items-center gap-1 text-sm font-bold">
                <ShieldCheck className="w-4 h-4" /> ISO & FAA Ready
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-6 rounded-xl flex flex-col gap-2 border-l-4 border-l-primary">
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Market Sectors</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">02</span>
                <span className="text-xl text-blue-200">Global</span>
              </div>
              <div className="text-blue-200 text-sm font-medium italic">Auto & Aerospace Focus</div>
            </motion.div>
          </div>

          {/* AI Engineering Analyst */}
          <section className="relative z-10 w-full max-w-5xl mb-32">
            <div className="glass-card rounded-2xl p-8 border border-white/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Binary className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Cpu className="text-primary w-6 h-6" /> AI Engineering Analyst
                </h2>
                <p className="text-blue-100/60 text-sm mb-6 max-w-lg">
                  Instantly generate a validation roadmap and conceptual visual for any aerospace or automotive component.
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                    <input 
                      type="text" 
                      placeholder="Enter component (e.g., Titanium Fan Blade, Hydrogen Fuel Cell...)" 
                      value={componentName}
                      onChange={(e) => setComponentName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-blue-300/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <button 
                    onClick={handleAnalyze}
                    disabled={aiLoading}
                    className="bg-primary hover:bg-primary/90 disabled:opacity-50 px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 min-w-[180px]"
                  >
                    {aiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                    Analyze Cycle
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {(report || aiLoading) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                          <h4 className="text-xs font-black uppercase text-blue-400 mb-4 tracking-tighter flex items-center gap-2">
                            <Box className="w-3 h-3" /> Technical Roadmap
                          </h4>
                          <div className="space-y-3">
                            {aiLoading ? (
                              Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-4 bg-white/10 animate-pulse rounded w-full" />
                              ))
                            ) : (
                              report?.roadmap.map((step, i) => (
                                <div key={i} className="flex gap-3 text-sm text-blue-50 leading-relaxed">
                                  <span className="text-primary font-bold">{i+1}.</span>
                                  {step}
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                        {report && (
                          <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/30 rounded-xl">
                            <span className="text-sm font-semibold">Predicted Risk Factor:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${report.riskFactor === 'High' ? 'bg-red-500' : report.riskFactor === 'Medium' ? 'bg-yellow-500' : 'bg-emerald-500'}`}>
                              {report.riskFactor}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="relative aspect-square md:aspect-auto md:h-full rounded-xl overflow-hidden bg-black/40 border border-white/10 group">
                        {aiLoading ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <p className="text-xs font-bold text-blue-200 animate-pulse">GENERATING CONCEPT RENDER...</p>
                          </div>
                        ) : conceptImage ? (
                          <motion.img 
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            src={conceptImage} 
                            alt="Concept" 
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <Box className="w-16 h-16" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Horizontal Timeline Workflow */}
          <div className="relative z-10 w-full max-w-[1200px]">
            {/* Connection Line */}
            <div className="absolute top-[48px] left-0 w-full h-[3px] bg-white/20 hidden lg:block overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-primary via-blue-400 to-emerald-400 w-full"
              />
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-6">
              {PHASE_DATA.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  onClick={() => setSelectedPhase(item)}
                  className="flex flex-col items-center lg:items-start flex-1 group cursor-pointer"
                >
                  <div className={`z-20 w-24 h-24 rounded-full flex items-center justify-center border-2 group-hover:shadow-[0_0_40px_rgba(33,96,242,0.6)] group-hover:scale-110 transition-all duration-300 relative ${item.color === 'emerald-500' ? 'bg-emerald-500 border-emerald-500' : 'glass-card border-primary'}`}>
                    <item.icon className={`w-8 h-8 text-white ${item.color === 'emerald-500' ? 'w-10 h-10' : ''}`} />
                    {item.subIcon && <item.subIcon className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-400" />}
                    <div className={`absolute -top-8 text-xs font-black whitespace-nowrap ${item.color === 'emerald-500' ? 'text-emerald-200' : 'text-blue-200'}`}>MONTH {item.months}</div>
                  </div>
                  <div className={`mt-8 lg:mt-12 glass-card p-6 rounded-xl w-full max-w-[320px] relative transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-white/10 ${item.color === 'emerald-500' ? 'border-emerald-500/50' : ''}`}>
                    <div className={`absolute -top-3 left-6 px-3 py-0.5 text-[10px] font-bold uppercase rounded shadow-lg ${item.color === 'emerald-500' ? 'bg-emerald-500' : 'bg-primary'}`}>{item.phase}</div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      {item.title}
                      {item.color !== 'emerald-500' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </h3>
                    
                    {index === 2 ? (
                      <div className="space-y-2 mb-4">
                        {['FAA Compliance', 'NHTSA Safety', 'ISO 9001'].map(milestone => (
                          <div key={milestone} className="flex items-center justify-between text-xs bg-white/5 p-2 rounded">
                            <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-yellow-400" /> {milestone}</span>
                            <span className="text-emerald-400 font-bold uppercase">Pass</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-blue-100/70 leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-2">
                        {item.tags?.map(tag => <span key={tag} className="text-[10px] bg-white/10 px-2 py-1 rounded uppercase">{tag}</span>)}
                      </div>
                      <div className="text-[10px] text-primary font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        DETAILS <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Phase Details Modal */}
        <AnimatePresence>
          {selectedPhase && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPhase(null)}
                className="absolute inset-0 bg-background-dark/80 backdrop-blur-xl"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative glass-card rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
              >
                <div className="p-8 md:p-12">
                  <button 
                    onClick={() => setSelectedPhase(null)}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className={`w-24 h-24 flex-shrink-0 rounded-2xl flex items-center justify-center ${selectedPhase.color === 'emerald-500' ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]' : 'bg-primary shadow-[0_0_30px_rgba(33,96,242,0.4)]'}`}>
                      <selectedPhase.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedPhase.color === 'emerald-500' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-primary/20 text-primary border border-primary/30'}`}>
                          MONTH {selectedPhase.months}
                        </span>
                        <span className="text-white/40 text-xs font-bold uppercase">{selectedPhase.phase}</span>
                      </div>
                      <h2 className="text-4xl font-black mb-4 tracking-tight">{selectedPhase.title}</h2>
                      <p className="text-lg text-blue-100/60 leading-relaxed mb-8">
                        {selectedPhase.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Metrics Section */}
                        <div className="space-y-4">
                          <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-primary">
                            <Target className="w-4 h-4" /> Performance Metrics
                          </h4>
                          <ul className="space-y-3">
                            {selectedPhase.metrics.map((m, i) => (
                              <li key={i} className="flex gap-3 text-sm text-blue-50/80">
                                <Activity className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                {m}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Challenges Section */}
                        <div className="space-y-4">
                          <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-yellow-500">
                            <AlertTriangle className="w-4 h-4" /> Technical Challenges
                          </h4>
                          <ul className="space-y-3">
                            {selectedPhase.challenges.map((c, i) => (
                              <li key={i} className="flex gap-3 text-sm text-blue-50/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0 mt-2" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Outcomes Section */}
                        <div className="space-y-4">
                          <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400">
                            <Trophy className="w-4 h-4" /> Success Outcomes
                          </h4>
                          <ul className="space-y-3">
                            {selectedPhase.outcomes.map((o, i) => (
                              <li key={i} className="flex gap-3 text-sm text-blue-50/80">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="bg-background-dark py-24 px-6 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to accelerate your engineering cycle?</h2>
            <p className="text-[#90a2cb] mb-10 max-w-xl mx-auto">
              Leverage our 36-month framework to reduce time-to-market while maintaining 100% safety compliance across automotive and aerospace domains.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 group">
                Schedule Tech Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-[#314168] hover:bg-white/5 px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 group">
                <FileText className="w-4 h-4" /> Download Framework PDF
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-dark border-t border-[#314168] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-primary" />
            <span className="font-bold tracking-tight uppercase">AeroAuto Engage</span>
          </div>
          <div className="flex gap-8 text-sm text-[#90a2cb]">
            {['Privacy Policy', 'Terms of Service', 'LinkedIn', 'X (Twitter)'].map((footerLink) => (
              <a key={footerLink} className="hover:text-white transition-colors" href="#">{footerLink}</a>
            ))}
          </div>
          <p className="text-sm text-[#90a2cb]">© 2024 AeroAuto Engineering Services Inc.</p>
        </div>
      </footer>
    </div>
  );
}
