import LecturerLayout from "@/components/Layouts/LecturerLayout";
import ModuleForm from "../../create/client";
import { getSingleModule } from "@/data/fetchers";

const EditModule = async ({ params }: { params: { moduleId: string } }) => {
  const data = await getSingleModule(params.moduleId);
  console.log(data);
  return (
    <LecturerLayout>
      <div className=" pt-[65px] mx-auto max-w-[856px] px-3">
        <h4 className="text-2xl font-semibold text-[#4A4A4A] text-center mb-12">
          Create New Module
        </h4>
        <ModuleForm moduleDetail={data} />
      </div>
      <div className=" h-16 border-t" />
    </LecturerLayout>
  );
};

export default EditModule;
