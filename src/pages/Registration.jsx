import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // Assuming you are using React Router for navigation
import axios from "axios";

// Icons
import Eye from "./../icons/Eye";
import EyeSlash from "./../icons/EyeSlash";

//toast
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true); // Set isLoading to true before making the request
    try {
      await axios.post(
        "https://react-node-designer.glitch.me/api/v1/users/signup",
        data
      );
      toast.success("Registration successful! Please Log In", {
        autoClose: 5000,
      });
      navigate("/login");
    } catch (error) {
      // console.log(error.response?.data?.message);
      if (error.response?.data?.message === "Email already exists") {
        setError("email", {
          type: "manual",
          message: "Email already exists",
        });
      } else {
        setError("email", {
          type: "manual",
          message: "Email already exists",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  max-w-4xl mx-auto border m-9 rounded-3xl p-5 shadow-[0px_0px_19px_16px_#f4eeee]">
      {/* Image Section */}
      <div className="md:order-1 flex justify-center items-center  rounded-3xl">
        <img
          src="/register.jpg"
          alt="Sign Up"
          className="h-4/5 object-cover rounded-3xl"
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:order-2 p-5 rounded-3xl"
      >
        <div>
          <h1 className="text-center text-3xl pb-6 text-textColor font-bold">
            Create Account
          </h1>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-textColor"
          >
            Name
          </label>
          <div className="relative">
            <input
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 100,
              })}
              type="text"
              id="name"
              className={`mt-1 block w-full px-3 py-2 border-b ${
                errors.name ? "border-b-red-500" : "border-b-gray-300"
              } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-indigo-500 sm:text-sm hover:border-b-textColor`}
              placeholder="Enter name"
            />
          </div>
          {errors.name?.type === "required" && (
            <span className="text-red-500">Name is required</span>
          )}
          {errors.name?.type === "minLength" && (
            <span className="text-red-500">
              Name must be at least 3 characters
            </span>
          )}
          {errors.name?.type === "maxLength" && (
            <span className="text-red-500">
              Name must be at most 100 characters
            </span>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-textColor"
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
              } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-indigo-500 sm:text-sm hover:border-b-textColor`}
              placeholder="Enter email"
            />
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
            className="block text-sm font-medium text-textColor"
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
              } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-indigo-500 sm:text-sm hover:border-b-textColor`}
              placeholder="Password"
            />
            {showPassword ? (
              <EyeSlash onClick={() => setShowPassword(false)} />
            ) : (
              <Eye onClick={() => setShowPassword(true)} />
            )}
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
              Password must contain at least one uppercase letter, one lowercase
              letter, and one number
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label
            htmlFor="passwordConfirm"
            className="block text-sm font-medium text-textColor"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register("passwordConfirm", {
                required: true,
                validate: (value) => value === watch("password"),
              })}
              type={showConfirmPassword ? "text" : "password"}
              id="passwordConfirm"
              className={`mt-1 block w-full px-3 py-2 border-b ${
                errors.passwordConfirm
                  ? "border-b-red-500"
                  : "border-b-gray-300"
              } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-indigo-500 sm:text-sm hover:border-b-textColor`}
              placeholder="Confirm Password"
            />
            {showConfirmPassword ? (
              <EyeSlash onClick={() => setShowConfirmPassword(false)} />
            ) : (
              <Eye onClick={() => setShowConfirmPassword(true)} />
            )}
          </div>
          {errors.passwordConfirm?.type === "required" && (
            <span className="text-red-500">Please confirm your password</span>
          )}
          {errors.passwordConfirm?.type === "validate" && (
            <span className="text-red-500">Passwords do not match</span>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-textColor"
          >
            Address
          </label>
          <div className="relative">
            <input
              {...register("address", {
                required: true,
                minLength: 3,
                maxLength: 100,
              })}
              type="text"
              id="address"
              className={`mt-1 block w-full px-3 py-2 border-b ${
                errors.address ? "border-b-red-500" : "border-b-gray-300"
              } rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-indigo-500 sm:text-sm hover:border-b-textColor`}
              placeholder="Enter address"
            />
          </div>
          {errors.address?.type === "required" && (
            <span className="text-red-500">Address is required</span>
          )}
          {errors.address?.type === "minLength" && (
            <span className="text-red-500">
              Address must be at least 3 characters
            </span>
          )}
          {errors.address?.type === "maxLength" && (
            <span className="text-red-500">
              Address must be at most 100 characters
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-3 flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-bold text-white bg-buttonColor hover:bg-hoverButton hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hoverButton"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-ring loading-md"></span>
          ) : (
            "Register"
          )}
        </button>
        <p className="text-center mt-3">
          Already have account?{" "}
          <Link to="/login" className="font-bold text-textColor">
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
}