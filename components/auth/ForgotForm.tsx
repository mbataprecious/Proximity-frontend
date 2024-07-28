"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../formControls/Input";
import Button from "../Button";
import { yupResolver } from "@/utils/helpers";
import SvgIconStyle from "../SvgIconStyle";
import { object, string } from "yup";
import useAuthRequest from "@/hooks/useAuthRequest";
import { useRouter } from "next-nprogress-bar";
import toast from "react-hot-toast";
import { XiorError } from "xior";

const forgotSchema = object().shape({
  email: string().label("Email address").email().required("Email is required"),
});
const ForgotForm = () => {
  const router = useRouter();
  const { request } = useAuthRequest();
  const defaultValues = {
    email: "",
  };
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver ? yupResolver(forgotSchema) : undefined,
    defaultValues,
  });

  const {
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data: typeof defaultValues) => {
    try {
      const response = await request.post("/auth/reset", {
        email: data.email,
      });
      if (response) {
        router.push("/check-mail?reset=true");
        toast.success("reset sent!");
      }
      console.log({ data });
    } catch (error) {
      if (error instanceof XiorError) {
        toast.error(error?.response?.data.message as string);
      } else {
        toast.error((error as { message: string })?.message);
      }
      console.error(error);
    } finally {
    }
  };

  return (
    <div className=" mx-auto px-6 md:max-w-[436px] md:w-[400px]">
      <div className="text-[#242B33] mb-12 w-full">
        <h3 className="font-bold text-2xl md:text-[1.75rem]">
          Forgot Password
        </h3>
        <p className=" text-xs mt-2">
          Kindly enter the Email Address tied to your account.
        </p>
      </div>
      <div>
        <FormProvider {...methods}>
          <form
            method="post"
            className=" grid grid-cols-1 gap-y-3"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="w-full">
              <Input
                type="email"
                icon={
                  <SvgIconStyle
                    src="/Assets/svg/Mail-Icons.svg"
                    className=" text-[#667479]"
                  />
                }
                name="email"
                placeholder="Email Address"
                required={true}
              />
            </div>
            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              className="w-full"
              type="submit"
            >
              Recover Password
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ForgotForm;
