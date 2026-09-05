import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";
import { AnalyticsPreferenceControl } from "../components/AnalyticsConsent";

export default function Privacy() {
  useSEO(getPageSEO("privacy"));
  return (
    <main data-page-id="privacy" className="min-h-screen bg-background-dark pt-32 pb-48 selection:bg-primary selection:text-black">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="mb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all"
          >
            <ArrowLeft size={14} /> Back_to_Home
          </Link>
        </div>

        <header className="mb-24">
          <div className="font-mono text-xs text-primary mb-4 uppercase tracking-[0.3em]">[ LEGAL_DOCUMENT // 0x01 ]</div>
          <h1 className="text-6xl font-black text-white tracking-tighter">Privacy Policy.</h1>
          <p className="text-white/70 font-mono text-xs mt-4 uppercase tracking-[0.14em]">Last updated: 5 September 2026</p>
        </header>

        <div className="space-y-12 text-slate-200 leading-relaxed font-normal">
          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">01. What this policy covers</h2>
            <p>
              This policy explains how Userhood handles personal data when you visit this website, send a project enquiry, contact us through an external channel, or apply for a role. For this website, Userhood decides why and how that information is used.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">02. Information we process</h2>
            <div className="space-y-4">
              <p><strong className="font-bold text-white">Project enquiries.</strong> If you submit the project brief, we receive your name, work email, optional company, engagement type, preferred timing, and the project description you provide.</p>
              <p><strong className="font-bold text-white">Lead attribution.</strong> The site keeps the landing path, referrer, and any UTM campaign parameters for the browser session. If you submit the brief, those details are included with the enquiry so we can understand how the conversation began.</p>
              <p><strong className="font-bold text-white">Optional analytics.</strong> If you allow analytics, Google Analytics receives page views, CTA interactions, broad device/browser information, approximate location, and campaign information. We do not send form names, email addresses, company names, or free-text project descriptions to Google Analytics.</p>
              <p><strong className="font-bold text-white">Website operation.</strong> Our hosting provider may process request information such as IP address, timestamps, user agent, and error or security logs to deliver and protect the site.</p>
              <p><strong className="font-bold text-white">Recruitment.</strong> Job applications are completed through Google Forms. The information you provide there is processed for evaluating and responding to your application.</p>
            </div>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">03. Why we use it</h2>
            <div className="space-y-4">
              <p>We use enquiry data to assess fit, respond to you, prepare a proposal if requested, and take steps toward a possible engagement. We use operational information to keep the website reliable and secure.</p>
              <p>Optional analytics are used only after your choice to understand aggregate website behaviour and improve the buyer journey. They are not used on this site for advertising personalisation.</p>
            </div>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">04. Service providers and external channels</h2>
            <p className="mb-4">We use a limited set of providers to operate this site and receive information. They process data under their own terms and privacy commitments:</p>
            <ul className="list-disc space-y-3 pl-5">
              <li><a className="text-white underline underline-offset-4 hover:text-primary" href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Vercel</a> for website hosting and delivery.</li>
              <li><a className="text-white underline underline-offset-4 hover:text-primary" href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">Web3Forms</a>, including the infrastructure and spam-prevention providers named in its policy, for processing and transmitting the project brief to us.</li>
              <li><a className="text-white underline underline-offset-4 hover:text-primary" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google</a> for webfont delivery, consent-based analytics, and Google Forms job applications.</li>
              <li><a className="text-white underline underline-offset-4 hover:text-primary" href="https://www.fontshare.com/privacy" target="_blank" rel="noopener noreferrer">Fontshare</a> for webfont delivery.</li>
            </ul>
            <p className="mt-4">If you choose WhatsApp, LinkedIn, Instagram, or another external link, that service receives information according to its own privacy policy.</p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">05. Cookies and browser storage</h2>
            <p className="mb-6">
              Before you choose, analytics remain off. Your analytics choice and sound preference are stored locally on your device. Session storage holds lead-attribution details only for the current browser session. If you allow Google Analytics, it may set first-party measurement cookies. You can change that choice below; turning analytics off also attempts to remove Google Analytics cookies set for this site.
            </p>
            <AnalyticsPreferenceControl />
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">06. Retention, security, and transfers</h2>
            <div className="space-y-4">
              <p>We keep enquiry and recruitment information only for as long as it is reasonably needed to respond, manage a potential or active relationship, maintain appropriate business records, resolve disputes, or meet legal obligations. Web3Forms states that submission data may be retained for up to three years unless a shorter plan period or earlier deletion applies.</p>
              <p>We use reasonable technical and organisational safeguards. Internet transmission and third-party services cannot be guaranteed completely secure. Some providers may process information outside your country under the safeguards available in their terms.</p>
            </div>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">07. Your choices and contact</h2>
            <div className="space-y-4">
              <p>You may ask what personal data we hold about you, request a correction or deletion, withdraw consent where processing depends on consent, or raise a concern. Some information may need to be retained where law or a contractual dispute requires it.</p>
              <p>Send privacy requests to <a className="text-white underline underline-offset-4 hover:text-primary" href="mailto:hello@userhood.in">hello@userhood.in</a>. We may need to verify your identity before acting on a request.</p>
              <p>This website and our services are intended for business users and are not directed to children.</p>
            </div>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-mono">08. Changes to this policy</h2>
            <p>
              We may update this policy when the website, providers, or legal requirements change. The date above identifies the current version.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
