import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  children: ReactNode;
}

export function Authcard({ title, children }: AuthCardProps) {
  return (
    <div className="bg-lilas z-10 -mt-10 mx-auto rounded-4xl w-80 shadow-purple-md flex gap-8 flex-col px-12 py-16 h-auto md:w-[90%] xl:mt-0 xl:w-full xl:max-w-2xl xl:h-auto xl:p-12">
      <h2 className="text-3xl font-bold font-poppins text-darker-purple mb-8 md:text-5xl">
        {title}
      </h2>
      <div className="flex flex-col gap-8">{children}</div>
    </div>
  );
}
