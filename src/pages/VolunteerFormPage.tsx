// src/pages/VolunteerFormPage.tsx
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

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const isRequired = (v: string) =>
    v.trim().length ? undefined : "This field is required";

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const numberInRange = (v: string, min: number, max: number) => {
    if (!v.trim().length) return "This field is required";
    const n = Number(v);
    if (!Number.isFinite(n)) return "Please enter a valid number";
    if (n < min || n > max) return `Value must be between ${min} and ${max}`;
    return undefined;
  };

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

  const MAX_MB =
    Number(import.meta.env.VITE_MAX_FILE_MB ?? 5) || 5;
  const maxBytes = MAX_MB * 1024 * 1024;

  const validateResume = (file: File | null): string | undefined => {
    if (!file) return "This field is required";
    if (file.type !== "application/pdf") return "Only PDF files are allowed";
    if (file.size > maxBytes)
      return `File is too large (max ${MAX_MB} MB)`;
    return undefined;
  };

  const resumeErrBase = validateResume(resumeFile);

  const showErr = (field: string, err?: string) =>
    (submitted || touched[field]) ? err : undefined;

  const showValid = (field: string, valPresent: boolean, err?: string) =>
    (submitted || touched[field]) && valPresent && !err;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const anyError =
      fullNameErr ||
      emailBaseErr ||
      locationErr ||
      areasErr ||
      capacityErr ||
      resumeErrBase;

    if (!anyError) {
      // aquí iría el POST /upload con FormData
      // const fd = new FormData();
      // fd.append("name", fullName);
      // fd.append("email", email);
      // fd.append("location", location);
      // fd.append("areas", areas);
      // fd.append("capacity", capacity);
      // fd.append("experience", experience);
      // fd.append("linkedin", linkedin);
      // fd.append("github", github);
      // fd.append("why", why);
      // if (resumeFile) fd.append("resume", resumeFile);

      // fetch(`${import.meta.env.VITE_API_BASE_URL}/upload`, { method: "POST", body: fd })

      // console.log("OK submit");
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
    setTouched({});
    setSubmitted(false);
  };

  const baseTextArea =
    "w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 border-gray-300 focus:ring-indigo-500";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Intro band */}
      <section className="bg-indigo-50">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            We help you plug in fast.
          </h1>
          <div className="mt-4 space-y-3 text-sm md:text-base text-gray-700 leading-relaxed">
            <p>
              You found us for a reason. You’re ready to put your talent toward
              something that matters.
            </p>
            <p>
              You won’t just be another volunteer—you’ll be a co-founder in a new kind of organization.
            </p>
            <p>
              Here’s our promise: We’ll connect you with a team, give you a clear mission,
              and put your skills to work on a project with real-world stakes.
              No more wasted time. Just meaningful work, with people aligned on mission.
            </p>
            <p className="text-gray-500">Most people finish in under 5 minutes.</p>
          </div>

          {/* Card */}
          <div className="mt-10 rounded-2xl bg-white p-6 md:p-8 shadow-sm border border-gray-200 text-left">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Grid 2 cols on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <Input
                  label="Full Name"
                  required
                  value={fullName}
                  onChange={setFullName}
                  onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                  placeholder="Ex: John Doe"
                  error={showErr("fullName", fullNameErr)}
                  valid={showValid("fullName", fullName.trim().length > 0, fullNameErr)}
                />

                {/* Email */}
                <Input
                  label="Email"
                  required
                  type="email"
                  value={email}
                  onChange={setEmail}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="Ex: john.doe@example.com"
                  error={showErr("email", emailBaseErr)}
                  valid={showValid("email", email.trim().length > 0, emailBaseErr)}
                />

                {/* Location */}
                <Input
                  label="Location"
                  required
                  value={location}
                  onChange={setLocation}
                  onBlur={() => setTouched((t) => ({ ...t, location: true }))}
                  placeholder="Ex: San Francisco, CA, USA"
                  error={showErr("location", locationErr)}
                  valid={showValid("location", location.trim().length > 0, locationErr)}
                />

                {/* Areas of Interest */}
                <Input
                  label="Areas of Interest"
                  required
                  value={areas}
                  onChange={setAreas}
                  onBlur={() => setTouched((t) => ({ ...t, areas: true }))}
                  placeholder="Ex: Education, Healthcare, Environment"
                  error={showErr("areas", areasErr)}
                  valid={showValid("areas", areas.trim().length > 0, areasErr)}
                />

                {/* Capacity (number 0–168) */}
                <Input
                  label="Capacity (Hours/week)"
                  required
                  type="number"
                  value={capacity}
                  onChange={setCapacity}
                  onBlur={() => setTouched((t) => ({ ...t, capacity: true }))}
                  placeholder="Ex: 2"
                  error={showErr("capacity", capacityErr)}
                  valid={showValid("capacity", capacity.trim().length > 0, capacityErr)}
                />

                {/* Experience Level (optional) */}
                <Input
                  label="Experience Level (optional)"
                  value={experience}
                  onChange={setExperience}
                  onBlur={() => setTouched((t) => ({ ...t, experience: true }))}
                  placeholder="Ex: Entry, Mid, Senior"
                />

                {/* LinkedIn (optional) */}
                <Input
                  label="LinkedIn Link (optional)"
                  type="url"
                  value={linkedin}
                  onChange={setLinkedin}
                  onBlur={() => setTouched((t) => ({ ...t, linkedin: true }))}
                  placeholder="Ex: linkedin.com/in/johndoe"
                />

                {/* GitHub (optional) */}
                <Input
                  label="GitHub Link (optional)"
                  type="url"
                  value={github}
                  onChange={setGithub}
                  onBlur={() => setTouched((t) => ({ ...t, github: true }))}
                  placeholder="Ex: github.com/johndoe"
                />
              </div>

              {/* Upload (PDF only) */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-800">
                  Upload resume (PDF only, max {MAX_MB}MB) <span className="text-rose-600">*</span>
                </label>

                <label
                  className={[
                    "block cursor-pointer rounded-lg border-2 border-dashed px-4 py-6 text-center text-sm hover:bg-gray-100",
                    showErr("resume", resumeErrBase)
                      ? "border-[#F43F5E] text-[#F43F5E]/90"
                      : showValid("resume", !!resumeFile, resumeErrBase)
                      ? "border-[#10B981] text-[#10B981]"
                      : "border-gray-300 text-indigo-700 bg-gray-50",
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
                    {resumeFile ? `Selected: ${resumeFile.name}` : "Click to upload your resume"}
                  </span>
                  {resumeFile && (
                    <span className="block mt-1 text-xs opacity-70">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  )}
                </label>

                {showErr("resume", resumeErrBase) && (
                  <p className="text-xs text-[#F43F5E] mt-1">{resumeErrBase}</p>
                )}
              </div>

              {/* Why */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-800">
                  Why are you interested in TCUS <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  rows={6}
                  value={why}
                  onChange={(e) => setWhy(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, why: true }))}
                  placeholder="Tell us more about what motivates you and where you want to plug in."
                  className={baseTextArea}
                />
              </div>

              {/* Privacy & consent panel */}
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/60">
                <div className="rounded-t-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
                  Privacy and consent
                </div>
                <div className="space-y-4 px-4 py-4 text-sm leading-relaxed text-gray-800">
                  <p>
                    At The Chamber of Us (TCUS), we take your privacy seriously. We will use the
                    information you share here solely for the purpose of matching you with volunteer
                    opportunities that align with your skills, interests, and availability.
                  </p>
                  <p>
                    We do not collect any data beyond what is required to fulfill this purpose.
                    We will never sell, share, or use your data for advertising, profiling, or unrelated analysis.
                  </p>
                  <p>
                    You can access, edit, or delete your information at any time. Our practices are
                    designed to meet or exceed data protection laws including the GDPR and CCPA.
                    See our full privacy policy. <a className="underline" href="#" onClick={(e)=>e.preventDefault()}>See our privacy policy</a>.
                  </p>

                  <label className="flex gap-3 items-start">
                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span>
                      I understand and consent to TCUS using the information I’ve provided to match me with
                      volunteer opportunities in alignment with the mission. <span className="text-rose-600">*</span>
                    </span>
                  </label>

                  <label className="flex gap-3 items-start">
                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span>
                      We’re building something big and experimental at TCUS, and we’d love to keep you in the loop
                      as new projects and volunteer opportunities emerge <span className="text-gray-500">(optional)</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={handleReset}
                >
                  Clear form
                </button>
              </div>
            </form>
          </div>

          {/* Bottom copy */}
          <div className="mx-auto max-w-2xl pt-10 text-center">
            <h2 className="text-lg font-semibold text-gray-900">Ready to join?</h2>
            <div className="mt-2 space-y-2 text-sm text-gray-600 leading-relaxed">
              <p>
                We’re not just looking for volunteers—we’re looking for builders. We’re a remote-first, flexible crew,
                and we’re building the future of social impact together.
              </p>
              <p className="text-gray-500">
                This is a quick intake, designed to help us understand where you can best plug in. Once you submit,
                a core team member will reach out with the next steps.
              </p>
              <p>
                Born from a flood of resumes. Built by the ones who sent them. That’s Libelle.
              </p>
              <p className="text-xs text-gray-400">
                Built inside The Chamber of Us (TCUS), a volunteer-powered nonprofit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
