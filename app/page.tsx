import Dashboard from './components/Dashboard';
import FeedbackForm from './components/FeedbackForm';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Nutrition Dashboard Prototype</h1>
          <Link
            href="/admin"
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded transition"
          >
            Admin Panel
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Help us improve the nutrition tracking dashboard
          </h2>
          <p className="text-lg text-gray-600">
            Test different dashboard states and provide feedback on the design, clarity, and usability. Your input helps us create a better experience for nutrition tracking.
          </p>
        </div>

        {/* Dashboard Section */}
        <div className="mb-12">
          <Dashboard />
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">How to Test:</h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Use the buttons above the dashboard to switch between different UI states</li>
            <li>• Each state represents a different user scenario (empty, tracking meals, over limit, etc.)</li>
            <li>• Observe how the design communicates nutritional information in each scenario</li>
            <li>• After testing, scroll down and complete the feedback form</li>
          </ul>
        </div>

        {/* Feedback Form */}
        <FeedbackForm />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-12">
        <p>Nutrition Dashboard Prototype Testing • Questions? Email us at feedback@example.com</p>
      </footer>
    </div>
  );
}
