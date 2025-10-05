
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import "./Table.css";

type Job = {
  _id: string;
  image: string;
  title: string;
  commitment: string;
  location: string;
  createdAt: string;
};

type Props = {
  data: Job[];
};

export default function FindJobTable({ data }: Props) {
  const router = useRouter();

  // Memoize formatDate to avoid recreating function
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  }, []);

  // If data is large, memoize processed data
  const jobs = useMemo(() => data || [], [data]);

  const handleViewClick = useCallback(() => {
    router.push("/apply-job");
  }, [router]);

  return (
    <div className="my-grid">
      {/* Column Headings */}
      {["Job Details", "Commitment", "Location", "Posted Date", "Actions"].map(
        (heading, index) => (
          <div
            key={index}
            className={`hidden lg:block font-bold text-left [grid-area:h${
              index + 1
            }]`}
          >
            {heading}
          </div>
        )
      )}

      {/* Data Rows */}
      {jobs.map(({ _id, image, title, commitment, location, createdAt }) => (
        <React.Fragment key={_id}>
          {/* Logo + Title */}
          <div className="job-cell logo mt-4 lg:mt-0 flex flex-col lg:flex-row gap-4 col-span-1 row-span-1 items-center font-bold text-center p-0 lg:p-6">
            <Image
              src={`https://api.pickmymaid.com/${image}`}
              alt={title}
              width={80}
              height={48}
              className="object-cover w-full lg:w-20 h-full lg:h-12 aspect-[4/3]"
            />
            <p className="hidden lg:block text-[#595959] text-sm">{title}</p>
          </div>

          {/* Title Row for Mobile */}
          <div className="job-cell title-mobile flex lg:hidden px-4 py-1 items-center font-bold text-center">
            <span className="pr-4 text-[#595959] text-sm">Title :</span>
            <span className="text-[#595959] text-sm">{title}</span>
          </div>

          {/* Job Type */}
          <div className="job-cell jobtype flex px-4 py-1 lg:p-0 items-center font-bold text-left md:text-center">
            <span className="pr-4 text-[#595959] text-sm lg:hidden">
              Job Type :
            </span>
            <span className="text-[#595959] text-sm">{commitment}</span>
          </div>

          {/* Location */}
          <div className="job-cell location flex px-4 py-1 items-center font-bold text-center">
            <span className="pr-4 text-[#595959] text-sm lg:hidden">
              Location :
            </span>
            <span className="text-[#595959] text-sm">{location}</span>
          </div>

          {/* CreatedAt */}
          <div className="job-cell createdat flex px-4 py-1 items-center font-bold text-center">
            <span className="pr-4 text-[#595959] text-sm lg:hidden">
              CreatedAt :
            </span>
            <span className="text-[#595959] text-sm">
              {formatDate(createdAt)}
            </span>
          </div>

          {/* View Button */}
          <div className="job-cell button flex px-4 py-1 items-center font-bold text-center">
            <button
              onClick={handleViewClick}
              className="mb-4 lg:mb-0 w-full lg:w-1/2 bg-[#FF7442] border-2 border-[#FF7442]
                         text-white px-4 py-2 rounded-lg
                         hover:bg-[#fe5f1c] hover:border-[#fe5f1c]"
            >
              View
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
