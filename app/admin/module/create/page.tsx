"use client";
import LecturerLayout from "@/components/Layouts/LecturerLayout";
import { FormProvider, useForm } from "react-hook-form";
import React, { useCallback, useState } from "react";
import { yupResolver } from "@/utils/helpers";
import { ModuleType, moduleSchema } from "@/validations/moduleSchema";
import { Input } from "@/components/formControls/Input";
import { Textarea } from "@/components/formControls/Textarea";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { FileRejection, useDropzone } from "react-dropzone";
import SvgIconStyle from "@/components/SvgIconStyle";
import Button from "@/components/Button";
import Link from "next/link";

const CreateModule = () => {
  const defaultValues: ModuleType = {
    code: "",
    title: "",
    description: "",
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setErrorMessage(null);

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result;
          console.log(fileContent);
          // You can process the file content here
        };
        reader.readAsText(file);
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

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
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

  const removeFile = () => {
    setSelectedFile(null);
  };
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver ? yupResolver(moduleSchema) : undefined,
    defaultValues,
  });
  const onSubmit = () => {};

  return (
    <LecturerLayout>
      <div className=" pt-[65px] mx-auto max-w-[856px]">
        <h4 className="text-2xl font-semibold text-[#4A4A4A] text-center mb-12">
          Create New Module
        </h4>
        <div>
          <FormProvider {...methods}>
            <form
              method="post"
              className=" grid grid-cols-1 gap-y-3"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <div className="w-full flex space-x-5 mb-2">
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
                      <Button className="">Browse Files</Button>
                    </div>
                  </div>
                  {/* {errorMessage && (
                    <div className="mt-2 text-red-500">
                      <p>{errorMessage}</p>
                    </div>
                  )} */}
                  {/* {selectedFile && (
                    <div className="mt-2">
                      <h4 className="font-bold">Selected file:</h4>
                      <div className="flex items-center space-x-2">
                        <span>{selectedFile.name}</span>
                        <XMarkIcon
                          className="h-5 w-5 text-red-500 cursor-pointer"
                          aria-hidden="true"
                          onClick={removeFile}
                        />
                      </div>
                    </div>
                  )} */}
                </div>
              </div>

              <div className=" flex justify-between items-center mt-[50px] mb-24">
                <a
                  href="#"
                  className=" text-primary font-medium hover:underline text-sm"
                  download
                >
                  Download Template
                </a>

                <div className=" space-x-2 ">
                  <Link href={"/admin/module/"}>
                    <Button variant={"info"} isOutlined>
                      Cancel
                    </Button>
                  </Link>

                  <Button>Create</Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
      <div className=" h-16 border-t" />
    </LecturerLayout>
  );
};

export default CreateModule;
