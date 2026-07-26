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

  const inputClass = (fieldError) =>
    `neu-inset w-full h-12 rounded-2xl px-4 text-sm text-white placeholder:text-[#6C6C6B] outline-none transition ${
      fieldError ? "shadow-[0_0_0_1.5px_#ef4444]" : ""
    }`;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-5"
      style={{ background: "var(--bg)" }}
    >
      <div className="neu w-full max-w-[430px] rounded-2xl px-7 py-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="neu-sm w-9 h-9 rounded-2xl flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#FF8FC7] fill-[#FF8FC7]" />
          </div>

          <h1 className="text-3xl font-bold">
            {/* <span className="text-white">Sky</span> */}
            <span className="text-[#FF8FC7]">PrimeBasket</span>
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
              className={inputClass(errors.fullName)}
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
              className={inputClass(errors.email)}
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
              className={inputClass(errors.password)}
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
                  strength >= 1 ? "bg-[#FF8FC7]" : "bg-gray-700"
                }`}
              />

              <div
                className={`h-1.5 flex-1 rounded-full ${
                  strength >= 3 ? "bg-[#FF8FC7]" : "bg-gray-700"
                }`}
              />

              <div
                className={`h-1.5 flex-1 rounded-full ${
                  strength === 4 ? "bg-[#FF8FC7]" : "bg-gray-700"
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
              className={inputClass(errors.confirmPassword)}
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
            className="neu-accent neu-btn mt-2 h-12 w-full rounded-2xl text-lg font-semibold text-black"
          >
            Create Account →
          </button>
        </form>

        {/* Footer */}
        <p className="mt-5 text-center text-sm text-[#6C6C6B]">
          Already have an account?
          <span
            onClick={() => navigate("/")}
            className="ml-1 cursor-pointer font-semibold text-[#FF8FC7]"
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
