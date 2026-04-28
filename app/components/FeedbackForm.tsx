'use client';

import { useState } from 'react';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clarity: 5,
    design: 5,
    usability: 5,
    feedback: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          clarity: 5,
          design: 5,
          usability: 5,
          feedback: '',
        });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError('Failed to submit feedback. Please try again.');
      }
    } catch (err) {
      setError('Error submitting feedback. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Share Your Feedback</h2>

      {submitted && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded">
          Thank you! Your feedback has been recorded. ✓
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            How clear is the dashboard design? (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.clarity}
            onChange={(e) => setFormData({ ...formData, clarity: parseInt(e.target.value) })}
            className="w-full"
          />
          <span className="text-sm text-gray-600">{formData.clarity}/10</span>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            How do you rate the overall design? (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.design}
            onChange={(e) => setFormData({ ...formData, design: parseInt(e.target.value) })}
            className="w-full"
          />
          <span className="text-sm text-gray-600">{formData.design}/10</span>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            How easy is it to use? (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.usability}
            onChange={(e) => setFormData({ ...formData, usability: parseInt(e.target.value) })}
            className="w-full"
          />
          <span className="text-sm text-gray-600">{formData.usability}/10</span>
        </div>
      </div>

      <textarea
        placeholder="Additional feedback or suggestions..."
        value={formData.feedback}
        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
      >
        Submit Feedback
      </button>
    </form>
  );
}
