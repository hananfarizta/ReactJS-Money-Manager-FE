import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({ id, label, value, onChange, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const actualType = isPassword ? (showPassword ? "text" : "password") : type;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label
        id={`${id}-label`}
        className="text-[13px] text-slate-800 block mb-1"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={`${id}-field`}
          className={
            `w-full bg-transparent outline-none border border-grey-300 rounded-md py-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ` +
            (isPassword ? "px-3 pr-10" : "px-3")
          }
          type={actualType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
        />

        {isPassword && (
          <button
            id="showPassword"
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-0 bg-transparent"
          >
            {showPassword ? (
              <Eye size={20} className="text-purple-800" />
            ) : (
              <EyeOff size={20} className="text-slate-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
