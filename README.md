# Libelle Volunteer Intake – Frontend (MVP)

An open-source user interface built by **The Chamber of Us (TCUS)** to onboard volunteers in a simple, ethical, and engaging way.

This MVP provides a lightweight React frontend for submitting basic information and a resume, designed to be intuitive, mobile-friendly, and respectful of user privacy.

---

## ✨ Features

- Simple, elegant volunteer intake form
- Tailwind-styled, accessible UI
- Anonymous interaction logging (optional)
- Built for integration with [`libelle-core`](https://github.com/the-chamber-of-us/libelle-core)
- Privacy-first: No third-party tracking, no analytics bloat

---

## 🚀 Quickstart

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- The [`libelle-core`](https://github.com/the-chamber-of-us/libelle-core) backend running locally or deployed

### Setup

```bash
git clone https://github.com/thechamberofus/libelle-frontend.git
cd libelle-frontend
npm install
```

To start the development server:

```bash
npm run dev
```

By default, the form will POST to `http://localhost:8000/upload`.

---

## 📁 Project Structure

```
/src
  ├── components/       # Reusable form components
  ├── pages/            # Page routes (form, success)
  ├── styles/           # Global styles
  ├── lib/              # Helper functions
.env.local              # For local config (optional)
```

---

## 📡 Backend Integration

This frontend is designed to work seamlessly with the [`libelle-core`](https://github.com/the-chamber-of-us/libelle-core) backend. You can update the API endpoint in `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🔍 Observability & Analytics

We support **anonymous, lightweight analytics** to help improve usability without compromising privacy.

### Optional tools (suggested):

- [Plausible](https://plausible.io/) (self-hosted or EU-based)
- Simple in-house logging via backend

### ⚠️ Requirements:

- GDPR / CCPA compliant
- No opaque data practices or reselling
- Consent-based tracking only
- Anonymous event logging preferred

---

## 💡 Design Philosophy

Libelle is built with the following principles:

- **Ethical by default** – No dark patterns, no hidden data capture
- **Minimal and accessible** – Usable by anyone, on any device
- **Volunteer-first** – This is for real people, not HR pipelines

---

## 🛠️ Development Notes

- Built with **React + Vite + TailwindCSS**
- Form validation via `react-hook-form`
- Animations via `framer-motion` (optional)
- All interaction tracking is optional and anonymized

We welcome contributions — especially from early-career devs and learners. See `CONTRIBUTING.md` (coming soon).

---

## 📬 Contact

**Maintainers:**

- Kevin Schmidt – [kevin@thechamberofus.org](mailto:kevin@thechamberofus.org)  
- TBD – frontend lead(s)

