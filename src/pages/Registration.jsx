import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

// Icons
import ErrorIcon from '../icons/ErrorIcon';
import Eye from './../icons/Eye';
import EyeSlash from './../icons/EyeSlash';
import { toast } from 'react-toastify';

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
            console.log(error.response?.data?.message);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto border p-5 m-9 rounded-lg">
            {/* Image Section */}
            <div className="md:order-1">
                <img
                    src="/register2.jpg"
                    alt="Sign Up"
                    className="w-full h-full object-contain rounded-lg"
                />
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="md:order-2">
                <div>
                    <h1 className="text-center text-3xl pb-6 text-sky-600 font-bold">Sign up now!</h1>
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <div className="relative">
                        <input
                            {...register("name", { required: true, minLength: 3, maxLength: 100 })}
                            type="text"
                            id="name"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Enter name"
                        />
                        {errors.name && <ErrorIcon />}
                    </div>
                    {errors.name?.type === "required" && <span className="text-red-500">Name is required</span>}
                    {errors.name?.type === "minLength" && <span className="text-red-500">Name must be at least 3 characters</span>}
                    {errors.name?.type === "maxLength" && <span className="text-red-500">Name must be at most 100 characters</span>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <div className="relative">
                        <input
                            {...register("email", {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                            type="email"
                            id="email"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Enter email"
                        />
                        {errors.email && <ErrorIcon />}
                    </div>
                    {errors.email?.type === "required" && <span className="text-red-500">Email is required</span>}
                    {errors.email?.type === "pattern" && <span className="text-red-500">Invalid email address</span>}
                    {errors.email?.type === "manual" && <span className="text-red-500">{errors.email.message}</span>}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
                            className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Password"
                        />
                        {showPassword ? (
                            <EyeSlash onClick={() => setShowPassword(false)} />
                        ) : (
                            <Eye onClick={() => setShowPassword(true)} />
                        )}
                        {errors.password && <ErrorIcon />}
                    </div>
                    {errors.password?.type === "required" && <span className="text-red-500">Password is required</span>}
                    {errors.password?.type === "minLength" && <span className="text-red-500">Password must be at least 8 characters</span>}
                    {errors.password?.type === "maxLength" && <span className="text-red-500">Password must be at most 30 characters</span>}
                    {errors.password?.type === "pattern" && <span className="text-red-500">Password must contain at least one uppercase letter, one lowercase letter, and one number</span>}
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                    <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative">
                        <input
                            {...register("passwordConfirm", {
                                required: true,
                                validate: (value) => value === watch("password"),
                            })}
                            type={showConfirmPassword ? "text" : "password"}
                            id="passwordConfirm"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.passwordConfirm ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Confirm Password"
                        />
                        {showConfirmPassword ? (
                            <EyeSlash onClick={() => setShowConfirmPassword(false)} />
                        ) : (
                            <Eye onClick={() => setShowConfirmPassword(true)} />
                        )}
                        {errors.passwordConfirm && <ErrorIcon />}
                    </div>
                    {errors.passwordConfirm?.type === "required" && <span className="text-red-500">Please confirm your password</span>}
                    {errors.passwordConfirm?.type === "validate" && <span className="text-red-500">Passwords do not match</span>}
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <div className="relative">
                        <input
                            {...register("address", { required: true, minLength: 3, maxLength: 100 })}
                            type="text"
                            id="address"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Enter address"
                        />
                        {errors.address && <ErrorIcon />}
                    </div>
                    {errors.address?.type === "required" && <span className="text-red-500">Address is required</span>}
                    {errors.address?.type === "minLength" && <span className="text-red-500">Address must be at least 3 characters</span>}
                    {errors.address?.type === "maxLength" && <span className="text-red-500">Address must be at most 100 characters</span>}
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-400 hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoading} // Disable the button when loading
                >
                    {isLoading ? (
                        <span className="loading loading-ring loading-md"></span>
                    ) : (
                        "Register"
                    )}
                </button>
                <p className="text-center">Already have account? <a href="/login" className="font-bold text-sky-500">Login Now</a></p>
            </form>
        </div>
    );
}