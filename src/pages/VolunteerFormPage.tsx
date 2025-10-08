import { useState } from "react";
import Input from "../components/Input";

export default function VolunteerFormPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [areas, setAreas] = useState("");
  const [capacity, setCapacity] = useState("");
  const [experience, setExperience] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [why, setWhy] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [consent, setConsent] = useState(false);
  const [optIn, setOptIn] = useState(false);

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isRequired = (v: string) =>
    v.trim().length ? undefined : "This field is required";
  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const numberInRange = (v: string, min: number, max: number) => {
    if (!v.trim().length) return "This field is required";
    const n = Number(v);
    if (!Number.isFinite(n)) return "Please enter a valid number";
    if (n < min || n > max) return `Value must be between ${min} and ${max}`;
    return undefined;
  };

  // base validations
  const fullNameErr = isRequired(fullName);
  const emailBaseErr =
    email.length === 0
      ? "This field is required"
      : isValidEmail(email)
      ? undefined
      : "Please enter a valid email";
  const locationErr = isRequired(location);
  const areasErr = isRequired(areas);
  const capacityErr = numberInRange(capacity, 0, 168);

  // PDF (TEMP: optional while testing with Google Apps Script)
  const MAX_MB = Number(import.meta.env.VITE_MAX_FILE_MB ?? 5) || 5;
  const maxBytes = MAX_MB * 1024 * 1024;
  const validateResume = (file: File | null): string | undefined => {
    // ⚠️ Temporal: PDF NO es requerido para esta prueba con Apps Script
    if (!file) return undefined; // antes: "This field is required"
    if (file.type !== "application/pdf") return "Only PDF files are allowed";
    if (file.size > maxBytes) return `File is too large (max ${MAX_MB} MB)`;
    return undefined;
  };
  const resumeErrBase = validateResume(resumeFile);

  const showErr = (field: string, err?: string) =>
    submitted || touched[field] ? err : undefined;
  const showValid = (field: string, valPresent: boolean, err?: string) =>
    (submitted || touched[field]) && valPresent && !err;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setServerError(null);
    setSuccess(false);

    const consentErr = consent ? undefined : "Consent is required to proceed";

    const anyError =
      fullNameErr ||
      emailBaseErr ||
      locationErr ||
      areasErr ||
      capacityErr ||
      // PDF queda fuera de la validación por ahora:
      // resumeErrBase ||
      consentErr;

    if (anyError) {
      if (!consent) setTouched((t) => ({ ...t, consent: true }));
      return;
    }

      try {
    setLoading(true);

    // Construimos el body como URLSearchParams para evitar preflight (y CORS)
    const params = new URLSearchParams({
      // ui_* (coinciden con las columnas del Sheet)
      ui_name: fullName.trim(),
      ui_email: email.trim(),
      ui_location: location.trim(),
      ui_areas_free_text: areas.trim(),
      ui_capacity: capacity.trim(),
      ui_experience_level: experience.trim(),
      linkedin_url: linkedin.trim(),
      github_url: github.trim(),
      ui_why: why.trim(),

      // “planos” (compatibilidad)
      name: fullName.trim(),
      email: email.trim(),
      location: location.trim(),
      areas: areas.trim(),
      capacity: capacity.trim(),
      experience: experience.trim(),
      linkedin: linkedin.trim(),
      github: github.trim(),
      why: why.trim(),

      // flags
      consent: String(consent),
      opt_in_updates: String(optIn),

      // placeholders para el mock
      resume_file_id: "",
      resume_file_url: "",
    });

    // ⬇️ DEV (con Vite proxy): usamos la ruta local /gas
    const res = await fetch('/gas', {
      method: 'POST',
      body: params, // NO pongas headers Content-Type a mano
    });

    const text = await res.text();
    if (!res.ok) {
      throw new Error(`GAS error: ${res.status} ${text}`);
    }

    setSuccess(true);
    handleReset();
  } catch (err: any) {
    setServerError(err?.message ?? 'Unexpected error');
  } finally {
    setLoading(false);
  }

  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setLocation("");
    setAreas("");
    setCapacity("");
    setExperience("");
    setLinkedin("");
    setGithub("");
    setWhy("");
    setResumeFile(null);
    setConsent(false);
    setOptIn(false);
    setTouched({});
    setSubmitted(false);
  };

  const baseTextArea =
    "w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 border-libelle-gray focus:ring-libelle-accent";

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-libelle-background">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-libelle-text">
            We help you plug in fast.
          </h1>
          <div className="mt-4 space-y-3 text-sm md:text-base text-libelle-text leading-relaxed">
            <p>
              You found us for a reason. You’re ready to put your talent toward
              something that matters.
            </p>
            <p>
              You won’t just be another volunteer—you’ll be a co-founder in a new
              kind of organization.
            </p>
            <p>
              Here’s our promise: We’ll connect you with a team, give you a clear
              mission, and put your skills to work on a project with real-world
              stakes. No more wasted time. Just meaningful work, with people aligned
              on mission.
            </p>
            <p className="text-libelle-gray">
              Most people finish in under 5 minutes.
            </p>
          </div>

          {/* Banners */}
          <div className="mt-6 space-y-3 text-left">
            {serverError && (
              <div className="rounded-lg border border-libelle-error bg-libelle-error/10 px-4 py-3 text-sm text-libelle-error">
                {serverError}
              </div>
            )}
            {success && (
              <div className="rounded-lg border border-libelle-trust bg-libelle-trust/10 px-4 py-3 text-sm text-libelle-trust">
                Thanks! Your information was submitted successfully.
              </div>
            )}
          </div>

          {/* Card */}
          <div className="mt-6 rounded-2xl bg-white p-6 md:p-8 shadow-sm border border-gray-200 text-left">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Grid 2 cols */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  required
                  value={fullName}
                  onChange={setFullName}
                  onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                  placeholder="Ex: John Doe"
                  error={showErr("fullName", fullNameErr)}
                  valid={showValid(
                    "fullName",
                    fullName.trim().length > 0,
                    fullNameErr
                  )}
                />
                <Input
                  label="Email"
                  required
                  type="email"
                  value={email}
                  onChange={setEmail}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="Ex: john.doe@example.com"
                  error={showErr("email", emailBaseErr)}
                  valid={showValid(
                    "email",
                    email.trim().length > 0,
                    emailBaseErr
                  )}
                />
                <Input
                  label="Location"
                  required
                  value={location}
                  onChange={setLocation}
                  onBlur={() => setTouched((t) => ({ ...t, location: true }))}
                  placeholder="Ex: San Francisco, CA, USA"
                  error={showErr("location", locationErr)}
                  valid={showValid(
                    "location",
                    location.trim().length > 0,
                    locationErr
                  )}
                />
                <Input
                  label="Areas of Interest"
                  required
                  value={areas}
                  onChange={setAreas}
                  onBlur={() => setTouched((t) => ({ ...t, areas: true }))}
                  placeholder="Ex: Education, Healthcare, Environment"
                  error={showErr("areas", areasErr)}
                  valid={showValid(
                    "areas",
                    areas.trim().length > 0,
                    areasErr
                  )}
                />
                <Input
                  label="Capacity (Hours/week)"
                  required
                  type="number"
                  value={capacity}
                  onChange={setCapacity}
                  onBlur={() => setTouched((t) => ({ ...t, capacity: true }))}
                  placeholder="Ex: 2"
                  error={showErr("capacity", capacityErr)}
                  valid={showValid(
                    "capacity",
                    capacity.trim().length > 0,
                    capacityErr
                  )}
                />
                <Input
                  label="Experience Level (optional)"
                  value={experience}
                  onChange={setExperience}
                  onBlur={() => setTouched((t) => ({ ...t, experience: true }))}
                  placeholder="Ex: Entry, Mid, Senior"
                />
                <Input
                  label="LinkedIn Link (optional)"
                  type="url"
                  value={linkedin}
                  onChange={setLinkedin}
                  onBlur={() => setTouched((t) => ({ ...t, linkedin: true }))}
                  placeholder="Ex: linkedin.com/in/johndoe"
                />
                <Input
                  label="GitHub Link (optional)"
                  type="url"
                  value={github}
                  onChange={setGithub}
                  onBlur={() => setTouched((t) => ({ ...t, github: true }))}
                  placeholder="Ex: github.com/johndoe"
                />
              </div>

              {/* Upload (PDF optional during mock) */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-libelle-text">
                  Upload resume (PDF only, max {MAX_MB}MB)
                  {/* TODO: re-add required asterisk when PDF is mandatory */}
                </label>
                <label
                  className={[
                    "block cursor-pointer rounded-lg border-2 border-dashed px-4 py-6 text-center text-sm hover:bg-white",
                    showErr("resume", resumeErrBase)
                      ? "border-libelle-error text-libelle-error"
                      : showValid("resume", !!resumeFile, resumeErrBase)
                      ? "border-libelle-trust text-libelle-trust"
                      : "border-libelle-gray text-libelle-accent bg-libelle-background",
                  ].join(" ")}
                >
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setResumeFile(file);
                      setTouched((t) => ({ ...t, resume: true }));
                    }}
                    onBlur={() => setTouched((t) => ({ ...t, resume: true }))}
                    aria-invalid={!!showErr("resume", resumeErrBase)}
                  />
                  <span className="underline">
                    {resumeFile
                      ? `Selected: ${resumeFile.name}`
                      : "Click to upload your resume (optional for now)"}
                  </span>
                  {resumeFile && (
                    <span className="block mt-1 text-xs opacity-70">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  )}
                </label>
                {showErr("resume", resumeErrBase) && (
                  <p className="text-xs text-libelle-error mt-1">
                    {resumeErrBase}
                  </p>
                )}
              </div>

              {/* Why */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-libelle-text">
                  Why are you interested in TCUS{" "}
                  <span className="text-libelle-gray">(optional)</span>
                </label>
                <textarea
                  rows={6}
                  value={why}
                  onChange={(e) => setWhy(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, why: true }))}
                  placeholder="Tell us more about what motivates you and where you want to plug in."
                  className={baseTextArea}
                />
                <p className="text-xs text-libelle-gray">
                  This will help us understand you better
                </p>
              </div>

              {/* Privacy & consent panel */}
              <div className="rounded-xl border border-libelle-accent/20 bg-libelle-background">
                <div className="rounded-t-xl bg-libelle-accent px-4 py-2 text-sm font-medium text-white">
                  Privacy and consent
                </div>
                <div className="space-y-4 px-4 py-4 text-sm leading-relaxed text-libelle-text">
                  <p>
                    At The Chamber of Us (TCUS), we take your privacy seriously.
                    We will use the information you share here solely for the
                    purpose of matching you with volunteer opportunities that align
                    with your skills, interests, and availability.
                  </p>
                  <p>
                    We do not collect any data beyond what is required to fulfill
                    this purpose. We will never sell, share, or use your data for
                    advertising, profiling, or unrelated analysis.
                  </p>
                  <p>
                    You can access, edit, or delete your information at any time.
                    Our practices are designed to meet or exceed data protection
                    laws including the GDPR and CCPA. See our full privacy policy.{" "}
                    <a
                      className="underline"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      See our privacy policy
                    </a>
                    .
                  </p>

                  {/* Consent required */}
                  <label className="flex gap-3 items-start">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-libelle-gray text-libelle-accent focus:ring-libelle-accent cursor-pointer"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      onBlur={() =>
                        setTouched((t) => ({ ...t, consent: true }))
                      }
                      aria-invalid={
                        !!showErr(
                          "consent",
                          consent ? undefined : "Consent is required to proceed"
                        )
                      }
                    />
                    <span>
                      I understand and consent to TCUS using the information I’ve
                      provided to match me with volunteer opportunities in
                      alignment with the mission.{" "}
                      <span className="text-libelle-error">*</span>
                    </span>
                  </label>
                  {showErr("consent", consent ? undefined : "Consent is required to proceed") && (
                    <p className="text-xs text-libelle-error">
                      Consent is required to proceed
                    </p>
                  )}

                  {/* Optional opt-in */}
                  <label className="flex gap-3 items-start">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-libelle-gray text-libelle-accent focus:ring-libelle-accent cursor-pointer"
                      checked={optIn}
                      onChange={(e) => setOptIn(e.target.checked)}
                    />
                    <span>
                      We’re building something big and experimental at TCUS, and
                      we’d love to keep you in the loop as new projects and
                      volunteer opportunities emerge{" "}
                      <span className="text-libelle-gray">(optional)</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Actions (centered) */}
              <div className="flex items-center justify-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-lg bg-libelle-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-libelle-accent/90 focus:outline-none focus:ring-2 focus:ring-libelle-accent disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  aria-busy={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="reset"
                  disabled={loading}
                  className="rounded-lg border border-libelle-gray bg-white px-5 py-2.5 text-sm font-medium text-libelle-text hover:bg-libelle-background focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  onClick={handleReset}
                >
                  Clear form
                </button>
              </div>
            </form>
          </div>

          {/* Bottom copy */}
          <div className="mx-auto max-w-2xl pt-10 text-center">
            <h2 className="text-lg font-semibold text-libelle-text">
              Ready to join?
            </h2>
            <div className="mt-2 space-y-2 text-sm text-libelle-text leading-relaxed">
              <p>
                We’re not just looking for volunteers—we’re looking for builders.
                We’re a remote-first, flexible crew, and we’re building the future
                of social impact together.
              </p>
              <p className="text-libelle-gray">
                This is a quick intake, designed to help us understand where you
                can best plug in. Once you submit, a core team member will reach
                out with the next steps.
              </p>
              <p>
                Born from a flood of resumes. Built by the ones who sent them.
                That’s Libelle.
              </p>
              <p className="text-xs text-libelle-gray">
                Built inside The Chamber of Us (TCUS), a volunteer-powered
                nonprofit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
