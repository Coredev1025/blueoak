import "./cinematic.css";
import React, { useEffect } from "react";
import {
  useLocation,
  BrowserRouter,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Cursor from "./components/Cursor.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import Work from "./pages/Work.jsx";
import WorkDetail from "./pages/WorkDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ink-900 px-6 text-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-oak-400">
              {"Something broke"}
            </p>
            <button
              data-testid="error-reload-button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-oak-500 px-6 py-3 font-semibold text-ink-900"
            >
              {"Reload"}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    const timer = setTimeout(() => {
      const target = hash
        ? document.getElementById(decodeURIComponent(hash.slice(1)))
        : 0;
      if (window.__lenis)
        window.__lenis.scrollTo(target || 0, {
          immediate: true,
          offset: hash ? -88 : 0,
          force: true,
        });
      else if (target)
        target.scrollIntoView({
          behavior: "instant",
        });
      else
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
    }, 40);
    return () => clearTimeout(timer);
  }, [pathname, hash, key]);
  return null;
}
function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.3,
    });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <div className="grain">
          <BrowserRouter>
            <ScrollProgress />
            <Cursor />
            <ScrollManager />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:projectId" element={<WorkDetail />} />
              <Route
                path="/about"
                element={<Navigate to="/#company" replace />}
              />
              <Route
                path="/contact"
                element={<Navigate to="/#contact" replace />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </MotionConfig>
    </ErrorBoundary>
  );
}
export default App;
