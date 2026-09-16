import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, Plane, CheckCircle } from 'lucide-react'
import { useAuth } from '../../components/hooks/useAuth'

function ForgotPassword() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      setError('Email is required')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid')
      return
    }

    setLoading(true)
    setError('')
    const res = await forgotPassword(email)
    setLoading(false)

    if (res.success) {
      setSent(true)
    } else {
      setError(res.message)
    }
  }

  if (sent) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/dd/34/f2/dd34f2caf11d4e4f235559eba14bf832.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#0b1220]/60" />
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-500/20 border border-sky-400/40 rounded-2xl mb-4">
            <CheckCircle className="w-8 h-8 text-sky-300" />
          </div>
          <h1 className="text-3xl font-bold text-white">Check Your Email</h1>
          <p className="text-sky-100/70 mt-2 mb-6">
            We&apos;ve sent a password reset link to
          </p>
          <p className="text-white font-semibold bg-white/10 border border-white/20 rounded-xl py-3 px-4 mb-6">{email}</p>
          <p className="text-sm text-sky-100/50 mb-8">
            Didn&apos;t receive the email? Check your spam folder or try again.
          </p>
          <button
            onClick={() => { setSent(false); setEmail('') }}
            className="w-full py-3 bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-xl transition shadow-lg shadow-sky-950/50"
          >
            Resend Email
          </button>
          <div className="mt-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 text-sm text-sky-200 hover:text-sky-100 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url('https://i.pinimg.com/1200x/dd/34/f2/dd34f2caf11d4e4f235559eba14bf832.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#0b1220]/60" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-sky-500 to-blue-700 rounded-2xl mb-4 shadow-lg shadow-sky-950/40">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Forgot Password?</h1>
          <p className="text-sky-100/70 mt-2">
            No worries, we&apos;ll send you reset instructions
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/15 border border-red-400/40 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-sky-100/80 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-300/70" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder="you@example.com"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    error ? 'border-red-400/70 focus:ring-red-400/40' : 'border-white/25 focus:ring-sky-400/60 focus:border-sky-400'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sky-950/50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-sky-100/70">
            <Plane className="w-4 h-4 text-sky-300/70" />
            <span>Remember your password?</span>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-sky-300 hover:text-sky-200 font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-sky-300/70" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword