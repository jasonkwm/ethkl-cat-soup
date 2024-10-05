import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg flex flex-col items-center justify-center">
    	{children}
    </div>
  );
};

export default Container;
