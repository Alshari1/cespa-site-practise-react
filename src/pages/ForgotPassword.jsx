import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      await resetPassword(email)
      setMessage('Password reset email sent! Check your inbox.')
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-teal-900 flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%, rgba(29,158,117,0.10) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(15,110,86,0.08) 0%, transparent 50%)
        `,
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
        <div className="mb-7">
          <h1 className="text-3xl font-semibold text-gray-900 leading-tight text-center">
            Reset Password
          </h1>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:bg-white"
            />
          </div>

          <div className="mt-5">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-teal-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-5">
            Remember your password?{' '}
            <Link to="/login" className="text-teal-700 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
