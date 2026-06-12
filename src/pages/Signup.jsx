import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { saveUser } from '../Api/Api'

export default function Signup() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { uid } = await register({ name: form.username, email: form.email, password: form.password })
      await saveUser({ uid, username: form.username, email: form.email })
      alert('Registration successful! Please log in.')
      navigate('/login')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.')
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
            Create Account
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Username</label>
            <input
              name="username" type="text" placeholder="Rafin"
              autoComplete="username" required
              value={form.username} onChange={handleChange}
              className="w-full h-11 px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:bg-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
            <input
              name="email" type="email" placeholder="you@example.com"
              autoComplete="email" required
              value={form.email} onChange={handleChange}
              className="w-full h-11 px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:bg-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
            <input
              name="password" type="password" placeholder="Min. 8 characters"
              required minLength={8}
              value={form.password} onChange={handleChange}
              className="w-full h-11 px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:bg-white"
            />
          </div>

          <div className="mt-5">
            <button
              type="submit" disabled={loading}
              className="w-full h-12 bg-teal-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create Account'}
              <i className="ti ti-arrow-right text-base"></i>
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-teal-700 font-medium hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
