import React from "react";
import { Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const strength =
    (password.length >= 8 ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[@$!%*?&]/.test(password) ? 1 : 0);

  const onSubmit = (data) => {
    const userData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    console.log(userData);
    toast.success("Registration Successful");
    reset();
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4 py-5">
      <div className="w-full max-w-[430px] rounded-[28px] border border-[#2A2A2A] bg-[#121212] px-7 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-lg bg-[#C8F400] flex items-center justify-center">
            <Zap className="w-4 h-4 text-black fill-black" />
          </div>

          <h1 className="text-3xl font-bold">
            <span className="text-white">Sky</span>
            <span className="text-[#C8F400]">Mart</span>
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white">Create account</h2>

        <p className="mt-1 mb-5 text-sm text-[#6C6C6B]">
          Join SkyMart and start shopping
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <input
              {...register("fullName", {
                required: "Full Name is required",
                minLength: {
                  value: 5,
                  message: "Minimum 5 characters required",
                },
              })}
              placeholder="Full name"
              className={`w-full h-12 rounded-xl bg-[#1F1F1F] px-4 text-sm text-white placeholder:text-[#6C6C6B] outline-none transition
              ${
                errors.fullName
                  ? "border border-red-500"
                  : "border border-[#303030] focus:border-[#C8F400]"
              }`}
            />

            {errors.fullName && (
              <p className="mt-1 ml-1 text-xs text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter valid email address",
                },
              })}
              placeholder="Email address"
              className={`w-full h-12 rounded-xl bg-[#1F1F1F] px-4 text-sm text-white placeholder:text-[#6C6C6B] outline-none transition
              ${
                errors.email
                  ? "border border-red-500"
                  : "border border-[#303030] focus:border-[#C8F400]"
              }`}
            />

            {errors.email && (
              <p className="mt-1 ml-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                  message:
                    "Use 8+ chars with uppercase, lowercase, number & special character",
                },
              })}
              placeholder="Password"
              className={`w-full h-12 rounded-xl bg-[#1F1F1F] px-4 text-sm text-white placeholder:text-[#6C6C6B] outline-none transition
              ${
                errors.password
                  ? "border border-red-500"
                  : "border border-[#303030] focus:border-[#C8F400]"
              }`}
            />

            {errors.password && (
              <p className="mt-1 ml-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Password Strength */}
          <div className="mt-2">
            <div className="flex gap-2">
              <div
                className={`h-1.5 flex-1 rounded-full ${
                  strength >= 1 ? "bg-[#C8F400]" : "bg-gray-700"
                }`}
              />

              <div
                className={`h-1.5 flex-1 rounded-full ${
                  strength >= 3 ? "bg-[#C8F400]" : "bg-gray-700"
                }`}
              />

              <div
                className={`h-1.5 flex-1 rounded-full ${
                  strength === 4 ? "bg-[#C8F400]" : "bg-gray-700"
                }`}
              />
            </div>

            {password && (
              <p className="mt-1 text-xs text-gray-400">
                {strength <= 1
                  ? "Weak Password"
                  : strength <= 3
                    ? "Medium Password"
                    : "Strong Password"}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required",

                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Confirm password"
              className={`w-full h-12 rounded-xl bg-[#1F1F1F] px-4 text-sm text-white placeholder:text-[#6C6C6B] outline-none transition
    ${
      errors.confirmPassword
        ? "border border-red-500"
        : "border border-[#303030] focus:border-[#C8F400]"
    }`}
            />

            {errors.confirmPassword && (
              <p className="mt-1 ml-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-2 h-12 w-full rounded-xl bg-[#C8F400] text-lg font-semibold text-black hover:brightness-95"
          >
            Create Account →
          </button>
        </form>

        {/* Footer */}
        <p className="mt-5 text-center text-sm text-[#6C6C6B]">
          Already have an account?
          <span
            onClick={() => navigate("/")}
            className="ml-1 cursor-pointer font-semibold text-[#C8F400]"
          >
            Sign in
          </span>
        </p>
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default Register;
