import { useForm } from "react-hook-form";
import axios from "axios";
import ErrorIcon from './../components/ErrorIcon';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation

export default function App() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {

        // Check if there are any validation errors from react-hook-form
        if (Object.keys(errors).length === 0) {
            axios.get("https://nice-brainy-ptarmigan.glitch.me/api/v1/users/")
                .then(res => {
                    const userExists = res.data.some(user => user.email === data.email);
                    if (userExists) {
                        setError("email", {
                            type: "manual",
                            message: "Email already exists",
                        });
                    } else {
                        axios.post("https://nice-brainy-ptarmigan.glitch.me/api/v1/users/signup", data)
                            .then(res => {
                                console.log(res);
                                alert("Registration Successful");
                                navigate('/login');
                            })
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
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
                            {...register("name", { required: true })}
                            type="text"
                            id="name"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Enter name"
                        />
                        {errors.name && <ErrorIcon />}
                    </div>
                    {errors.name && <span className="text-red-500">Name is required</span>}
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
                            {...register("password", { required: true, minLength: 8 })}
                            type="password"
                            id="password"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Password"
                        />
                        {errors.password && <ErrorIcon />}
                    </div>
                    {errors.password?.type === "required" && <span className="text-red-500">Password is required</span>}
                    {errors.password?.type === "minLength" && <span className="text-red-500">Password must be at least 8 characters</span>}
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
                            type="password"
                            id="passwordConfirm"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.passwordConfirm ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Confirm Password"
                        />
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
                            {...register("address", { required: true })}
                            type="text"
                            id="address"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Enter address"
                        />
                        {errors.address && <ErrorIcon />}
                    </div>
                    {errors.address && <span className="text-red-500">Address is required</span>}
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-400 hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Register
                </button>
                <p className="text-center">Already have account? <a href="/login" className="font-bold text-sky-500">Login Now</a></p>
            </form>
        </div>
    );
}