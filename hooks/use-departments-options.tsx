import { IClientResponse, IDepartment } from "@/definitions";
import { useMemo } from "react";

export function useDepartmentsOptions(departments: IClientResponse<IDepartment[]>) {
  const {
    data,
    isSuccess,
    isEmpty,
    isError,
    message,
  } = departments;
  console.log(departments)


  let options = useMemo(() => {
    if (isSuccess) {
      return data?.map((dep) => (
        <option id={dep?.id?.toString()} value={dep.id} key={dep.id}>
          {dep.name}
        </option>))
    }

    if (isEmpty) {
      return (
        <option disabled value={''} className="cursor-not-allowed">
          no departments😑
        </option>
      )
    }

    if (isError) {
      return (
        <option disabled value={''} className="cursor-not-allowed">
          request error😑
        </option>
      )
    }
  }, [data, isSuccess, isEmpty, isError])

  const selectNotAllowed = isEmpty || isError

  return {
    options,
    selectNotAllowed,
    message
  }
}