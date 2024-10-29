import { Loader } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div>
      <div className="z-10 bg-transparent backdrop-blur-sm h-full overflow-x-visible w-full absolute top-0 left-0 flex items-center justify-center">
        <Loader className="animate-spin text-blue-500 stroke-[1.5]" size={50} />
      </div>
    </div>
  );
}
