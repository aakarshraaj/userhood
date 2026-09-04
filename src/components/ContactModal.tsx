import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, MessageCircle, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getAttribution, trackAnalyticsEvent } from "../utils/analytics";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: string;
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const projectTypes = [
  {
    id: "twelve_week_build",
    label: "12-week MVP build",
    detail: "A focused product from brief to production.",
  },
  {
    id: "product_rescue",
    label: "Product rescue",
    detail: "Fix an existing product, system, or codebase.",
  },
  {
    id: "post_launch_support",
    label: "Post-launch support",
    detail: "Iterate, stabilise, or extend a shipped product.",
  },
];

const launchWindows = [
  { value: "within_4_weeks", label: "Within 4 weeks" },
  { value: "within_1_3_months", label: "Within 1–3 months" },
  { value: "within_3_6_months", label: "Within 3–6 months" },
  { value: "exploring", label: "Still exploring" },
];

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function ContactModal({ isOpen, onClose, source }: ContactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const formStartedRef = useRef(false);
  const statusRef = useRef<SubmissionStatus>("idle");
  const requestControllerRef = useRef<AbortController | null>(null);

  const [projectType, setProjectType] = useState("twelve_week_build");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const closeModal = (method: string) => {
    const activeRequest = requestControllerRef.current;
    requestControllerRef.current = null;
    activeRequest?.abort();
    trackAnalyticsEvent("lead_form_close", {
      source,
      method,
      form_started: formStartedRef.current,
      submission_status: statusRef.current,
    });
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    formStartedRef.current = false;
    setProjectType("twelve_week_build");
    setStatus("idle");
    setFeedback("");

    const siteShell = document.getElementById("site-shell");
    const previousOverflow = document.body.style.overflow;
    siteShell?.setAttribute("inert", "");
    siteShell?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => firstFieldRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal("escape");
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = (Array.from(
        dialogRef.current.querySelectorAll(focusableSelector)
      ) as HTMLElement[]).filter(
        (element) =>
          element.tabIndex >= 0 &&
          element.getClientRects().length > 0 &&
          element.getAttribute("aria-hidden") !== "true"
      );

      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      const activeRequest = requestControllerRef.current;
      requestControllerRef.current = null;
      activeRequest?.abort();
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      siteShell?.removeAttribute("inert");
      siteShell?.removeAttribute("aria-hidden");
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    statusRef.current = status;
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const registerFormStart = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackAnalyticsEvent("lead_form_start", { source });
  };

  const handleProjectTypeChange = (nextProjectType: string) => {
    registerFormStart();
    setProjectType(nextProjectType);
    trackAnalyticsEvent("lead_project_type_select", {
      source,
      project_type: nextProjectType,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerFormStart();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    const launchWindow = String(formData.get("launch_window") ?? "");

    trackAnalyticsEvent("lead_form_submit_attempt", {
      source,
      project_type: projectType,
      launch_window: launchWindow,
    });

    if (!accessKey) {
      setStatus("error");
      setFeedback("The form is temporarily unavailable. Please use WhatsApp or email hello@userhood.in.");
      trackAnalyticsEvent("lead_form_error", { source, reason: "missing_access_key" });
      return;
    }

    setStatus("submitting");
    setFeedback("Sending your project brief…");

    formData.append("access_key", accessKey);
    formData.append("project_type", projectType);
    formData.append("contact_source", source);
    formData.append("subject", `New Userhood enquiry: ${projectType}`);

    const attribution = getAttribution();
    Object.entries(attribution).forEach(([key, value]) => formData.append(key, value));

    const controller = new AbortController();
    requestControllerRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
      const data = await response.json();

      if (!response.ok || !data.success) throw new Error("submission_failed");

      form.reset();
      setStatus("success");
      setFeedback("Your brief is in. We will reply within one business day.");
      trackAnalyticsEvent("generate_lead", {
        source,
        project_type: projectType,
        launch_window: launchWindow,
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
      });
    } catch (error) {
      const modalWasClosed =
        error instanceof DOMException &&
        error.name === "AbortError" &&
        requestControllerRef.current !== controller;

      if (modalWasClosed) return;

      const reason = error instanceof DOMException && error.name === "AbortError" ? "timeout" : "provider_error";
      setStatus("error");
      setFeedback("We could not send the form. Please try again or use WhatsApp or email hello@userhood.in.");
      trackAnalyticsEvent("lead_form_error", { source, reason });
    } finally {
      window.clearTimeout(timeoutId);
      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null;
        setStatus((currentStatus) => (currentStatus === "submitting" ? "idle" : currentStatus));
      }
    }
  };

  const handleWhatsAppClick = () => {
    trackAnalyticsEvent("whatsapp_click", {
      source: "contact_modal",
      originating_cta: source,
      project_type: projectType,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeModal("backdrop")}
            className="absolute inset-0 bg-background-dark/85 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            aria-describedby="contact-dialog-description"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 24 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto overflow-x-hidden rounded-t-2xl border border-b-0 border-white/10 bg-surface p-5 sm:rounded-none sm:border-b sm:p-8 md:p-10"
          >
            <button
              type="button"
              onClick={() => closeModal("close_button")}
              aria-label="Close project enquiry"
              className="absolute right-4 top-4 flex min-h-[44px] min-w-[44px] items-center justify-center text-white/50 transition-colors hover:text-white sm:right-6 sm:top-6"
            >
              <X className="h-5 w-5" />
            </button>

            {status === "success" ? (
              <div ref={successRef} tabIndex={-1} className="py-8 outline-none sm:py-12">
                <CheckCircle2 className="h-10 w-10 text-primary" />
                <div className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-primary">Brief received</div>
                <h2 id="contact-dialog-title" className="mt-4 max-w-xl text-4xl font-black tracking-tighter text-white sm:text-5xl">
                  Now we do the useful part.
                </h2>
                <p id="contact-dialog-description" role="status" className="mt-6 max-w-xl text-base font-light leading-relaxed text-slate-300 md:text-lg">
                  {feedback}
                </p>
                <button
                  type="button"
                  onClick={() => closeModal("success_close")}
                  className="mt-9 inline-flex min-h-[48px] items-center gap-3 bg-primary px-7 py-4 font-mono text-sm font-bold text-black transition-colors hover:bg-white"
                >
                  CLOSE <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">[ PROJECT_BRIEF // ONE_STEP ]</div>
                <h2 id="contact-dialog-title" className="mt-5 pr-12 text-3xl font-black tracking-tighter text-white sm:text-4xl md:text-5xl">
                  What needs to be live?
                </h2>
                <p id="contact-dialog-description" className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-slate-400 sm:text-base">
                  Give us the release, the constraint, and the timing. We reply within one business day—usually with questions, not a sales deck.
                </p>

                <form
                  className="mt-8 space-y-7"
                  onSubmit={handleSubmit}
                  onInputCapture={registerFormStart}
                  onInvalidCapture={(event) => {
                    const field = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                    trackAnalyticsEvent("lead_form_validation_error", {
                      source,
                      field: field.name || field.id,
                    });
                  }}
                >
                  <fieldset>
                    <legend className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">What kind of work is this?</legend>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {projectTypes.map((type, index) => (
                        <label
                          key={type.id}
                          className={`cursor-pointer border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary ${
                            projectType === type.id
                              ? "border-primary bg-primary/[0.06]"
                              : "border-white/10 bg-white/[0.02] hover:border-white/30"
                          }`}
                        >
                          <input
                            ref={index === 0 ? firstFieldRef : undefined}
                            type="radio"
                            name="project_type_choice"
                            value={type.id}
                            checked={projectType === type.id}
                            onChange={() => handleProjectTypeChange(type.id)}
                            className="sr-only"
                          />
                          <span className="flex items-center justify-between gap-3 font-mono text-xs font-bold uppercase tracking-[0.08em] text-white">
                            {type.label}
                            <span className={`h-2 w-2 shrink-0 rounded-full ${projectType === type.id ? "bg-primary" : "bg-white/15"}`} />
                          </span>
                          <span className="mt-2 block text-xs font-light leading-relaxed text-white/60">{type.detail}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="mt-2 w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">Work email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        className="mt-2 w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-primary"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-company" className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">Company <span className="text-white/50">optional</span></label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        className="mt-2 w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-primary"
                        placeholder="Company or product"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-launch-window" className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">When do you want to start?</label>
                      <select
                        id="contact-launch-window"
                        name="launch_window"
                        required
                        defaultValue=""
                        className="mt-2 w-full border border-white/10 bg-[#18181b] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-primary"
                      >
                        <option value="" disabled>Choose a window</option>
                        {launchWindows.map((window) => (
                          <option key={window.value} value={window.value}>{window.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">The release</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      minLength={20}
                      rows={4}
                      className="mt-2 w-full resize-none border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-primary"
                      placeholder="What are you building, what is blocking it, and what must be true when it launches?"
                    />
                  </div>

                  <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                  {feedback && (
                    <div
                      role={status === "error" ? "alert" : "status"}
                      aria-live="polite"
                      className={`border p-4 text-sm ${
                        status === "error"
                          ? "border-red-500/40 bg-red-500/10 text-red-300"
                          : "border-primary/30 bg-primary/10 text-primary"
                      }`}
                    >
                      {feedback}
                    </div>
                  )}

                  <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-sm text-xs font-light leading-relaxed text-white/60">
                      We use these details to assess and respond to your enquiry. See our <Link to="/privacy" onClick={() => closeModal("privacy_link")} className="underline underline-offset-2 hover:text-white">privacy policy</Link>.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-3 bg-primary px-7 py-4 font-mono text-sm font-bold text-black transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-60"
                    >
                      {status === "submitting" ? "SENDING…" : "SEND PROJECT BRIEF"}
                      {status !== "submitting" && <ArrowRight className="h-4 w-4" />}
                    </motion.button>
                  </div>
                </form>

                <div className="relative my-7">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                  <div className="relative flex justify-center"><span className="bg-surface px-4 font-mono text-xs uppercase tracking-[0.2em] text-white/55">Or talk directly</span></div>
                </div>

                <a
                  onClick={handleWhatsAppClick}
                  href={`https://wa.me/917498908702?text=${encodeURIComponent("Hey Userhood! I want to discuss a potential product build.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] w-full items-center justify-center gap-3 border border-[#25D366]/30 bg-[#25D366]/10 py-3 text-[#25D366] transition-colors hover:bg-[#25D366]/20"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em]">Continue on WhatsApp</span>
                </a>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
