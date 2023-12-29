"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, ChangeEventHandler } from "react";
import { checkAuthentication } from "../../../helper/checkAuthentication";
import { v4 as uuid } from "uuid";

interface fieldType {
  email?: string;
  password?: string;
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<fieldType>({});

  const validateForm = (
    type: keyof fieldType,
    fieldName: string,
    value: string
  ) => {
    const errObj: fieldType = { [type]: "" };
    if (!value) {
      errObj[type] = `${fieldName} is required`;
    }
    if (value) {
      if (type == "email" && !/\S+@\S+\.\S+/.test(value)) {
        errObj.email = "Email is invalid.";
      } else if (type == "password" && value.length < 8) {
        errObj.password = "Minimum 8 CharactersPassword is required.";
      }
    }
    setErrors((err) => ({ ...err, ...errObj }));
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value, name },
    } = event;
    let field: keyof fieldType = "email";
    if (name === "email") setEmail(value);
    else if (name === "password") {
      field = "password";
      setPassword(value);
    }
    validateForm(field, name, value);
  };

  // Submit
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!errors.email && !errors.password) {
      localStorage.setItem("token", uuid());
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    if (checkAuthentication()) router.push("/dashboard");
  }, []);

  console.log(errors);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
