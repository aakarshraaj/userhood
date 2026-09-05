import { ArrowRight, Building2, MapPin, ShieldCheck, UserRound } from "lucide-react";

const evidenceRules = [
  {
    state: "01 report",
    answer: "Reported rent",
    detail: "A single contribution stays a single observed rent. It never becomes a fake market average.",
  },
  {
    state: "Enough evidence",
    answer: "Supported range",
    detail: "Multiple recent reports unlock an aggregate with count, freshness, and locality context attached.",
  },
  {
    state: "00 reports",
    answer: "Awaiting evidence",
    detail: "An empty society asks for the first contribution instead of displaying a confident-looking zero.",
  },
];

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-2 text-[var(--color-primary)] lg:flex-col lg:px-1 lg:py-0" aria-hidden="true">
      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45 lg:[writing-mode:vertical-rl]">{label}</span>
      <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
    </div>
  );
}

export default function RentnamaEvidenceFlow() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#0d100a] px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="rentnama-evidence-flow-title"
    >
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-15" />
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full blur-[150px]"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 16%, transparent)" }}
      />

      <div className="motion-reveal relative mx-auto max-w-[1280px]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="font-mono text-xs uppercase tracking-[0.17em] text-primary">Rentnama signature system // Evidence chain</div>
            <h2 id="rentnama-evidence-flow-title" className="mt-5 max-w-5xl text-4xl font-black leading-[0.94] tracking-tighter text-white md:text-7xl">
              From one rent payment to a public answer people can trust.
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-slate-300 md:col-span-4 md:justify-self-end md:text-lg">
            Every number keeps its source, place identity, evidence threshold, and freshness. The interface shows the boundary instead of hiding it.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-2 lg:grid-cols-[1fr_54px_1fr_54px_1.08fr]">
          <article className="border border-white/10 bg-black/55 p-6 md:p-8">
            <div className="flex items-center justify-between gap-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Input // First-hand report</span>
              <UserRound className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-10 font-mono text-xs uppercase tracking-[0.13em] text-white/50">Monthly rent paid</div>
            <div className="mt-2 text-5xl font-black tracking-tighter text-white">₹27,000</div>
            <dl className="mt-8 grid grid-cols-2 gap-px bg-white/10">
              <div className="bg-[#10120d] p-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">Home</dt>
                <dd className="mt-2 text-sm font-bold text-white">2 BHK</dd>
              </div>
              <div className="bg-[#10120d] p-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">Deposit</dt>
                <dd className="mt-2 text-sm font-bold text-white">₹44,000</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="h-4 w-4 text-primary" /> Reported by the person paying it
            </div>
          </article>

          <FlowArrow label="Resolve" />

          <article className="border border-white/10 bg-black/55 p-6 md:p-8">
            <div className="flex items-center justify-between gap-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Identity // Confirmed place</span>
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-10 text-3xl font-black tracking-tight text-white">Life Republic</div>
            <p className="mt-2 text-sm text-slate-400">Hinjawadi · Pune</p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
                <span className="text-slate-400">Place identity</span><strong className="text-white">Canonical</strong>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
                <span className="text-slate-400">Map position</span><strong className="text-white">Confirmed</strong>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Private unit data</span><strong className="text-primary">Never requested</strong>
              </div>
            </div>
          </article>

          <FlowArrow label="Aggregate" />

          <article className="border border-primary/45 bg-[var(--color-primary)] p-6 text-[#12150d] md:p-8">
            <div className="flex items-center justify-between gap-5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-black/60">Output // Society answer</span>
              <Building2 className="h-5 w-5" />
            </div>
            <div className="mt-10 font-mono text-xs font-bold uppercase tracking-[0.13em] text-black/55">Reported monthly rents</div>
            <div className="mt-2 text-[clamp(2.7rem,4.2vw,4.8rem)] font-black leading-none tracking-tighter">₹18K–₹35K</div>
            <div className="mt-8 grid grid-cols-2 gap-px bg-black/20">
              <div className="bg-[var(--color-primary)] p-4">
                <div className="text-2xl font-black">5</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-black/60">First-hand reports</div>
              </div>
              <div className="bg-[var(--color-primary)] p-4">
                <div className="text-2xl font-black">19 Aug</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-black/60">Latest evidence</div>
              </div>
            </div>
            <div className="mt-5 inline-flex border border-black/20 bg-black/5 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
              In line with Hinjawadi
            </div>
          </article>
        </div>

        <div className="mt-14">
          <div className="mb-5 flex items-center justify-between gap-5">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/65">Evidence rules expressed in the interface</div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-primary sm:block">Confidence without theatre</span>
          </div>
          <div className="grid gap-px bg-white/10 md:grid-cols-3">
            {evidenceRules.map((rule) => (
              <article key={rule.state} className="bg-[#0d100a] p-6 md:p-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">{rule.state}</div>
                <h3 className="mt-4 text-xl font-bold text-white">{rule.answer}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{rule.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
