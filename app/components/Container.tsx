import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
  const containerClass =
    "mx-auto w-full max-w-[1336px] px-5 md:px-8 xl:px-12";

  return (
    <div className={[containerClass, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
