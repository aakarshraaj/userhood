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
    label: "12-week build",
    detail: "A focused product from brief to production.",
  },
  {
    id: "product_rescue",
    label: "Product rescue",
    detail: "Fix an existing product, system, or codebase.",
  },
  {
    id: "post_launch_support",
    label: "Post-launch",
    detail: "Iterate, stabilise, or extend a shipped product.",
  },
];

const launchWindows = [
  { value: "within_4_weeks", label: "Within 4 weeks" },
  { value: "within_1_3_months", label: "Within 1–3 months" },
  { value: "within_3_6_months", label: "Within 3–6 months" },
  { value: "exploring", label: "Still exploring" },
];

function projectTypeFromSource(source: string) {
  const normalisedSource = source.toLowerCase();
  if (normalisedSource.includes("rescue")) return "product_rescue";
  if (normalisedSource.includes("extend") || normalisedSource.includes("post_launch")) return "post_launch_support";
  return "twelve_week_build";
}

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
    setProjectType(projectTypeFromSource(source));
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
  }, [isOpen, source]);

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
    const timeline = String(formData.get("timeline") ?? "");

    trackAnalyticsEvent("lead_form_submit_attempt", {
      source,
      project_type: projectType,
      timeline,
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
        timeline,
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
    isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <div
            onClick={() => closeModal("backdrop")}
            className="motion-backdrop absolute inset-0 bg-background-dark/85 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            aria-describedby="contact-dialog-description"
            tabIndex={-1}
            className="motion-dialog relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-t-2xl border border-b-0 border-white/10 bg-surface p-5 sm:rounded-none sm:border-b sm:p-8"
          >
            <button
              type="button"
              onClick={() => closeModal("close_button")}
              aria-label="Close project enquiry"
              className="absolute right-4 top-4 flex min-h-[44px] min-w-[44px] items-center justify-center text-white/70 transition-colors hover:text-white sm:right-6 sm:top-6"
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
                  className="motion-button mt-9 inline-flex min-h-[48px] items-center gap-3 bg-primary px-7 py-4 text-sm font-bold text-black hover:bg-white/80"
                >
                  Close <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Project enquiry</div>
                <h2 id="contact-dialog-title" className="mt-5 pr-12 text-3xl font-black tracking-tighter text-white sm:text-4xl md:text-5xl">
                  What needs to be live?
                </h2>
                <p id="contact-dialog-description" className="mt-4 max-w-2xl text-sm font-normal leading-relaxed text-slate-300 sm:text-base">
                  Give us the release, the constraint, and the timing. We reply within one business day, usually with useful questions instead of a sales deck.
                </p>

                <form
                  className="mt-7 space-y-5"
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
                    <legend className="font-mono text-xs uppercase tracking-[0.12em] text-white/75">What kind of work is this?</legend>
                    <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                      {projectTypes.map((type) => (
                        <label
                          key={type.id}
                          className={`cursor-pointer border p-3 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary sm:p-3.5 ${
                            projectType === type.id
                              ? "border-primary bg-primary/[0.06]"
                              : "border-white/10 bg-white/[0.02] hover:border-white/30"
                          }`}
                        >
                          <input
                            ref={projectType === type.id ? firstFieldRef : undefined}
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
                          <span className="mt-2 hidden text-xs font-normal leading-relaxed text-white/75 sm:block">{type.detail}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-[0.12em] text-white/75">Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="mt-2 w-full border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/50 focus:border-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-[0.12em] text-white/75">Work email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        className="mt-2 w-full border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/50 focus:border-primary"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-[0.12em] text-white/75">The release</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      minLength={20}
                      rows={3}
                      className="mt-2 w-full resize-none border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/50 focus:border-primary"
                      placeholder="What are you building, what is blocking it, and what must be true when it launches?"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-timeline" className="font-mono text-xs uppercase tracking-[0.12em] text-white/75">Preferred start <span className="text-white/55">optional</span></label>
                    <select
                      id="contact-timeline"
                      name="timeline"
                      defaultValue=""
                      className="mt-2 w-full border border-white/15 bg-[#181818] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-primary"
                    >
                      <option value="">No fixed date yet</option>
                      {launchWindows.map((window) => (
                        <option key={window.value} value={window.value}>{window.label}</option>
                      ))}
                    </select>
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

                  <div className="flex flex-col gap-4 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-sm text-xs font-normal leading-relaxed text-white/75">
                      We use these details to assess and respond to your enquiry. See our <Link to="/privacy" onClick={() => closeModal("privacy_link")} className="underline underline-offset-2 hover:text-white">privacy policy</Link>.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="motion-button inline-flex min-h-[52px] shrink-0 items-center justify-center gap-3 bg-primary px-7 py-4 text-base font-bold text-black hover:bg-white/80 disabled:cursor-wait disabled:opacity-60"
                    >
                      {status === "submitting" ? "Sending…" : "Send project brief"}
                      {status !== "submitting" && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </div>
                </form>

                <div className="my-6 text-center font-mono text-xs uppercase tracking-[0.14em] text-white/70">
                  Or talk directly
                </div>

                <a
                  onClick={handleWhatsAppClick}
                  href={`https://wa.me/917498908702?text=${encodeURIComponent("Hey Userhood! I want to discuss a potential product build.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-button flex min-h-[48px] w-full items-center justify-center gap-3 border border-[#25D366]/30 bg-[#25D366]/10 py-3 text-[#25D366] hover:bg-[#25D366]/20"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-base font-bold">Continue on WhatsApp</span>
                </a>
              </>
            )}
          </div>
        </div>
    ) : null
  );
}
