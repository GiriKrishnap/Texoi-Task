import React, { useState } from "react";
import Header from "../layouts/header";
import { useForm } from "react-hook-form";
import { Listbox } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const countryOptions = [
    { code: "+91", flag: "https://flagcdn.com/w40/in.png", country: "India" },
    { code: "+1", flag: "https://flagcdn.com/w40/us.png", country: "USA" },
    { code: "+44", flag: "https://flagcdn.com/w40/gb.png", country: "UK" },
    { code: "+61", flag: "https://flagcdn.com/w40/au.png", country: "Australia" },
];

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
    const [currentStatus, setCurrentStatus] = useState("Student");
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        try {
            const { phoneNumber, password, name, email } = data;
            const mobileNumber = selectedCountry.code + phoneNumber;

            const response = await axios.post(
                `${import.meta.env.VITE_PUBLIC_SERVER_URL}/auth/register`,
                { mobileNumber, password, name, email, currentStatus }
            );

            if (response.status === 201) {
                toast.success("Account created successfully");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);

            } else {
                toast.error("Something went wrong, please try again.");
            }
        } catch (error) {
            console.error("register error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to register.");
        }
    };

    const handleStatusChange = (e) => {
        setCurrentStatus(e.target.value);
    };

    return (
        <>
            <div className="flex flex-col min-h-screen overflow-hidden text-black">
                <Header />
                <div className="text-center">
                    <p className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                        <span className="relative ">
                            register
                            <div className="absolute bottom-0 left-0 right-0 h-2 sm:h-3 bg-yellow-300 -z-10"></div>
                        </span>
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-lg font-medium mb-2">
                                    Full Name
                                </label>
                                <input
                                    type=""
                                    id="name"
                                    className={`w-full border rounded px-4 py-2 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 ${errors.name ? "border-red-500" : ""
                                        }`}
                                    placeholder="Enter name"
                                    {...register("name", {
                                        required: "name is required",
                                        minLength: {
                                            value: 3,
                                            message: "name must be at least 3 characters",
                                        },
                                    })}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`w-full border rounded px-4 py-2 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 ${errors.email ? "border-red-500" : ""
                                        }`}
                                    placeholder="Enter email"
                                    {...register("email", {
                                        required: "email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Mobile Number Field */}
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700 text-lg font-medium mb-2">
                                    Mobile Number
                                </label>
                                <div className="flex">
                                    {/* Custom Country Code Selector */}
                                    <Listbox value={selectedCountry} onChange={setSelectedCountry}>
                                        <div className="relative">
                                            <Listbox.Button className="flex items-center w-24 bg-white border rounded px-3 py-2 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500 ">
                                                <img src={selectedCountry.flag} alt="flag" className="w-5 h-4 mr-2" />
                                                {selectedCountry.code}
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </Listbox.Button>
                                            <Listbox.Options className="absolute mt-1 w-32 bg-white border rounded shadow-lg z-10">
                                                {countryOptions.map((country) => (
                                                    <Listbox.Option
                                                        key={country.code}
                                                        value={country}
                                                        className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                    >
                                                        <img src={country.flag} alt="flag" className="w-5 h-4 mr-2" />
                                                        {country.code}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </div>
                                    </Listbox>

                                    {/* Phone Number Input */}
                                    <div className="flex-grow ml-1">
                                        <input
                                            type="tel"
                                            id="phone"
                                            className={`w-full border rounded px-4 py-2 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 ${errors.phoneNumber ? "border-red-500" : ""
                                                }`}
                                            placeholder="Enter your phone number"
                                            {...register("phoneNumber", {
                                                required: "Phone number is required",
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: "Please enter a valid 10-digit phone number",
                                                },
                                            })}
                                        />
                                        {errors.phoneNumber && (
                                            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Current Status Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-lg font-medium mb-2">
                                    Current Status
                                </label>
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center">
                                        <input
                                            id="Student"
                                            type="radio"
                                            value="Student"
                                            name="status"
                                            checked={currentStatus === "Student"}
                                            onChange={handleStatusChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="Student" className="ml-2 text-gray-700">
                                            Student
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="Employee"
                                            type="radio"
                                            value="Employee"
                                            name="status"
                                            checked={currentStatus === "Employee"}
                                            onChange={handleStatusChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="Employee" className="ml-2 text-gray-700">
                                            Employee
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 text-lg font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className={`w-full border rounded px-4 py-2 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 ${errors.password ? "border-red-500" : ""
                                        }`}
                                    placeholder="Enter Password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full button-style text-white font-medium py-3 rounded transition duration-200"
                            >
                                Register
                            </button>
                        </form>

                        {/* Registration Link */}
                        <div className="text-center mt-4">
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <a href="/login" className="text-blue-500 hover:text-blue-600">
                                    Login Now
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;