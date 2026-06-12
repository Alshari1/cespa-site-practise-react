import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import './login.css';
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, googleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResend = async () => {
    setError("");
    setLoading(true);
    try {
      const credential = await login(formData.email, formData.password);
      await sendEmailVerification(credential.user);
      await signOut(auth);
      alert("Verification email resent! Please check your inbox.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = await login(formData.email, formData.password);
      await credential.user.reload();

      if (credential.user.emailVerified) {
        setShowProfilePrompt(true);
      } else {
        await signOut(auth);
        setError("Please verify your email before logging in.");
      }
    } catch (err) {
      if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      console.log("Google Login Result:", result.user);
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

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
      <div className="relative">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10"
        >
          <div className="fade-up delay-2 mb-7">
            <h1 className="text-3xl font-semibold text-gray-900 leading-tight text-center">
              Login Please!!
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              <p>{error}</p>
              {error === "Please verify your email before logging in." && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading}
                  className="mt-2 text-teal-700 font-medium hover:underline text-sm"
                >
                  {loading ? "Sending..." : "Resend verification email"}
                </button>
              )}
            </div>
          )}

          <div className="fade-up delay-5 mb-4">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
              Email address
            </label>

            <div className="relative">
              <i className="ti ti-mail absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-base pointer-events-none"></i>

              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-11 pl-9 pr-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:bg-white"
              />
            </div>
          </div>

          <div className="fade-up delay-6 mb-4">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
              Password
            </label>

            <div className="relative">
              <i className="ti ti-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-base pointer-events-none"></i>

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-11 pl-9 pr-11 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:bg-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                <i
                  className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"
                    } text-base`}
                ></i>
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <Link
              to="/forgot-password"
              className="text-xs text-teal-700 font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="fade-up delay-8 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="submit-btn w-full h-12 bg-teal-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span>{loading ? "Logging in..." : "Log In"}</span>
              <i className="ti ti-arrow-right text-base"></i>
            </button>
          </div>

          <div className="mt-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-12 border border-gray-200 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <i className="ti ti-brand-google"></i>
              Continue with Google
            </button>
          </div>

          <p className="fade-up delay-9 text-center text-sm text-gray-400 mt-5">
            Don't have an account?{" "}
            <Link to="/signup" className="text-teal-700 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </form>

        {showProfilePrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Login Successful!
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Would you like to set up your profile?
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/profile", { replace: true })}
                  className="flex-1 h-11 bg-teal-700 text-white rounded-xl text-sm font-semibold hover:bg-teal-800 transition"
                >
                  Go to Profile
                </button>
                <button
                  type="button"
                  onClick={() => navigate(from, { replace: true })}
                  className="flex-1 h-11 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
