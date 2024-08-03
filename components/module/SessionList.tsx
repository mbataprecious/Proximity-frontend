import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import SvgIconStyle from "../SvgIconStyle";
import { useParams, usePathname } from "next/navigation";
import Label from "../Label";
import Pagination from "../Pagination";
import CreateSessionModal from "../session/CreateSessionModal";
import SessionSuccessModal from "../session/SessionSuccessModal";
import useAuthRequest from "@/hooks/useAuthRequest";
import { getStudentsAndSessionsByMetadata } from "@/data/fetchers/clientFetchers";
import { useRouter } from "next-nprogress-bar";
import ClientTimeText from "../ClientTimeText";

const headers = ["Session ID", "Date", "Start Time", "End Time", "Geo fencing"];

const SessionList = ({ sessionsList }: { sessionsList: ISessionList }) => {
  const router = useRouter();
  const { request } = useAuthRequest();
  const [open, setOpen] = useState(false);
  const [recentSession, setRecentSession] = useState<ISession>();
  const [successOpen, setSuccessOpen] = useState(false);
  const [metadata, setMetadata] = useState(sessionsList?.metadata ?? {});
  const { moduleId } = useParams<{ moduleId: string }>();
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<ISessionList["sessions"]>(
    sessionsList?.sessions ?? []
  );
  const pathname = usePathname();
  const [page, setPage] = useState<number>(
    sessionsList?.metadata?.currentPage ?? 1
  );

  const handleFetch = async (page: number) => {
    setLoading(true);
    const data = await getStudentsAndSessionsByMetadata({
      request,
      type: "sessions",
      moduleId,
      page,
    }).finally(() => {
      setLoading(false);
    });
    console.log(data);
    setSessions((data as ISessionList).sessions);
    setMetadata((data as ISessionList).metadata);
    setPage((data as ISessionList).metadata.currentPage);
  };
  useEffect(() => {
    setSessions(sessionsList.sessions);
    setMetadata(sessionsList.metadata);
    setPage(sessionsList.metadata.currentPage);
  }, [sessionsList]);

  const Empty = (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="  ">
        <div>
          <Image
            src="/Assets/images/session-empty-icon.png"
            alt="empty"
            className=" mx-auto"
            width={250}
            height={200}
          />
        </div>
        <p className=" font-bold text-[20px] text-center"> Add New Session</p>
        <div className=" flex justify-center items-center">
          <Button shadow className=" mt-9" onClick={() => setOpen(true)}>
            Start Session
          </Button>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {sessions.length > 0 ? (
        <div className="relative overflow-auto">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="p-4 bg-blue-500 text-white italic">
                Loading...
              </div>
            </div>
          )}
          <div className=" flex justify-end items-center py-[22px] px-9">
            <Button
              variant={"info"}
              isOutlined
              size={"sm"}
              className=" flex"
              onClick={() => setOpen(true)}
            >
              <SvgIconStyle
                src="/Assets/svg/plus-Icons.svg"
                className=" mr-1"
              />
              <span>Start Session</span>
            </Button>
          </div>
          <div className="w-full overflow-auto hide-scrollbar">
          <table className="min-w-full table-fixed divide-y divide-gray-300">
            <thead className=" bg-[#017FED]">
              <tr>
                {headers.map((title) => (
                  <th
                    key={title}
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sessions.map((session, index) => (
                <tr
                  key={index}
                  onClick={() =>
                    router.push(pathname + "/session/" + session._id)
                  }
                  className={`hover:bg-blue-50 cursor-pointer`}
                >
                  <td
                    title={session._id}
                    className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-700"
                  >
                    {session._id.substring(0, 5) + "...."}
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-700">
                    <ClientTimeText
                      ISOstring={session.createdAt}
                      format="MM/dd/yyyy"
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-700">
                    <ClientTimeText
                      ISOstring={session.createdAt}
                      format="hh:mm a"
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-700">
                    <ClientTimeText
                      ISOstring={session.endTime}
                      format="hh:mm a"
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-700 flex justify-center">
                    {session.geofencing ? (
                      <Label variant={"success"}>Enabled </Label>
                    ) : (
                      <Label variant={"info"}>Disabled </Label>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div
            className={`flex justify-center mt-14 pb-10 ${
              sessions.length < 5 && "mt-28"
            }`}
          >
            <Pagination
              pageCount={metadata?.totalPages}
              pageRangeDisplayed={3}
              currentPage={page || 1}
              marginPagesDisplayed={2}
              onPageChange={(page) => {
                handleFetch(page);
              }}
            />
          </div>
        </div>
      ) : (
        Empty
      )}
      <CreateSessionModal
        setSession={setRecentSession}
        open={open}
        setSuccessOpen={setSuccessOpen}
        setOpen={setOpen}
      />
      <SessionSuccessModal
        session={recentSession}
        open={successOpen}
        setOpen={setSuccessOpen}
      />
    </>
  );
};

export default SessionList;
