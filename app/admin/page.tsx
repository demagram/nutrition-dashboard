'use client';

import { useState, useEffect } from 'react';

interface Feedback {
  id: number;
  timestamp: string;
  name: string;
  email: string;
  clarity: number;
  design: number;
  usability: number;
  feedback: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/feedback', {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setFeedbackList(data);
        setIsAuthed(true);
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Error loading feedback');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
        >
          <h1 className="text-2xl font-bold mb-6 text-gray-900">Admin Panel</h1>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin password"
            />
          </div>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded transition"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  const avgClarity = feedbackList.length
    ? (feedbackList.reduce((sum, f) => sum + f.clarity, 0) / feedbackList.length).toFixed(1)
    : 0;

  const avgDesign = feedbackList.length
    ? (feedbackList.reduce((sum, f) => sum + f.design, 0) / feedbackList.length).toFixed(1)
    : 0;

  const avgUsability = feedbackList.length
    ? (feedbackList.reduce((sum, f) => sum + f.usability, 0) / feedbackList.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Feedback Dashboard</h1>
          <button
            onClick={() => {
              setIsAuthed(false);
              setPassword('');
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 text-white">
            <p className="text-gray-400 text-sm">Total Responses</p>
            <p className="text-3xl font-bold">{feedbackList.length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-white">
            <p className="text-gray-400 text-sm">Avg Clarity</p>
            <p className="text-3xl font-bold">{avgClarity}/10</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-white">
            <p className="text-gray-400 text-sm">Avg Design Rating</p>
            <p className="text-3xl font-bold">{avgDesign}/10</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-white">
            <p className="text-gray-400 text-sm">Avg Usability</p>
            <p className="text-3xl font-bold">{avgUsability}/10</p>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">All Feedback</h2>
          {feedbackList.length === 0 ? (
            <p className="text-gray-400">No feedback yet.</p>
          ) : (
            feedbackList
              .slice()
              .reverse()
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-white font-semibold">{item.name}</p>
                      <p className="text-gray-400 text-sm">{item.email}</p>
                    </div>
                    <p className="text-gray-500 text-xs">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Clarity</p>
                      <p className="text-white font-semibold">{item.clarity}/10</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Design</p>
                      <p className="text-white font-semibold">{item.design}/10</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Usability</p>
                      <p className="text-white font-semibold">{item.usability}/10</p>
                    </div>
                  </div>

                  {item.feedback && (
                    <p className="text-gray-300 text-sm bg-gray-900 rounded p-3">
                      {item.feedback}
                    </p>
                  )}
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
