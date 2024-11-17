// import { deleteCookie, hasCookie } from "cookies-next";

import { FormDataObjectType, IFetchResponse } from "@/definitions";

export const appendToFormData = (data: FormDataObjectType<any>): FormData => {
  const FD = new FormData();
  const objectToArray = Object.entries(data);
  for (const [key, value] of objectToArray) {
    if (key === "image") {
      FD.append(key, value[0]);
    } else {
      FD.append(key, value);
    }
  }
  return FD;
};
