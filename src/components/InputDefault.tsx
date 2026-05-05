import type { InputHTMLAttributes } from "react";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> {
  className?: string[] | string;
}

export function InputDefault({ className, ...rest }: InputProps) {
  const treatedClasses = Array.isArray(className)
    ? className.join(" ")
    : className;

  return <input className={treatedClasses} {...rest} />;
}
