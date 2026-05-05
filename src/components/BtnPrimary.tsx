import React from "react";

interface PropsBtnPrimary extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function BtnPrimary({
  text,
  className = "",
  ...props
}: PropsBtnPrimary) {
  return (
    <button
      type="button"
      className={`rounded-lg py-2 px-3 ${className}`}
      {...props}
    >
      <p className=" font-poppins">{text}</p>
    </button>
  );
}

export default BtnPrimary;
