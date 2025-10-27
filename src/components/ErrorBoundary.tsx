import React from "react";

type State = { hasError: boolean; message?: string; stack?: string };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(err: any) {
    return { hasError: true, message: String(err?.message || err), stack: String(err?.stack || "") };
  }
  componentDidCatch(err: any) { console.error("App crash:", err); }
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="p-6 m-6 rounded-xl border border-white/20 bg-red-500/10 text-red-200 font-mono text-sm">
        <div className="font-bold mb-2">💥 Runtime error</div>
        <div className="whitespace-pre-wrap">{this.state.message}</div>
        {this.state.stack && (
          <details className="mt-3">
            <summary className="cursor-pointer opacity-80">stack</summary>
            <pre className="mt-2 text-xs overflow-auto">{this.state.stack}</pre>
          </details>
        )}
      </div>
    );
  }
}
