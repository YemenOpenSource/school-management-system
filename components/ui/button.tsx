type Props = {
  // type: "button" | "reset" | "submit" | undefined;
  // value: string;
  // event: any;
  size?: "initial" | "xs" | "sm" | "md" | "lg";
  variant?: "initial" | "success" | "warning" | "danger" | "info";
  width?: "fit" | "full";
  href?: string;
};

import Link from "next/link";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function ButtonOld(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    Props
) {
  const sizes = {
    initial: "text-base md:text-base py-2 px-6",
    xs: "text-xs py-2 px-4",
    sm: "text-sm py-2 px-4",
    md: "text-base py-2 px-6",
    lg: "text-lg py-3 px-7",
  };

  const variants = {
    initial:
      "hover:bg-gray-900 bg-gray-800 text-white disabled:bg-gray-500 disabled:cursor-not-allowed",
    success:
      "hover:bg-green-600 bg-green-500 text-white disabled:bg-green-300 disabled:cursor-not-allowed",
    warning:
      "hover:bg-yellow-600 bg-yellow-500 text-white disabled:bg-yellow-300 disabled:cursor-not-allowed",
    danger:
      "hover:bg-red-600 bg-red-500 text-white disabled:bg-red-300 disabled:cursor-not-allowed",
    info: "hover:bg-blue-600 bg-blue-500 text-white disabled:bg-blue-300 disabled:cursor-not-allowed",
  };

  const width = {
    initial: "table",
    fit: "table",
    full: "w-full",
  };

  const currentWidth = width[props?.width || "initial"];

  // it will dynamically set the current variant of the button
  // if the variant prop is undefined it will set "initial" variant
  const currentVariant = variants[props?.variant || "initial"];

  // it will dynamically set the current size of the button
  // if the size prop is undefined it will set "initial" size
  const currentSize = sizes[props?.size || "initial"];

  const currentCustomization = `${
    currentWidth + " " + currentVariant + " " + currentSize
  }`;

  const isLoading = props?.disabled ? (
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
    </span>
  ) : null;

  return (
    <>
      {!props?.href ? (
        <>
          <button
            {...props}
            className={`col-span-full col-start-1 rounded first-letter:capitalize 
        ${currentCustomization}
        duration-150
        flex items-center justify-center
        relative
        `}
            // disabled
          >
            <div className={`invisible`}>{props?.value}</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {isLoading || props?.value}
            </div>
            {/* <Loader className="animate-spin duration-700" /> */}
          </button>
        </>
      ) : (
        <Link
          href={props?.href}
          {...props}
          className={`col-span-full col-start-1 rounded first-letter:capitalize 
        ${currentCustomization}
        duration-150
        flex items-center justify-center
        relative
        `}
          // disabled
        >
          <div className={`invisible`}>{props?.value}</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {isLoading || props?.value}
          </div>
          {/* <Loader className="animate-spin duration-700" /> */}
        </Link>
      )}
    </>
  );
}

/**Notes
 * you'll notice that I added an invisible losy <div>{props?.value}</div>
 * its duty to save the height of the current button only
 * also I added the loading status and the button value in
 * an absoluted div to center the content of the button
 *
 * No need for the status props all that handled by the props?.disabled
 */
