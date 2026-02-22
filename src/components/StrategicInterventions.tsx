import { motion } from "motion/react";
import { ArrowRight, Car, Zap, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const interventions = [
  {
    id: "mitsubishi",
    title: "Designing a Connected Car Ecosystem",
    client: "Mitsubishi Motors Australia",
    description: "Reimagining the digital layer of the driving experience through predictive servicing and eco-driving gamification. Reduced cognitive load by 40%.",
    icon: <Car className="w-6 h-6" />,
    tag: "AUTOMOTIVE_UX",
    link: "/case-study/mitsubishi",
    featured: true,
    metric: "+20% Efficiency"
  },
  {
    id: "hyundai",
    title: "Hyundai Click to Buy",
    client: "Hyundai Global",
    description: "End-to-end automotive e-commerce transformation. Converting complex dealership workflows into a streamlined, confidence-driven digital buying platform.",
    icon: <ShoppingCart className="w-6 h-6" />,
    tag: "AUTO_ECOMMERCE",
    link: "/case-study/hyundai",
    featured: false,
    metric: "+25% Conversion"
  },
  {
    id: "dummy-1",
    title: "Next-Gen Energy Grid Visualization",
    client: "VoltSystems Global",
    description: "Real-time monitoring and predictive maintenance for decentralized renewable energy networks. Enabled 10x throughput for grid operators.",
    icon: <Zap className="w-6 h-6" />,
    tag: "ENERGY_INFRA",
    link: "#",
    featured: false,
    metric: "10x Throughput"
  }
];

export default function StrategicInterventions() {
  const navigate = useNavigate();

  const handleCardClick = (link: string) => {
    if (link === "#") {
      alert("Case study data encrypted. Awaiting clearance.");
    } else {
      navigate(link);
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 px-5 md:px-8 bg-background-dark border-y border-white/5" id="case-studies">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] text-primary mb-3 md:mb-4 uppercase tracking-[0.2em] flex items-center gap-2 flex-wrap">
              <span className="w-1.5 h-1.5 bg-primary shrink-0" />
              [ STRATEGIC_INTERVENTIONS // CASE_STUDIES ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
              High-Stakes<br />Deployments.
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-sm font-light leading-snug">
            We don't just build features. We architect ecosystems that redefine market positions and drive deterministic growth.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-px bg-white/5 border border-white/5">
          {interventions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCardClick(item.link)}
              className={`${item.featured ? 'md:col-span-8' : 'md:col-span-4'}
                p-6 sm:p-8 md:p-10 lg:p-12 bg-background-dark hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden flex flex-col cursor-pointer hover:border-primary/30 border border-transparent active:scale-[0.99]`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full min-w-0">
                <div className="flex justify-between items-start gap-3 mb-8 md:mb-12">
                  <span className="font-mono text-[10px] text-white/20 group-hover:text-primary transition-colors duration-500 shrink-0">
                    {item.tag}
                  </span>
                  <div className="text-primary opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 shrink-0 [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">
                    {item.icon}
                  </div>
                </div>

                <div className="mt-auto min-w-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
                    <span className="font-mono text-[10px] text-primary uppercase tracking-widest opacity-80 group-hover:opacity-100 truncate max-w-[180px] sm:max-w-none">
                      {item.client}
                    </span>
                    <div className="h-px flex-1 min-w-[20px] bg-primary/10 group-hover:bg-primary/30 transition-colors duration-500 hidden sm:block" />
                    <span className="font-mono text-[10px] text-primary font-bold bg-primary/10 px-2 py-1 border border-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                      {item.metric}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 tracking-tight group-hover:text-primary transition-colors duration-500 break-words">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-base md:text-lg mb-6 md:mb-8 max-w-md leading-relaxed group-hover:text-slate-300 transition-colors duration-500">
                    {item.description}
                  </p>

                  <div className="mt-auto">
                    {item.link !== "#" ? (
                      <span className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest group-hover:gap-4 transition-all duration-500">
                        View_Case_Study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-500 shrink-0" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-white/40 font-mono text-xs uppercase tracking-widest group-hover:text-white/60 transition-colors duration-500">
                        Coming_Soon <ArrowRight size={14} className="shrink-0" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {item.featured && (
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none mix-blend-screen scale-110 group-hover:scale-100 transform hidden md:block">
                  <div className="absolute inset-0 tech-grid" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
