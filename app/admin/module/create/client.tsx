"use client";
import { FormProvider, useForm } from "react-hook-form";
import React, { useCallback, useState } from "react";
import { yupResolver } from "@/utils/helpers";
import { ModuleType, moduleSchema } from "@/validations/moduleSchema";
import { Input } from "@/components/formControls/Input";
import { Textarea } from "@/components/formControls/Textarea";
import { FileRejection, useDropzone } from "react-dropzone";
import SvgIconStyle from "@/components/SvgIconStyle";
import Button from "@/components/Button";
import Link from "next/link";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import useAuthRequest from "@/hooks/useAuthRequest";
import { XiorError } from "xior";
import { useRouter } from "next-nprogress-bar";

const ModuleForm = ({ moduleDetail }: { moduleDetail?: IModule }) => {
  const defaultValues: ModuleType = {
    code: moduleDetail?.code ?? "",
    title: moduleDetail?.title ?? "",
    description: moduleDetail?.description ?? "",
  };
  console.log({ defaultValues, moduleDetail });
  const router = useRouter();
  const { request } = useAuthRequest();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [students, setStudents] = useState<string[]>([]);

  function fileToArray(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const data = reader.result;
        let workbook;
        if (file.name.endsWith(".csv")) {
          workbook = XLSX.read(data, { type: "string" });
        } else {
          workbook = XLSX.read(data, { type: "array" });
        }
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        resolve(json);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      if (file.name.endsWith(".csv")) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  }

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setErrorMessage(null);
      console.log({ acceptedFiles });
      if (acceptedFiles?.length > 0) {
        const file = acceptedFiles[0];
        fileToArray(file)
          .then((data) => {
            const emailArray: string[] = data
              .map((row) => row?.["Email"] ?? row?.["email"])
              .filter((email) => (email as string).trim());
            console.log(emailArray);
            setStudents(emailArray);
            if (!emailArray.length) {
              toast.error("empty emails");
            } else {
              toast.success(emailArray.length + " emails parsed");
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error(error?.message);
            setErrorMessage(error?.message);
          });
        setSelectedFile(file);
      }

      if (fileRejections.length > 0) {
        const { errors } = fileRejections[0];
        errors.forEach((error) => {
          if (error.code === "file-too-large") {
            setErrorMessage("File size exceeds 3MB.");
          }
        });
      }
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: false, // Allow only one file
    maxSize: 3 * 1024 * 1024, // 3MB in bytes
  });

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver ? yupResolver(moduleSchema) : undefined,
    defaultValues,
  });
  const {
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data: ModuleType) => {
    const submitData = {
      ...data,
      ...(students.length > 0 && { students }),
    };
    try {
      const response = moduleDetail?._id
        ? await request.put(`/modules/${moduleDetail?._id}`, submitData)
        : await request.post("/modules", submitData);
      if (response) {
        toast.success(
          moduleDetail?._id
            ? "Module updated successfully"
            : "Module created successfully"
        );
        router.push("/admin/module");
      }
    } catch (error) {
      if (error instanceof XiorError) {
        toast.error(error?.response?.data.message as string);
      } else {
        toast.error((error as { message: string })?.message);
      }
      console.error(error);
    }
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form
          method="post"
          className=" grid grid-cols-1 gap-y-3"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="w-full flex lg:space-x-5 mb-2 max-[700px]:flex-col">
            <div className=" flex-1">
              <Input
                type="text"
                dark
                name="title"
                placeholder="Module title"
                required={true}
              />
            </div>
            <div className=" flex-1">
              <Input
                type="text"
                dark
                name="code"
                placeholder="Module Code"
                required={true}
              />
            </div>
          </div>
          <div className="w-full mb-2">
            <Textarea
              name="description"
              dark=" "
              cols={20}
              className=" h-[155px]"
              placeholder="Module description"
              required={true}
            />
          </div>
          <div className="w-full mt-1">
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-300 p-6 rounded-md cursor-pointer focus:outline-none bg-[#F9FAFB]"
            >
              <input {...getInputProps()} />
              <div className=" w-full p-6">
                <div className=" ">
                  <div className=" w-[56px] h-[56px] mx-auto flex justify-center items-center rounded-full bg-[#F0F2F5] mb-4">
                    <SvgIconStyle
                      src="/Assets/svg/cloud-upload.svg"
                      className="text-[#475367] w-7 h-7"
                    />
                  </div>
                </div>
                <p className=" text-sm font-semibold text-[#475367] text-center ">
                  <span className=" hover:underline text-[#008DFB]">
                    Click to upload{" "}
                  </span>
                  or drag and drop student list
                </p>
                <p className=" text-xs text-[#98A2B3] text-center mb-4">
                  XLSX,CSV (max.3 MB)
                </p>
                <div className=" flex items-center">
                  <div className=" flex-1 border h-0 border-[#F0F2F5]" />
                  <p className=" px-2 font-semibold text-xs text-[#98A2B3]">
                    OR
                  </p>
                  <div className=" flex-1 border h-0 border-[#F0F2F5]" />
                </div>
                <div className=" flex justify-center mt-4">
                  <Button type="button" className="">
                    Browse Files
                  </Button>
                </div>
                <div className=" flex justify-center mt-2">
                  {!!selectedFile ? (
                    `${selectedFile.name}`
                  ) : moduleDetail ? (
                    <span className=" text-red-400 text-sm">
                      Note: This will override the existing student list
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className=" flex justify-between items-center lg:mt-[50px] mb-24 max-[700px]:flex-col">
            <a
              href="/Assets/sample-students-sheets.csv"
              className=" text-primary font-medium hover:underline text-sm max-[700px]:mb-7"
              download
            >
              Download Template
            </a>

            <div className=" lg:space-x-2 max-[700px]:space-y-2">
              <Link href={"/admin/module/"}>
                <Button type="button" variant={"info"} className="bg-red-500" isOutlined>
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {moduleDetail ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ModuleForm;
