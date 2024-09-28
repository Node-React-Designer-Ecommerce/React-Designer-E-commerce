import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import AuthContext from "../context/AuthContext";

//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//icons
import ErrorIcon from "../icons/ErrorIcon";
import Eye from "./../icons/Eye";
import EyeSlash from "./../icons/EyeSlash";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://react-node-designer.glitch.me/api/v1/users/login",
        data
      );
      toast.success("Logged In Successfully");
      login(res.data.data.token);
      navigate("/");
    } catch (error) {
      if (error.response?.data?.message === "Invalid email or password") {
        setError("email", {
          type: "manual",
          message: "Invalid email or password",
        });
        setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
      } else {
        toast.error("Login failed");
        setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto border m-9 rounded-3xl p-5 shadow-[0px_0px_19px_16px_#f4eeee]">
      {/* Image Section */}
      <div className="md:order-1 flex justify-center items-center rounded-3xl bg-SecondaryColor">
        <img
          src="/formcover.jpg"
          alt="Sign Up"
          className="w-4/5 h-4/5 object-cover rounded-3xl"
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:order-2 p-5 rounded-3xl flex flex-col justify-evenly"
      >
        <div>
          <h1 className="text-center sm:text-start text-3xl pb-6 text-SecondaryColor font-bold">
            Log In
          </h1>
        </div>

        <div className="">
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-SecondaryColor"
            >
              Email address
            </label>
            <div className="relative">
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                type="email"
                id="email"
                className={`mt-1 block w-full px-3 py-2 border-b ${
                  errors.email ? "border-b-red-500" : "border-b-gray-300"
                } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-indigo-500 sm:text-sm hover:border-b-SecondaryColor`}
                placeholder="Enter email"
              />
              {errors.email && <ErrorIcon />}
            </div>
            {errors.email?.type === "required" && (
              <span className="text-red-500">Email is required</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-red-500">Invalid email address</span>
            )}
            {errors.email?.type === "manual" && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-SecondaryColor"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 30,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                })}
                type={showPassword ? "text" : "password"}
                id="password"
                className={`mt-1 block w-full px-3 py-2 border-b ${
                  errors.password ? "border-b-red-500" : "border-b-gray-300"
                } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-indigo-500 sm:text-sm hover:border-b-SecondaryColor`}
                placeholder="Password"
              />
              {showPassword ? (
                <EyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <Eye onClick={() => setShowPassword(true)} />
              )}
              {errors.password && <ErrorIcon />}
            </div>
            {errors.password?.type === "required" && (
              <span className="text-red-500">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">
                Password must be at least 8 characters
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-500">
                Password must be at most 30 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500">
                Password must contain at least one uppercase letter, one
                lowercase letter, and one number
              </span>
            )}
            {errors.password?.type === "manual" && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          {/* is loading button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-bold text-white bg-SecondaryColor hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-SecondaryColor"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-ring loading-md"></span>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center">
            {`Don't have an account?`}{" "}
            <Link to="/sign-up" className="font-bold text-SecondaryColor">
              Signup Now
            </Link>
          </p>
          <p className="text-center">
            {`Forgot your password?`}{" "}
            <Link
              to="/forget-password"
              className="font-bold text-SecondaryColor"
            >
              Forget Password
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
