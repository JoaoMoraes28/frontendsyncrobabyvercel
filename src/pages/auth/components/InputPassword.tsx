import { useState } from "react";
import { InputDefault } from "../../../components/InputDefault";
import revealPassword from "../../../assets/revealPassword.svg";
import type { InputHTMLAttributes } from "react";

interface InputPasswordProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> {
  className?: string[] | string;
}

export function InputPassword({
  placeholder = "senha",
  className,
  ...rest
}: InputPasswordProps) {
  const treatedClasses = Array.isArray(className)
    ? className.join(" ")
    : className;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="gap-2 flex flex-col relative">
      <InputDefault
        placeholder={placeholder}
        type={isPasswordVisible ? "text" : "password"}
        className={treatedClasses}
        {...rest}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="flex absolute justify-center right-4 top-4 transition-colors md:top-8"
      >
        <img
          src={revealPassword}
          alt="Mostrar/Esconder senha"
          className="w-5"
        />
      </button>
    </div>
  );
}
