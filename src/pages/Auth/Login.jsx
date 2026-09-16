import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Plane } from 'lucide-react'
import { useAuth } from '../../components/hooks/useAuth';

function Login() {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    if (error.general) setErrors((prev) => ({...prev, general: ''}))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setLoading(true)
    const res = await login(formData)
    setLoading(false)

    if(res.success) {
      navigate('/')
    } else {
      setErrors({general: res.message})
    }
  }


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url('https://i.pinimg.com/1200x/dd/34/f2/dd34f2caf11d4e4f235559eba14bf832.jpg')" }}>

      <div className="absolute inset-0 bg-[#0b1220]/60" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-sky-500 to-blue-700 rounded-2xl mb-4 shadow-lg shadow-sky-950/40">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-sky-100/70 mt-2">Sign in to your EasyTrip account</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
          {errors.general && (
            <div className="mb-4 p-3 bg-red-500/15 border border-red-400/40 rounded-lg text-red-300 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-sky-100/80 px-1 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-300" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.email ? 'border-red-400/70 focus:ring-red-400/40' : 'border-white/25 focus:ring-sky-400/60 focus:border-sky-400'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium px-1 text-sky-100/80 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-11 pr-11 py-3 border rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.password ? 'border-red-400/70 focus:ring-red-400/40' : 'border-white/25 focus:ring-sky-400/60 focus:border-sky-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-200/50 hover:text-sky-100"
                >
                  {showPassword ? <Eye className="w-5 h-5 text-sky-200/70" /> : <EyeOff className="w-5 h-5 text-sky-200/70" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-300">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-sky-300/40 bg-sky-400/10 text-sky-400 focus:ring-sky-400/50 accent-sky-400" />
                <span className="text-sm text-sky-100/80">Remember me</span>
              </label>
              <Link to="/forgot" className="text-sm text-sky-300 hover:text-sky-200 font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sky-950/50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          

          <div className='mt-6 relative'>
            <div className='w-full border-t border-2 border-white/20'></div>
            <div className='flex justify-center text-md pt-2'>
              <span className='bg-transparent px-4 text-sky-100/50'>or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-white/20 bg-white/5 rounded-xl hover:bg-white/10 hover:border-white/35 transition text-sm font-medium text-sky-100/90">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-white/20 bg-white/5 rounded-xl hover:bg-white/10 hover:border-white/35 transition text-sm font-medium text-sky-100/90">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-sky-100/70">
          Don't have an account?{' '}
          <Link to="/register" className="text-sky-300 hover:text-sky-200 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login