import type { ReactNode } from "react";

interface AuthLayoutProps {
  leftContent?: ReactNode;
  headerContent?: ReactNode;
  children: ReactNode;
}

export function AuthLayout({
  leftContent,
  headerContent,
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative flex flex-col items-center h-screen w-screen xl:flex-row xl:items-stretch xl:justify-start bg-background-default">
      {leftContent && <>{leftContent}</>}

      {headerContent && <div className="w-full xl:hidden">{headerContent}</div>}

      <div
        className="md:w-full
        xl:flex xl:justify-end"
      >
        <div className="w-full h-full justify-center items-center xl:justify-end xl:flex xl:max-w-[calc(100%-520px)] xl:w-2/3">
          {children}
        </div>
      </div>
    </main>
  );
}
