import { Component, type ErrorInfo, type ReactNode } from "react";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export default class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  declare readonly props: Readonly<AppErrorBoundaryProps>;
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Userhood render failure", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen items-center bg-background-dark px-5 py-24 text-white">
        <div className="mx-auto w-full max-w-3xl border border-white/10 bg-surface p-8 sm:p-12">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">[ RECOVERY // RENDER_FAILURE ]</div>
          <h1 className="mt-6 text-4xl font-black tracking-tighter sm:text-6xl">This page failed to load cleanly.</h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-slate-300">
            Your information has not been submitted. Reload the page to fetch a fresh copy, or return to the homepage.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs font-bold uppercase tracking-[0.1em]">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="min-h-12 bg-primary px-6 py-3 text-black hover:bg-white"
            >
              Reload page
            </button>
            <a href="/" className="inline-flex min-h-12 items-center border border-white/20 px-6 py-3 text-white hover:border-primary hover:text-primary">
              Return home
            </a>
          </div>
        </div>
      </main>
    );
  }
}
