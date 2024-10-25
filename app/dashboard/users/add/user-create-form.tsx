"use client";

import { ChangeEvent, useRef, useState, useTransition } from "react";
import { createUser } from "@/lib/actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFetchResponse, YupUserCreateInputs } from "@/definitions";
import { yupUserCreateSchema } from "@/lib/validation-schema-yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/ui/button";
import FileInput from "@/components/ui/file-input";
import Message from "@/components/ui/message";
import Input from "@/components/ui/input";
import FetchMessage from "@/components/ui/fetch-message";

interface CreateInputs {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: FileList;
}

type Props = {};
export default function UserCreateForm({ }: Props) {
  const [isCreatingUser, startCreatingUser] = useTransition();
  const apiResponseMessagesRef = useRef<IFetchResponse<[]>>({
    isSuccess: false,
    isError: false,
    message: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [nativeImage, setNativeImage] = useState<File>();
  const [singleImage, setSingleImage] = useState<File | undefined>();
  console.log(profileImage)

  const imagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSingleImage(file);
    setNativeImage(file);
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<YupUserCreateInputs>({
    resolver: yupResolver(yupUserCreateSchema),
    mode: "onChange",
  });


  const onSubmit: SubmitHandler<YupUserCreateInputs> = async (data) => {
    const { userName, fullName, email, password, confirmPassword, image } =
      data;
    console.log('image data', data)
    console.log('image data', data?.image)

    const FD = new FormData();
    FD.append("userName", userName);
    FD.append("fullName", fullName);
    FD.append("email", email);
    FD.append("password", password);
    FD.append("confirmPassword", confirmPassword);
    // FD.append("image", watch()?.image?.[0]);
    // FD.append("image", profileImage);

    function isFileList(value: unknown): value is FileList {
      return value instanceof FileList;
    }
    if (isFileList(data.image) && data.image[0]) {
      FD.append("image", data.image[0]);
    }

    startCreatingUser(async () => {
      const res = (await createUser(
        FD,
      )) as IFetchResponse<undefined>;
      if (res) {
        const { isSuccess, isError, message } = res
        apiResponseMessagesRef.current = {
          isSuccess,
          isError,
          message,
        };
      }
    });
  };

  return (
    <div className="w-full md:max-w-[700px] md:w-auto mx-auto rounded border border-gray-300 p-4">
      <div className="size-20 border border-gray-300 rounded mx-auto mb-8 overflow-hidden">
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            profileImage ||
            "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
          }
          alt="user image"
          className="size-full object-cover aspect-square"
        />
      </div>
      <form
        // onSubmit={create}
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
        <div className="col-span-full md:col-span-full">
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
        <div className="col-span-full md:col-span-2">
          <Input
            type="text"
            placeholder="Your Password"
            variant={
              errors.password?.message
                ? "danger"
                : isValid
                  ? "success"
                  : "initial"
            }
            {...register("password")}
          />
          <Message variant="danger">{errors.password?.message}</Message>
        </div>
        <div className="col-span-full md:col-span-2">
          <Input
            type="text"
            placeholder="Confirm your password"
            variant={
              errors.confirmPassword?.message
                ? "danger"
                : isValid
                  ? "success"
                  : "initial"
            }
            {...register("confirmPassword")}
          />
          <Message variant="danger">{errors.confirmPassword?.message}</Message>
        </div>
        <div className="col-span-full">
          {/* <input type="file"
            placeholder="Your image"
            {...register("image")}
            {...register("image")}
            onChange={imagePreview}
          /> */}
          <FileInput
            type="file"
            // name="imagePath"
            placeholder="Your image"
            {...register("image")}
            onChange={imagePreview}
          // accept="image/*"
          />
        </div>
        <div className="col-span-full">
          <Button
            variant="info"
            type="submit"
            width="full"
            loading={isCreatingUser}
            disabled={isCreatingUser || !isValid}
            loadingText="Creating..."
            title={
              isValid
                ? "click the button to create the user"
                : "fill the required blanks to create a user"
            }
          >
            Create
          </Button>
        </div>
        <div className="col-span-full">
          <FetchMessage
            message={apiResponseMessagesRef.current.message}
            isSuccess={apiResponseMessagesRef.current.isSuccess}
            isError={apiResponseMessagesRef.current.isError}
          />
        </div>
      </form>
    </div>
  );
}
