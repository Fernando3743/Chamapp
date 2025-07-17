"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSupabaseAuth } from "@/app/contexts/SupabaseAuthContext";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { registerTranslations } from "@/lib/translations/pages/register";

export default function RegisterPage() {
  const router = useRouter();
  const { signIn, user } = useSupabaseAuth();
  const { language } = useLanguage();
  const t = (key) =>
    registerTranslations[key]?.[language] ||
    registerTranslations[key]?.en ||
    key;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    setPasswordStrength(strength);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear errors when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Check password strength
    if (name === "password") {
      checkPasswordStrength(value);
    }

    // Check password match
    if (
      name === "confirmPassword" ||
      (name === "password" && formData.confirmPassword)
    ) {
      const password = name === "password" ? value : formData.password;
      const confirmPassword =
        name === "confirmPassword" ? value : formData.confirmPassword;

      if (confirmPassword && password !== confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: t("passwordsDoNotMatch"),
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (formData.email && !validateEmail(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({ email: "", password: "", confirmPassword: "", terms: "" });

    // Validation
    let hasErrors = false;

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      hasErrors = true;
    }

    if (formData.password.length < 8) {
      setErrors((prev) => ({ ...prev, password: t("passwordTooShort") }));
      hasErrors = true;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: t("passwordsDoNotMatch"),
      }));
      hasErrors = true;
    }

    if (!formData.agreeToTerms) {
      setErrors((prev) => ({ ...prev, terms: "You must agree to the terms" }));
      hasErrors = true;
    }

    if (hasErrors) return;

    setLoading(true);

    try {
      // Get CSRF token first
      const csrfRes = await fetch('/api/auth/csrf');
      const { csrfToken } = await csrfRes.json();

      // Register using the API route
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.error?.includes("already exists") || result.error?.includes("already registered")) {
          setErrors((prev) => ({ ...prev, email: t("emailAlreadyExists") }));
        } else {
          setErrors((prev) => ({ ...prev, password: result.error || t("registrationFailed") }));
        }
      } else {
        // Registration successful - sign in the user
        const { error: signInError } = await signIn(formData.email, formData.password);
        
        if (!signInError) {
          router.push("/dashboard");
        } else {
          // Registration succeeded but signin failed - still redirect to signin
          router.push("/signin");
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors((prev) => ({ ...prev, password: t("registrationFailed") }));
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthText = () => {
    const texts = ["Enter a password", "Weak", "Fair", "Good", "Strong"];
    return texts[passwordStrength];
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="font-sans text-white min-h-screen flex items-center justify-center pt-20 pb-5 px-5 relative overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full -top-72 -right-48 bg-primary-gradient blur-[100px] opacity-50 animate-float"></div>
        <div
          className="absolute w-96 h-96 rounded-full -bottom-48 -left-24 bg-gradient-to-br from-[#f093fb] to-[#f5576c] blur-[100px] opacity-50 animate-float"
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className="absolute w-72 h-72 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#4facfe] to-[#00f2fe] blur-[100px] opacity-50 animate-float"
          style={{ animationDelay: "10s" }}
        ></div>
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-12 left-12 flex items-center gap-2 text-white/70 text-sm transition-all duration-300 hover:text-white hover:-translate-x-1"
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
        Back to Home
      </Link>

      {/* Register Container */}
      <div className="w-full max-w-lg mx-auto relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold gradient-text mb-3">BusinessHub</h1>
          <p className="text-white/80">All-in-One Business Solutions</p>
        </div>

        {/* Register Card */}
        <div className="glass backdrop-blur-20 rounded-[30px] p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.1)]">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold mb-3">
              {t("createAccount")}
            </h2>
            <p className="text-white/70">
              {t("alreadyHaveAccount")}{" "}
              <Link
                href="/signin"
                className="text-indigo-400 hover:text-purple-400 transition-colors duration-300"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-white/70 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 glass-input rounded-xl text-white placeholder-white/40 transition-all duration-300 outline-none"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-white/70 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 glass-input rounded-xl text-white placeholder-white/40 transition-all duration-300 outline-none"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/70 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleEmailBlur}
                className={`w-full px-5 py-4 glass-input rounded-xl text-white placeholder-white/40 transition-all duration-300 outline-none ${
                  errors.email
                    ? "error"
                    : formData.email && validateEmail(formData.email)
                    ? "success"
                    : ""
                }`}
                placeholder={t("enterEmail")}
                required
              />
              {errors.email && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/70 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-5 py-4 pr-12 glass-input rounded-xl text-white placeholder-white/40 transition-all duration-300 outline-none ${
                    errors.password
                      ? "error"
                      : formData.password
                      ? "success"
                      : ""
                  }`}
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300 p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
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

              {/* Password Strength Indicator */}
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      passwordStrength >= level
                        ? getPasswordStrengthColor()
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs text-white/60 mt-1">
                {getPasswordStrengthText()}
              </div>

              {errors.password && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white/70 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-5 py-4 pr-12 glass-input rounded-xl text-white placeholder-white/40 transition-all duration-300 outline-none ${
                    errors.confirmPassword
                      ? "error"
                      : formData.confirmPassword &&
                        formData.password === formData.confirmPassword
                      ? "success"
                      : ""
                  }`}
                  placeholder={t("confirmYourPassword")}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300 p-1"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showConfirmPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
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
              {errors.confirmPassword && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 mb-8">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="sr-only peer"
                  required
                />
                <label
                  htmlFor="agreeToTerms"
                  className="w-5 h-5 glass-input rounded-md transition-all duration-300 peer-checked:bg-primary-gradient peer-checked:border-transparent cursor-pointer block relative"
                >
                  <svg
                    className={`w-3 h-3 text-white absolute top-0.5 left-0.5 transition-opacity duration-300 ${
                      formData.agreeToTerms ? "opacity-100" : "opacity-0"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
              <label
                htmlFor="agreeToTerms"
                className="text-sm text-white/70 cursor-pointer leading-5"
              >
                {t("agreeToTerms")}{" "}
                <Link href="/terms" className="text-indigo-400 hover:underline">
                  {t("termsOfService")}
                </Link>{" "}
                {t("and")}{" "}
                <Link
                  href="/privacy"
                  className="text-indigo-400 hover:underline"
                >
                  {t("privacyPolicy")}
                </Link>
              </label>
            </div>
            {errors.terms && (
              <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                {errors.terms}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-primary-gradient rounded-full text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mb-8"
            >
              {loading ? (
                <div className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>{t("createAccount")}</span>
              )}
            </button>

            {/* Divider */}
            <div className="relative text-center my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative glass px-5 text-sm text-white/60">
                Or continue with
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => alert("Google registration not implemented yet")}
                className="flex items-center justify-center gap-3 px-5 py-3 glass-input rounded-xl text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  alert("Facebook registration not implemented yet")
                }
                className="flex items-center justify-center gap-3 px-5 py-3 glass-input rounded-xl text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-white/60">
              By signing up, you agree to receive updates and special offers
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
