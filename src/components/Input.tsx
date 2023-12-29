import React, { ChangeEventHandler } from "react";

interface InputProps {
  label?: string;
  name: string;
  value: string;
  id: string;
  type: string;
  error: string | undefined;
  placeholder: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
  id,
  name,
  type,
  error,
  label,
  value,
  placeholder,
  handleChange,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label || name}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
