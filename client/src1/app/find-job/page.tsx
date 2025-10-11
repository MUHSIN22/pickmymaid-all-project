"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import bannerBackground from "@/assets/images/About/banner-background.png";
import findmyjob from "@/assets/images/findmyjob.png";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import {
  IjobHandleSubmitBody,
  IJobSearchBodyState,
} from "../../types/features/job/job.types";
import { pagination } from "../../lib/features/job/jobSlice";
import {
  fetchJobsData,
  searchJobsData,
} from "../../lib/features/job/jobAction";
import SelectInput from "../../components/atoms/InputFields/SelectInput/SelectInput";

import FindJobTable from "../../components/atoms/Table/Table";
import Pagination from "../../components/atoms/Pagination/Pagination";
import {
  emiratesList,
  serviceList,
} from "../../components/molecules/Banner/banner.data";

export default function FindJob() {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const totalLength = useAppSelector((state) => state.job.totalLength);

  const { register, handleSubmit } = useForm<IjobHandleSubmitBody>({
    mode: "onChange",
  });

  const paginationHandler = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
    dispatch(pagination({ page }));
  };

  const handleSearch = (data: IJobSearchBodyState) => {
    dispatch(searchJobsData({ body: data }));
  };

  const jobData = useAppSelector((state) => state?.job?.filterdData);
  const baseData = useAppSelector((state) => state?.job?.data);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      paginationHandler(Number(page));
    }
  }, [baseData]);

  useEffect(() => {
    dispatch(fetchJobsData());
  }, []);

  return (
    <div>
      {/* Banner Section */}
      <div
        className="relative grid justify-items-center content-center gap-6 bg-cover bg-center z-[-1]"
        style={{
          backgroundImage: `url('${bannerBackground.src}')`,
          height: "clamp(180px, 30vw, 350px)",
        }}
      >
        <h1 className="text-primary-300 text-3xl font-bold">Find a Job</h1>

        {/* Show above md */}
        <div className="hidden md:block absolute bottom-0 right-[10%] xl:right-[15vw] 2xl:right-[10vw] w-[14vw]">
          <Image
            src={findmyjob.src}
            alt="Find my job"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </div>

      <div>
        {/* Filter Container */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-6 shadow-[0_0_20px_0_rgba(0,0,0,0.05)] mt-[-3rem] bg-white p-4 rounded-md mx-7">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <SelectInput
              label="Where?"
              list={emiratesList}
              required
              register={register("location")}
            />
            <SelectInput
              label="Nationality?"
              list={emiratesList}
              required
              register={register("nationality")}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full items-end">
            <SelectInput
              label="Service?"
              list={serviceList}
              register={register("service")}
              required
            />
            <button
              onClick={handleSubmit(handleSearch)}
              className="btn-solid w-full sm:w-[45%]"
            >
              Search
            </button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 gap-6">
          <h3 className="font-medium text-black-600 text-lg">
            <span className="text-primary-300 font-bold">
              Found {jobData ? jobData.length : "0"} jobs{" "}
            </span>
            according to your requirement
          </h3>
        </div>

        {/* Job Table */}
        <FindJobTable data={jobData} />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          onPageChange={paginationHandler}
          totalPages={Math.ceil(Number(totalLength) / 6)}
        />
      </div>
    </div>
  );
}
