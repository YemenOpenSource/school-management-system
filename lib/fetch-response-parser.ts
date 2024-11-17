import { IFetchResponse } from "@/definitions";

export function fetchResponse<T>(
  statusCode: number,
  status: TFetchStatus,
  message: string = "",
  data?: IFetchResponse<T>["data"],
): IFetchResponse<T> {
  let initialObject: IFetchResponse<T> = {
    data: [], // default value is array
    isEmpty: false,
    isSuccess: false,
    isError: true,
    message:
      "this message is the default message of the response returned schema",
  };
  initialObject.isSuccess = Boolean(status === "success");
  initialObject.isError = Boolean(status === "error");
  initialObject.message = message ?? initialObject.message;

  checkIfResponseIsError(status, initialObject)
  checkIfResponseIsArray(data, initialObject)
  checkIfResponseIsObject(data, initialObject)

  // check if the message returned as object from the response
  if (typeof message === "object" && message !== null) {
    initialObject.message = responseErrorMessagesObjectToArray(message);
  }

  return initialObject;
}

function responseErrorMessagesObjectToArray(obj: { [key: string]: string[] }) {
  console.log("object to array function from utils.ts", obj);
  let arr = [];
  if (typeof obj === "object" && obj !== null) {
    if (Object.keys(obj).length !== 0) {
      let objToArr = Object.entries(obj);
      console.log(objToArr);
      for (const [key, value] of objToArr) {
        arr.push(...value);
      }
    }
  }
  console.log(arr);
  return arr;
}

/** 
 * check if the response is array
 * @param responseData 
 * @param returnedObject 
 * @returns returedObject - response schema return the data, isSuccess, isEmpty, isError
 * NOTE: isError is true by default and it change depends on the returned status
 */
function checkIfResponseIsArray<T>(responseData: T | T[], returnedObject: IFetchResponse<T | T[]>) {
  const isArray = Array.isArray(responseData)

  // break the process for better performance
  if (!isArray) return 'it is not array'

  if (isArray) {
    if (responseData.length === 0) {
      returnedObject.data = []
      returnedObject.isEmpty = true
    } else {
      returnedObject.data = responseData
      returnedObject.isEmpty = false
    }
  }
  console.log('checkIfArray', returnedObject)
  return returnedObject
}


/**
 * check if the response is object
 * @param responseData 
 * @param returnedObject 
 * @returns returedObject - response schema return the data, isSuccess, isEmpty, isError
 * NOTE: isError is true by default and it change depends on the returned status
 */
function checkIfResponseIsObject<T>(responseData: T | T[] | {}, returnedObject: IFetchResponse<T | T[] | {}>) {
  const isObject = typeof responseData === 'object' && responseData !== null

  console.log('lakjdsflkjlkjskldajlk')
  // break the process for better performance
  if (!isObject) return 'it is not object'

  if (isObject) {
    // check if object emtpy by converting it to array
    const isObjectEmpty = Boolean(Object.keys(responseData).length === 0)
    if (isObjectEmpty) {
      returnedObject.data = {};
      returnedObject.isEmpty = true;
    } else {
      returnedObject.data = responseData;
      returnedObject.isEmpty = false;
    }
  }

  return returnedObject
}

type TFetchStatus = "success" | "error"
function checkIfResponseIsError<T>(responseStatus: TFetchStatus, returnedObject: IFetchResponse<T | T[] | {}>) {
  const isStatusError = responseStatus === 'error'
  if (!isStatusError) return "there is no error"

  if (isStatusError) {
    returnedObject.isSuccess = false
    returnedObject.isError = true
  } else {
    returnedObject.isSuccess = true
    returnedObject.isError = false
  }
}
