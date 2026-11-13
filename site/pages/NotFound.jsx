import { Link } from "react-router-dom";
import React from "react";
function NotFound() {
  return (
    <div
      data-testid="not-found-page"
      className="flex min-h-screen flex-col items-center justify-center bg-ink-900 px-6 text-center text-slate-100"
    >
      <div className="font-mono text-xs uppercase tracking-[0.35em] text-oak-400">
        {"404"}
      </div>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {"This route ships to nowhere."}
      </h1>
      <p className="mt-4 max-w-md text-slate-400">
        {
          "The page you're looking for doesn't exist \u2014 but everything else does."
        }
      </p>
      <Link
        to="/"
        data-testid="not-found-home-link"
        className="mt-8 rounded-full bg-oak-500 px-6 py-3 font-semibold text-ink-900 transition-colors hover:bg-oak-400"
      >
        {"Back to home"}
      </Link>
    </div>
  );
}
export default NotFound;
