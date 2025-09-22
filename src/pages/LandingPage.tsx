import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-50 text-center">
      <header className="p-4 bg-indigo-600 text-white text-lg font-bold">
        Libelle
      </header>

      <main className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome to Libelle Volunteer Intake
        </h1>
        <p className="mb-6 max-w-md text-gray-700">
          A simple and privacy-first way to start your volunteering journey.
        </p>
        <Link
          to="/volunteer"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Join the Mission
        </Link>
      </main>

      <footer className="p-4 bg-gray-100 text-sm text-gray-600">
        © {new Date().getFullYear()} The Chamber of Us
      </footer>
    </div>
  );
}
