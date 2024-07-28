"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../formControls/Input";
import Button from "../Button";
import { userTypeToPathMap, yupResolver } from "@/utils/helpers";
import SvgIconStyle from "../SvgIconStyle";
import { LoginSchemaType, loginSchema } from "@/validations/loginSchema";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import useAuthRequest from "@/hooks/useAuthRequest";
import { setSession } from "@/utils/authsession";
import toast from "react-hot-toast";
import { XiorError } from "xior";

const LoginForm = () => {
  const router = useRouter();
  const { request } = useAuthRequest();
  const defaultValues = {
    email: "",
    password: "",
  };
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver ? yupResolver(loginSchema) : undefined,
    defaultValues,
  });
  const {
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data: LoginSchemaType) => {
    try {
      //throw Error("Not implemented");
      const params = new URLSearchParams(document.location.search);
      const redirectTo = params.get("redirect_url");
      const response = await request.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (response) {
        const userAuth: IAuthData = response.data.data;
        console.log(userAuth);
        setSession(userAuth);
        const userPath =
          userTypeToPathMap?.[
            userAuth?.user?.role as keyof typeof userTypeToPathMap
          ];
        toast.success("Successfully logged in");
        router.replace(redirectTo || userPath.path);
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
    <div className=" mx-auto px-6 md:max-w-[436px]">
      <div className="text-[#242B33] mb-12 w-full">
        <h3 className="font-bold text-2xl md:text-[1.75rem]">
          Welcome Back to Proximity!
        </h3>
        <p className=" text-xs mt-2">
          Ready to mark your presence? Log in to continue.
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
            <div className="w-full">
              <Input
                type="password"
                icon={
                  <SvgIconStyle
                    src="/Assets/svg/lock-Icons.svg"
                    className=" text-[#667479]"
                  />
                }
                name="password"
                placeholder="Password"
                required={true}
              />
              <Link
                href={"/auth/forgot"}
                className=" block text-right text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              className="w-full"
              type="submit"
            >
              Login
            </Button>
          </form>
        </FormProvider>
        <p className="text-[#667479] text-center text-sm mt-6">
          Don&apos;t have an account yet?&nbsp;
          <Link
            href={"/signup"}
            className="text-center text-sm text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
