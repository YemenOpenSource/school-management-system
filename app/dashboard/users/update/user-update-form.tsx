"use client";
import React, { ChangeEvent, useState, useTransition } from "react";
import Input from "@/components/ui/input";
import {
  IClientResponse,
  IRole,
  IUser,
  YupUserUpdateInputs,
} from "@/definitions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser } from "@/lib/actions";
import Button from "@/components/ui/button";
import { yupUserUpdateSchema } from "@/lib/validation-schema-yup";
import Message from "@/components/ui/message";
import FetchMessage from "@/components/ui/fetch-message";
import useFetchResponse from "@/hooks/use-fetch-response";
import { useRolessOptions } from "@/hooks/use-roles-options";
import FileInput from "@/components/ui/file-input";

type Props = {
  user: IClientResponse<IUser>;
  roles: IClientResponse<IRole[]>;
};

export default function UserUpdateForm(props: Props) {
  const [isUpdating, startUpdatingUser] = useTransition();
  const { responseRef, updateResponse } = useFetchResponse();
  const [profileImage, setProfileImage] = useState("");

  const imagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const {
    id: userId,
    fullName,
    userName,
    email,
    roles,
    imagePath
  } = props?.user.data || {};
  const findRoleId = roles?.[0]

  const { options, selectNotAllowed, message } = useRolessOptions(props?.roles);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<YupUserUpdateInputs>({
    resolver: yupResolver(yupUserUpdateSchema),
    mode: "onChange",
    defaultValues: {
      roleId: Number(findRoleId),
      userName: userName,
      fullName: fullName,
      email: email,
      image: imagePath ?? ""
    },
  });

  console.log(watch())

  const isUpdatingValid = isValid && !selectNotAllowed;
  const isButtonValid = isUpdating || !isUpdatingValid;
  console.log(selectNotAllowed)
  console.log(isUpdatingValid)
  console.log(isButtonValid)

  const onSubmit: SubmitHandler<YupUserUpdateInputs> = async (data) => {
    const FD = new FormData()
    FD.append('id', String(userId))
    FD.append('userName', data?.userName)
    FD.append('fullName', data?.fullName)
    FD.append('email', data?.email)
    FD.append('roleId', String(data?.roleId))

    function isFileList(value: unknown): value is FileList {
      return value instanceof FileList
    }
    if (isFileList(data?.image) && data?.image[0]) {
      FD.append('image', data?.image?.[0])
    }

    startUpdatingUser(async () => {

      if (isUpdatingValid) {
        const res = await updateUser(FD);
        if (res) {
          updateResponse(res);
        }
      }
    });
  };

  return (
    <div className="w-full md:max-w-[700px] md:w-auto mx-auto rounded border border-gray-300 p-4">
      <div className="size-20 border border-gray-300 rounded mx-auto mb-8 overflow-hidden">
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            profileImage || imagePath ||
            "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
          }
          alt="user image"
          className="size-full object-cover aspect-square"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-2"
      >
        <div className="col-span-full md:col-span-2">
          <Input
            type="text"
            placeholder="Your full name"
            variant={
              errors.fullName?.message
                ? "danger"
                : isValid
                  ? "success"
                  : "initial"
            }
            {...register("fullName")}
          />
          <Message variant="danger">{errors.fullName?.message}</Message>
        </div>
        <div className="col-span-full md:col-span-2">
          <Input
            type="text"
            placeholder="Your user name"
            variant={
              errors.userName?.message
                ? "danger"
                : isValid
                  ? "success"
                  : "initial"
            }
            {...register("userName")}
          />
          <Message variant="danger">{errors.userName?.message}</Message>
        </div>
        <div className="col-span-full md:col-span-3">
          <Input
            type="text"
            placeholder="Your email"
            variant={
              errors.email?.message ? "danger" : isValid ? "success" : "initial"
            }
            {...register("email")}
          />
          <Message variant="danger">{errors.email?.message}</Message>
        </div>
        <select
          {...register("roleId")}
          className="disabled:opacity-50 disabled:cursor-not-allowed w-full h-fit border border-gray-500 rounded text-black text-sm px-4 py-2 cursor-pointer col-span-1"
          disabled={selectNotAllowed}
          title={
            selectNotAllowed
              ? message + " please contact the support"
              : "select the role"
          }
        >
          <option selected={!findRoleId} disabled>
            select role
          </option>
          {options}
        </select>
        <div className="col-span-full">
          <FileInput
            type="file"
            placeholder="Your image"
            {...register("image")}
            onChange={imagePreview}
          />
        </div>
        <div className="col-span-full">
          <Button
            variant="info"
            type="submit"
            width="full"
            loading={isUpdating}
            disabled={isButtonValid}
            loadingText="Updating..."
          >
            Update
          </Button>
        </div>
        <FetchMessage
          message={responseRef.current.message}
          isSuccess={responseRef.current.isSuccess}
          isError={responseRef.current.isError}
        />
      </form>
    </div>
  );
}
