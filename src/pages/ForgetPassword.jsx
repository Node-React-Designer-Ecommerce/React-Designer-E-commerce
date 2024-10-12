import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

// import methods from "password.js";
import { sendResetPasswordEmail } from '../utils/api/password';


//toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//icons
import ErrorIcon from '../icons/ErrorIcon';


export default function ForgetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await sendResetPasswordEmail(data.email);
            toast.success("Check your email");
            navigate("/login");
        } catch (error) {
            toast.error(error.message || "Invalid email");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto border m-9 rounded-xl p-5 shadow-[0px_0px_19px_16px_#f4eeee]">
            {/* Image Section */}
            <div className="md:order-1 flex justify-center items-center rounded-xl">
                <img
                    src="/forgetpassw.png"
                    alt="Sign Up"
                    className="w-4/5 object-cover rounded-xl"
                />
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="md:order-2 p-5 rounded-xl flex flex-col justify-evenly">
                <div>
                    <h1 className="text-center sm:text-start text-3xl pb-6 text-textColor font-bold">Forget Password</h1>
                </div>

                <div className="">

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-textColor">Email address</label>
                        <div className="relative">
                            <input
                                {...register("email", {
                                    required: true,
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                })}
                                type="email"
                                id="email"
                                className={`mt-1 block w-full px-3 py-2 border-b ${errors.email ? 'border-b-red-500' : 'border-b-gray-300'} rounded-none shadow-sm focus:outline-none focus:ring-0 focus:border-b-indigo-500 sm:text-sm hover:border-b-SecondaryColor`}
                                placeholder="Enter email"
                            />
                            {errors.email && <ErrorIcon />}
                        </div>
                        {errors.email?.type === "required" && <span className="text-red-500 text-sm">Email is required</span>}
                        {errors.email?.type === "pattern" && <span className="text-red-500 text-sm">Invalid email address</span>}
                        {errors.email?.type === "manual" && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>


                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-buttonColor hover:bg-hoverButton hover:transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hoverButton"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading loading-ring loading-md"></span>
                        ) : (
                            "send Email"
                        )}
                    </button>                </div>

            </form>
        </div>
    );
}