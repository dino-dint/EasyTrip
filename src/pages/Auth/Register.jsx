import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Plane, Phone } from "lucide-react";
import { useAuth } from "../../components/hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Enter a valid phone number";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    const res = await register(formData);
    setLoading(false);

    if (res.success) {
      navigate("/");
    } else {
      setErrors({ general: res.message });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 py-8"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/dd/34/f2/dd34f2caf11d4e4f235559eba14bf832.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-[#0b1220]/60" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-sky-500 to-blue-700 rounded-2xl mb-4 shadow-lg shadow-sky-950/40">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-sky-100/70 mt-2">
            Start your journey with EasyTrip
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
          {errors.general && (
            <div className="mb-4 p-3 bg-red-500/15 border border-red-400/40 rounded-lg text-red-300 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-sky-100/80 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-300/70" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="violat"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.name
                      ? "border-red-400/70 focus:ring-red-400/40"
                      : "border-white/25 focus:ring-sky-400/60 focus:border-sky-400"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-300">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-100/80 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-300/70" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hehe@gmail.com"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.email
                      ? "border-red-400/70 focus:ring-red-400/40"
                      : "border-white/25 focus:ring-sky-400/60 focus:border-sky-400"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-300">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-100/80 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-300/70" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.phone
                      ? "border-red-400/70 focus:ring-red-400/40"
                      : "border-white/25 focus:ring-sky-400/60 focus:border-sky-400"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-300">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-100/80 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-300/70" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`w-full pl-11 pr-11 py-3 border rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.password
                      ? "border-red-400/70 focus:ring-red-400/40"
                      : "border-white/25 focus:ring-sky-400/60 focus:border-sky-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-200/70 hover:text-sky-100"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-300">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-100/80 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-300/70" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full pl-11 pr-11 py-3 border rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.confirmPassword
                      ? "border-red-400/70 focus:ring-red-400/40"
                      : "border-white/25 focus:ring-sky-400/60 focus:border-sky-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-200/70 hover:text-sky-100"
                >
                  {showConfirm ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-300">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <label className="flex items-start gap-2 cursor-pointer mt-2">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 rounded border-sky-300/40 bg-sky-400/10 text-sky-400 focus:ring-sky-400/50 accent-sky-400"
              />
              <span className="text-sm text-sky-100/80">
                I agree to the{" "}
                <span className="text-sky-300 font-medium hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-sky-300 font-medium hover:underline">
                  Privacy Policy
                </span>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sky-950/50 mt-2"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-sky-100/70">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-300 hover:text-sky-200 font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
