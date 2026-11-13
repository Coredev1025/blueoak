import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
const STORAGE_KEY = "blueoak-theme";
function ThemeToggle({ compact = false }) {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const sync = () => {
      let saved = document.documentElement.dataset.theme || "light";
      try {
        saved = localStorage.getItem(STORAGE_KEY) || saved;
      } catch {
        /* Storage may be unavailable. */
      }
      const next = saved === "dark" ? "dark" : "light";
      setTheme(next);
      document.documentElement.dataset.theme = next;
    };
    sync();
    window.addEventListener("blueoak-theme-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("blueoak-theme-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const toggle = () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Theme still works for this visit. */
    }
    window.dispatchEvent(new Event("blueoak-theme-change"));
  };
  return (
    <button
      type="button"
      data-testid={compact ? "theme-toggle-mobile" : "theme-toggle"}
      data-cursor="link"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-oak-500 hover:text-oak-500"
    >
      {theme === "dark" ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
export default ThemeToggle;
