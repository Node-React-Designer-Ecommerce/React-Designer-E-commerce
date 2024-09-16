import { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation
import axios from "axios";
import AuthContext from '../context/AuthContext';

//toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Icons
import ErrorIcon from '../icons/ErrorIcon';
import Eye from './../icons/Eye';
import EyeSlash from './../icons/EyeSlash';

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // States
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true); // Set isLoading to true before making the request
        try {
            const res = await axios.post(
                "https://react-node-designer.glitch.me/api/v1/users/login",
                data
            );
            toast.success("Logged In Successfully");
            console.log(res.data);
            console.log(res.data.data.token);
            console.log(res.data.data.role);
            login({ role: res.data.data.role }, res.data.data.token); // Set the user data and token in the context
            navigate("/products");
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
                    {errors.password?.type === "manual" && <span className="text-red-500">{errors.password.message}</span>}
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-400 hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="loading loading-ring loading-md"></span>
                    ) : (
                        "Login"
                    )}
                </button>
                <p className="text-center">{`Don't have an account?`} <a href="/sign-up" className="font-bold text-sky-500">Signup Now</a></p>
            </form>
        </div>
    );
}