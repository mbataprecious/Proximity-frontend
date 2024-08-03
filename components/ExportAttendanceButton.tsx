"use client";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { useState } from "react";
import Button from "./Button";
import SvgIconStyle from "./SvgIconStyle";
import useAuthRequest from "@/hooks/useAuthRequest";
import { useParams } from "next/navigation";

interface Props {
  moduleData: IModule;
  sessionData: ISession;
}
export const ExportAttendanceButton = ({ moduleData, sessionData }: Props) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const { request } = useAuthRequest();

  const handleExport = async () => {
    try {
      setLoading(true);
      const { data } = await request.get<{ data: IAttendanceList }>(
        `attendance/sessions/${params.sessionId}/export`
      );

      const formattedAttendance = data.data.attendance.map((entry) => ({
        firstName: entry.firstName,
        lastName: entry.lastName,
        email: entry.email,
        status: entry.status,
        date: format(new Date(entry.date), "yyyy-MM-dd HH:mm:ss"),
      }));

      // Convert to worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedAttendance);

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

      // Generate CSV and trigger download
      const csvData = XLSX.write(workbook, { bookType: "csv", type: "string" });
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.setAttribute(
        "download",
        `attendance-${moduleData.code}-${format(
          new Date(),
          "yyyy-MM-dd HH:mm:ss"
        )}.csv`
      );

      // Append the link to the document, trigger the download, and then remove the link
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {
        <Button
          disabled={loading}
          size={"sm"}
          onClick={handleExport}
          className="md:mx-3 flex items-center my-2"
        >
          {!loading ? (
            <SvgIconStyle
              src="/Assets/svg/export-icon1.svg"
              className=" mr-1"
            />
          ) : (
            <span>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-current animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#dededf"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          )}
         <p className="hidden md:flex"> Export</p>
        </Button>
      }
    </div>
  );
};
