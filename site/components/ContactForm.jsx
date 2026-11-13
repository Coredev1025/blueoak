import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SERVICES, CAREERS, COMPANY } from "../data/content.js";
import { SectionBackdrop } from "./SectionBackdrop.jsx";
import { Reveal } from "./Reveal.jsx";
import {
  ArrowUpRight,
  Phone,
  MapPin,
  ShieldCheck,
  Check,
  LoaderCircle,
} from "lucide-react";
import { SectionMotion } from "./SectionMotion.jsx";
const BUDGETS = ["Under $25k", "$25k – $75k", "$75k – $200k", "$200k+"];
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
const empty = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};
const inputCls =
  "w-full rounded-xl border border-white/10 bg-ink-700 px-5 py-4 text-base text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-oak-500";
const labelCls =
  "mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500";
function ContactForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [ref, setRef] = useState("");
  const [params] = useSearchParams();
  const selectedService = params.get("service");
  const selectedRole = params.get("role");
  useEffect(() => {
    if (SERVICES.some((s) => s.id === selectedService))
      setForm((value) => ({
        ...value,
        service: selectedService,
      }));
  }, [selectedService]);
  useEffect(() => {
    const role = CAREERS.find((r) => r.id === selectedRole);
    if (role)
      setForm((value) => ({
        ...value,
        message: `I'd like to apply for the ${role.title} role (${role.location}). A little about me: `,
      }));
  }, [selectedRole]);
  const set = (k) => (e) =>
    setForm({
      ...form,
      [k]: e.target.value,
    });
  const validate = () => {
    const errs = {};
    if (form.name.trim().length < 2) errs.name = "Tell us your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "A valid email is required";
    if (form.message.trim().length < 10)
      errs.message = "A few words about the project (10+ characters)";
    return errs;
  };
  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length || !endpoint) return;
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(15000),
        redirect: "error",
      });
      if (!res.ok) throw new Error("failed");
      const data = await res.json().catch(() => ({}));
      setRef(data.id ? String(data.id).slice(0, 8).toUpperCase() : "");
      setStatus("success");
      setForm(empty);
    } catch {
      setStatus("error");
    }
  };
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="cinematic-section section-space border-t border-white/10"
    >
      <SectionBackdrop variant="contact" />
      <div className="section-content page-container grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-oak-400">
              <span className="text-slate-600">{"08"}</span>
              <span className="accent-rule h-px w-10" />
              <span>{"Contact"}</span>
            </div>
            <h2 className="section-title mt-5 font-display text-slate-50">
              {"Tell us what you're building."}
            </h2>
            <p className="lede mt-7 max-w-md">
              {
                "Send a short brief. We reply within one business day with honest questions \u2014 not a sales deck. If we're not the right studio, we'll say so and point you somewhere better."
              }
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 space-y-5">
            <a
              href={`mailto:${COMPANY.email}`}
              data-testid="contact-email-link"
              className="inline-flex items-center gap-2 font-mono text-sm text-oak-400 transition-colors hover:text-oak-300"
            >
              {COMPANY.email}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`}
              data-testid="contact-phone-link"
              className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-oak-400"
            >
              <Phone className="h-4 w-4 text-oak-500" />
              {COMPANY.phone}
            </a>
            <div className="flex items-start gap-3 text-sm text-slate-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-oak-500" />
              <span>
                <span
                  data-testid="contact-address"
                  className="block text-slate-300"
                >
                  {COMPANY.address}
                </span>
                <span className="mt-1 block">
                  {"Studios: "}
                  <span
                    style={{
                      display: "contents",
                    }}
                  >
                    {COMPANY.locations.join(" · ")}
                  </span>
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <ShieldCheck className="h-4 w-4 text-oak-500" />
              {"NDAs welcome \xB7 Every brief stays confidential"}
            </div>
          </Reveal>
        </div>
        <SectionMotion
          kind="contact"
          id="contact-form-motion"
          className="lg:col-span-7 min-w-0"
        >
          {status === "success" ? (
            <div
              data-testid="contact-success-panel"
              className="success-panel flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl p-10 text-center"
            >
              <span className="success-badge flex h-14 w-14 items-center justify-center rounded-full">
                <Check className="h-6 w-6 text-oak-400" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-slate-100">
                {"Brief received."}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                {"Thank you — we reply within one business day."}
                {ref && " Your reference is "}
                <span
                  style={{
                    display: "contents",
                  }}
                >
                  {" "}
                </span>
                <span
                  data-testid="contact-reference"
                  className="font-mono text-oak-400"
                >
                  {ref}
                </span>
                {ref && "."}
              </p>
              <button
                data-testid="contact-send-another"
                onClick={() => setStatus("idle")}
                className="mt-8 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-oak-500 hover:text-oak-400"
              >
                {"Send another brief"}
              </button>
            </div>
          ) : (
            <form
              data-testid="contact-form"
              onSubmit={submit}
              noValidate={true}
              className="contact-form-frame p-5 sm:p-10"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelCls} htmlFor="cf-name">
                    {"Name *"}
                  </label>
                  <input
                    id="cf-name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "cf-name-error" : undefined}
                    autoComplete="name"
                    maxLength={120}
                    data-testid="contact-name-input"
                    className={inputCls}
                    placeholder="Ada Lovelace"
                    value={form.name}
                    onChange={set("name")}
                  />
                  {errors.name && (
                    <p
                      id="cf-name-error"
                      role="alert"
                      data-testid="contact-name-error"
                      className="mt-1.5 text-xs text-glow"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelCls} htmlFor="cf-email">
                    {"Email *"}
                  </label>
                  <input
                    id="cf-email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "cf-email-error" : undefined
                    }
                    autoComplete="email"
                    maxLength={200}
                    data-testid="contact-email-input"
                    type="email"
                    className={inputCls}
                    placeholder="ada@company.com"
                    value={form.email}
                    onChange={set("email")}
                  />
                  {errors.email && (
                    <p
                      id="cf-email-error"
                      role="alert"
                      data-testid="contact-email-error"
                      className="mt-1.5 text-xs text-glow"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelCls} htmlFor="cf-company">
                    {"Company"}
                  </label>
                  <input
                    id="cf-company"
                    autoComplete="organization"
                    maxLength={160}
                    data-testid="contact-company-input"
                    className={inputCls}
                    placeholder="Company Inc."
                    value={form.company}
                    onChange={set("company")}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="cf-service">
                    {"Service"}
                  </label>
                  <select
                    id="cf-service"
                    data-testid="contact-service-select"
                    className={inputCls}
                    value={form.service}
                    onChange={set("service")}
                  >
                    <option value="">{"Not sure yet"}</option>
                    {SERVICES.map((s) => (
                      <option value={s.id} key={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="cf-budget">
                    {"Budget range"}
                  </label>
                  <select
                    id="cf-budget"
                    data-testid="contact-budget-select"
                    className={inputCls}
                    value={form.budget}
                    onChange={set("budget")}
                  >
                    <option value="">{"Prefer not to say"}</option>
                    {BUDGETS.map((b) => (
                      <option value={b} key={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="cf-message">
                    {"Project brief *"}
                  </label>
                  <textarea
                    id="cf-message"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "cf-message-error" : undefined
                    }
                    maxLength={4000}
                    data-testid="contact-message-input"
                    rows={5}
                    className={`${inputCls} resize-none`}
                    placeholder="What are you building, who is it for, and when does it need to exist?"
                    value={form.message}
                    onChange={set("message")}
                  />
                  {errors.message && (
                    <p
                      id="cf-message-error"
                      role="alert"
                      data-testid="contact-message-error"
                      className="mt-1.5 text-xs text-glow"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>
              {status === "error" && (
                <p
                  role="alert"
                  data-testid="contact-error-message"
                  className="mt-4 text-sm text-glow"
                >
                  {
                    "Something went wrong sending your brief \u2014 email us at "
                  }
                  <span
                    style={{
                      display: "contents",
                    }}
                  >
                    {COMPANY.email}
                  </span>
                  {" and we'll pick it up from there."}
                </p>
              )}
              {!endpoint && (
                <p role="status" className="mt-5 text-sm text-slate-400">
                  Online inquiries are not connected yet. Please{" "}
                  <a
                    className="text-oak-400 underline"
                    href={`mailto:${COMPANY.email}`}
                  >
                    email your brief
                  </a>
                  .
                </p>
              )}
              <button
                type="submit"
                data-testid="contact-submit-button"
                disabled={!endpoint || status === "sending"}
                className="btn-shine group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-oak-500 px-8 py-4 text-sm font-semibold text-ink-900 transition-all hover:bg-oak-400 hover:shadow-[0_0_32px_rgba(212,175,55,0.35)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    {"Sending "}
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    {"Send the brief"}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </SectionMotion>
      </div>
    </section>
  );
}
export default ContactForm;
