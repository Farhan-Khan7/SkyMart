import React, { useState } from "react";
import { Zap, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      toast.error("User not found. Please register first.");
      return;
    }

    if (
      storedUser.email === data.email &&
      storedUser.password === data.password
    ) {
      toast.success("Login Successful");
      reset();
      navigate("/home");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>
      {/* LEFT SECTION */}
      <div
        className="
        hidden lg:flex
        lg:w-1/2
        flex-col
        px-8 xl:px-14
        py-10
        relative
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="neu w-12 h-12 rounded-2xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-[#FF8FC7] fill-[#FF8FC7]" />
          </div>

          <h1 className="text-3xl font-bold">
            {/* <span className="text-white">Sky</span> */}
            <span className="text-[#FF8FC7]">PrimeBasket</span>
          </h1>
        </div>

        {/* Content */}

        <div className="mt-20 xl:mt-28">
          <p className="text-[#FF8FC7] font-semibold tracking-widest text-sm">
            WELCOME BACK
          </p>

          <h2
            className="
            mt-6
            text-4xl
            xl:text-6xl
            font-bold
            leading-tight
            text-white
            "
          >
            Shop the future.
            <br />
            <span className="text-[#FF8FC7]">Today.</span>
          </h2>

          <p
            className="
            mt-6
            text-base
            xl:text-lg
            text-[#6C6C6B]
            max-w-md
            leading-relaxed
            "
          >
            Thousands of products, lightning-fast delivery, and prices that make
            your wallet happy.
          </p>

          {/* Stats */}

          <div
            className="
            grid
            grid-cols-3
            gap-3
            mt-12
            max-w-xl
            "
          >
            {[
              ["20K+", "Products"],
              ["50K+", "Users"],
              ["4.9★", "Rating"],
            ].map((item, index) => (
              <div
                key={index}
                className="neu h-24 rounded-2xl flex flex-col items-center justify-center"
              >
                <h3 className="text-[#FF8FC7] text-xl xl:text-2xl font-bold">
                  {item[0]}
                </h3>

                <p className="text-[#6C6C6B] text-xs xl:text-sm">{item[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}

      <div
        className="
        w-full
        lg:w-1/2
        flex
        items-center
        justify-center
        px-5
        py-10
        "
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="neu rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Sign in
            </h2>

            <p className="mt-2 text-sm sm:text-base text-[#6C6C6B]">
              Enter your credentials to continue
            </p>

            {/* EMAIL */}

            <div className="mt-8 relative">
              <Mail className="absolute left-5 top-4 text-[#666] z-10" size={20} />

              <input
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter valid email address",
                  },
                })}
                className="
                neu-inset
                w-full
                h-14
                rounded-2xl
                pl-14
                pr-5
                text-white
                placeholder:text-[#666]
                outline-none
                "
              />

              {errors.email && (
                <p className="mt-1 ml-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}

            <div className="mt-5 relative">
              <Lock className="absolute left-5 top-4 text-[#666] z-10" size={20} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                    message:
                      "Use 8+ chars with uppercase, lowercase, number & special character",
                  },
                })}
                className="
                neu-inset
                w-full
                h-14
                rounded-2xl
                pl-14
                pr-12
                text-white
                placeholder:text-[#666]
                outline-none
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                absolute
                right-5
                top-4
                text-[#666]
                z-10
                "
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

              {errors.password && (
                <p className="mt-1 ml-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="
              neu-accent
              neu-btn
              mt-8
              w-full
              h-14
              rounded-2xl
              text-black
              font-bold
              text-lg
              "
            >
              Sign in →
            </button>

            {/* REGISTER */}

            <p className="mt-8 text-center text-sm sm:text-base text-[#666]">
              Don't have an account?
              <span
                onClick={() => navigate("/register")}
                className="
                ml-2
                text-[#FF8FC7]
                font-semibold
                cursor-pointer
                "
              >
                Create one
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
