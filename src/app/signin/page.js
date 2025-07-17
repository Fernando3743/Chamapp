"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSupabaseAuth } from "@/app/contexts/SupabaseAuthContext";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { loginTranslations } from "@/lib/translations/pages/login";

export default function SignInPage() {
  const router = useRouter();
  const { signIn, user } = useSupabaseAuth();
  const { language } = useLanguage();
  const t = (key) =>
    loginTranslations[key]?.[language] || loginTranslations[key]?.en || key;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Load remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({ email: "", password: "" });

    // Validate
    if (!validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        setErrors((prev) => ({ ...prev, password: t("invalidCredentials") }));
        // Add shake animation to form
        const form = e.target;
        form.classList.add("animate-shake");
        setTimeout(() => {
          form.classList.remove("animate-shake");
        }, 500);
      } else {
        // Success
        setSuccess(true);

        // Handle remember me
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // Redirect after animation
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, password: t.errors.invalidCredentials }));
    } finally {
      if (!success) {
        setLoading(false);
      }
    }
  };

  const handleRememberMeChange = (checked) => {
    setRememberMe(checked);
    if (!checked) {
      localStorage.removeItem("rememberedEmail");
    }
  };

  return (
    <div className="font-sans text-white min-h-screen flex items-center justify-center pt-20 pb-5 px-5 relative overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed w-full h-full top-0 left-0 -z-10 overflow-hidden">
        <div className="absolute rounded-full bg-primary-gradient w-[600px] h-[600px] -top-[300px] -right-[200px] blur-[100px] opacity-50 animate-float"></div>
        <div
          className="absolute rounded-full bg-gradient-to-br from-[#f093fb] to-[#f5576c] w-[400px] h-[400px] -bottom-[200px] -left-[100px] blur-[100px] opacity-50 animate-float"
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className="absolute rounded-full bg-gradient-to-br from-[#4facfe] to-[#00f2fe] w-[300px] h-[300px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-[100px] opacity-50 animate-float"
          style={{ animationDelay: "10s" }}
        ></div>
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-12 left-12 flex items-center gap-2 text-white/80 text-sm transition-all duration-300 hover:text-white hover:-translate-x-1"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        {t("backToHome")}
      </Link>

      {/* Sign In Container */}
      <div className="w-full max-w-[440px] relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold gradient-text mb-2">BusinessHub</h1>
          <p className="text-white/80 text-base">{t("welcomeBack")}</p>
        </div>

        {/* Sign In Card */}
        <div className="glass backdrop-blur-20 rounded-[30px] p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.1)]">
          <div className="text-center mb-10">
            <h2 className="text-3xl mb-2">{t("signInToAccount")}</h2>
            <p className="text-white/80 text-base">
              {t("dontHaveAccount")}{" "}
              <Link
                href="/signup"
                className="text-indigo-400 hover:text-purple-400 transition-colors duration-300"
              >
                {t("SignUp")}
              </Link>
            </p>
          </div>

          {/* Demo Notice */}
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-3 mb-5 text-sm text-yellow-400 text-center">
            Demo: Use email &quot;demo@businesshub.com&quot; and password
            &quot;Demo123!&quot;
          </div>

          <form
            onSubmit={handleSubmit}
            className={loading && !success ? "pointer-events-none" : ""}
          >
            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white/80"
              >
                {t("emailRequired")}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                className={`glass-input w-full p-4 rounded-xl text-white text-base transition-all duration-300 outline-none placeholder-white/40 ${
                  errors.email ? "error" : email ? "success" : ""
                }`}
                placeholder={t("enterEmail")}
                required
              />
              {errors.email && (
                <div className="error-message bg-red-500/10 border border-red-500/30 rounded-lg p-3 mt-2 text-sm text-red-400">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white/80"
              >
                {t("passwordRequired")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  className={`glass-input w-full p-4 rounded-xl text-white text-base transition-all duration-300 outline-none placeholder-white/40 pr-12 ${
                    errors.password ? "error" : password ? "success" : ""
                  }`}
                  placeholder={t("enterPassword")}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors duration-300 p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && (
                <div className="error-message bg-red-500/10 border border-red-500/30 rounded-lg p-3 mt-2 text-sm text-red-400">
                  {errors.password}
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center mb-8 max-sm:flex-col max-sm:gap-4 max-sm:items-start">
              <div className="flex items-center gap-3">
                <div className="relative w-5 h-5">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => handleRememberMeChange(e.target.checked)}
                    className="opacity-0 absolute w-full h-full cursor-pointer"
                  />
                  <div
                    className={`checkbox-custom absolute top-0 left-0 w-5 h-5 ${
                      rememberMe ? "bg-primary-gradient" : "bg-white/5"
                    } border border-white/20 rounded-md transition-all duration-300 flex items-center justify-center`}
                  >
                    {rememberMe && (
                      <span className="text-white text-xs font-bold">✓</span>
                    )}
                  </div>
                </div>
                <label
                  htmlFor="remember"
                  className="text-sm text-white/80 cursor-pointer"
                >
                  {t("rememberMe")}
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-indigo-400 hover:text-purple-400 transition-colors duration-300"
              >
                {t("forgotPassword")}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 bg-primary-gradient rounded-full text-white text-base font-semibold cursor-pointer transition-all duration-300 mb-8 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 rounded-full border-t-white animate-spin-slow" />
              ) : (
                <span>{t("signIn")}</span>
              )}
            </button>

            {/* Success Checkmark */}
            {success && (
              <svg
                className="w-12 h-12 mx-auto mb-5 animate-scale-in"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className="checkmark-circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="checkmark-check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            )}

            {/* Divider */}
            <div className="relative text-center my-8">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
              <span className="relative glass px-5 text-white/80 text-sm">
                Or continue with
              </span>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8 max-sm:grid-cols-1">
              <button
                type="button"
                onClick={() => alert("Google login not implemented yet")}
                className="flex items-center justify-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => alert("Facebook login not implemented yet")}
                className="flex items-center justify-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Facebook
              </button>
            </div>

            {/* Footer */}
            <div className="text-center text-white/80 text-sm">
              Need help?{" "}
              <Link
                href="/support"
                className="text-indigo-400 hover:text-purple-400 transition-colors duration-300"
              >
                Contact Support
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
