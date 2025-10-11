/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Filters, getIntialValue } from "./Filters.data";
import { getAllFiltersByQuery, getAllQueriestoFilterState } from "./utils";
import {
  GrClose,
  VscSettings,
} from "../../../../../components/atoms/Icons/Icons";
import { useSessionStorage } from "../../../../../lib/hooks/useSessionStorage";
import { useTranslation } from "../../../../../lib/hooks/useTranslation";
import { useRouter, useSearchParams } from "next/navigation";

type FilterProps = {
  onClose?: any;
};

const Filter = ({ onClose }: FilterProps) => {
  const [filteredData, setFilteredData] = useState<any>([]); // used for storing filtered data
  const [filteredDataLastState, setFilteredDataLastState] = useState<any>([]);
  const searchParams = useSearchParams();
  const [inputs, setInputs] = useState<any>(getIntialValue());
  const option: string | null = searchParams.get("option");
  const availability: string | null = searchParams.get("availability");
  const skills: string | null = searchParams.get("skills");
  const nationality: string | null = searchParams.get("nationality");
  const salary: string | null = searchParams.get("salary");
  const location: string | null = searchParams.get("location");
  const sort: string | null = searchParams.get("sort");
  const service: string | null = searchParams.get("service");
  const visa: string | null = searchParams.get("visa");
  const religion: string | null = searchParams.get("religion");
  const page: string | null = searchParams.get("page");

  /**
   * @summary - this function calling in every onchange of the checkbox
   * and adding data to filterarray
   */
  // useSessionstorage for sessionStorage functionalities
  const { clearSessionData } = useSessionStorage();
  const router = useRouter();

  // monitoring the url
  useEffect(() => {
    // if the query is empty
    if (
      !nationality &&
      !skills &&
      !salary &&
      !availability &&
      !option &&
      !location &&
      !sort
    )
      return;
    const { checkBoxInputs } = getAllFiltersByQuery(
      {
        nationality,
        skills,
        salary,
        availability,
        option,
        sort,
        service,
        visa,
        religion,
      },
      getIntialValue() // passing initial value for resetting the data and add again
    );

    // it will return an array of object in the structure of filteredData
    const filteredDataStructure = getAllQueriestoFilterState({
      nationality,
      skills,
      salary,
      availability,
      option,
      sort,
      location,
      service,
      visa,
      religion,
      page,
    });

    setFilteredData((prev: any) => {
      setFilteredDataLastState(prev);
      return filteredDataStructure;
    });
    setInputs({ ...checkBoxInputs });
    if (location) setInputs({ ...checkBoxInputs, location });
  }, [
    option,
    skills,
    nationality,
    availability,
    salary,
    location,
    sort,
    service,
    visa,
    religion,
  ]);

  const checkBoxHandler = (e: any, item: any, checkboxItem: any) => {
    setInputs({ ...inputs, [checkboxItem.value]: e.target.checked });
    let isItemAlreadyExist = false;

    if (filteredData) {
      filteredData.forEach((value: any) => {
        if (value.key === item?.key) {
          isItemAlreadyExist = true;
        }
      });
    }

    if (e.target.checked) {
      if (isItemAlreadyExist) {
        const addingCheckBox = filteredData.map((value: any) => {
          if (value?.key === item?.key && value) {
            value = {
              ...value,
              values: [...value.values, checkboxItem?.value],
            };
          }
          return value;
        });
        setFilteredData((prev: any) => {
          setFilteredDataLastState(prev);
          return addingCheckBox;
        });
      } else {
        setFilteredData((prev: any) => {
          setFilteredDataLastState(prev);
          return [
            ...(filteredData || []),
            { type: "multiple", key: item?.key, values: [checkboxItem?.value] },
          ];
        });
      }
    } else {
      const removingCheck = (filteredData || [])
        .map((value: any) => {
          if (value?.key === item?.key) {
            if (value.values.length === 1) {
              return null;
            }
            const removedItem = value.values.filter(
              (singleItem: any) => singleItem !== checkboxItem?.value
            );
            value = { ...value, values: removedItem };
          }
          return value;
        })
        .filter(Boolean);
      setFilteredData((prev: any) => {
        setFilteredDataLastState(prev);
        return removingCheck;
      });
    }
  };

  /**
   * @summary - this function calling in every onchange of the select(dropdown)
   * and adding data to filterarray
   */
  const selectHandler = (e: any, item: any) => {
    setInputs({ ...inputs, [item?.key]: e.target.value });
    const { value } = e.target; // taking value
    let isItemAlreadyExist = false;
    filteredData?.forEach((value: any) => {
      if (value.key === item?.key) {
        isItemAlreadyExist = true;
      } else {
        isItemAlreadyExist = false;
      }
    });
    if (isItemAlreadyExist) {
      const newFilteredData = filteredData?.map((filtersValue: any) => {
        if (filtersValue.key === item.key) {
          filtersValue.values = value;
          return filtersValue;
        }
        return filtersValue;
      });
      setFilteredData((prev: any) => {
        setFilteredDataLastState(prev);
        return newFilteredData;
      });
    } else {
      setFilteredData((prev: any) => {
        setFilteredDataLastState(prev);
        return [
          ...filteredData,
          {
            type: "single",
            key: item?.key,
            values: value,
          },
        ];
      });
    }
  };

  /**
   * @summary - this function calling in every onchange of the minmax
   * and adding data to filterarray
   */
  const minMaxHandler = (e: any, type: any, item: any) => {
    const { value } = e.target; // taking value
    let isItemAlreadyExist = false;
    filteredData.map((data: any) => {
      if (data.key === item.key) {
        isItemAlreadyExist = true;
      }
      return null;
    });
    if (type === "from") {
      setInputs({ ...inputs, [`${item?.key}-from`]: e.target.value });
    } else {
      setInputs({ ...inputs, [`${item?.key}-to`]: e.target.value });
    }
    if (isItemAlreadyExist) {
      const editedData = filteredData.map((dataforedit: any) => {
        if (dataforedit.key === item.key) {
          const newData = {
            ...dataforedit,
            values: { ...dataforedit.values, [type]: value },
          };
          return newData;
        }
        return dataforedit;
      });
      setFilteredData((prev: any) => {
        setFilteredDataLastState(prev);
        return editedData;
      });
    } else {
      const obj = {
        key: item?.key,
        type: "range",
        values: {
          [type]: value,
        },
      };

      setFilteredData((prev: any) => {
        setFilteredDataLastState(prev);
        return [...filteredData, obj];
      });
    }
  };

  // Add filter URLs
  const addUrls = (data: any[]) => {
    const multiple: Record<string, string> = {};
    data?.forEach((item) => {
      if (item?.type === "multiple") {
        multiple[item.key] = (item.values as string[]).join(",");
      } else if (item?.type === "single") {
        multiple[item.key] = item.values as string;
      } else if (item?.type === "range") {
        const { from, to } = item.values as { from?: string; to?: string };
        if (from) multiple[`${item.key}-from`] = from;
        if (to) multiple[`${item.key}-to`] = to;
      }
    });

    const newParams = new URLSearchParams({ ...multiple });
    if (newParams.toString() !== searchParams.toString()) {
      router.push(`?${newParams.toString()}`);
    }
  };

  /**
   * @summary when clicking the apply button
   */
  const applyButtonHandler = () => {
    window.scrollTo(0, Number(localStorage.getItem("cardTop")) || 0);
    addUrls(filteredData);
    onClose();
  };

  const clearButtonHandler = () => {
    setInputs(getIntialValue());
    setFilteredData([]);
    clearSessionData("filter");
    router.push("?page=1");
  };
  const { t } = useTranslation();

  useEffect(() => {
    if (
      (filteredData?.length >= 0 && filteredDataLastState?.length > 0) ||
      (filteredData?.length > 0 && filteredDataLastState?.length === 0)
    ) {
      addUrls(filteredData);
    }
  }, [filteredData]);

  return (
    <div className="pr-2 grid gap-2.5 max-h-[calc(100svh-4rem)]">
      <div className="mt-2 flex justify-between items-center pt-4 sm:pt-12">
        <div className="flex items-center gap-2">
          <VscSettings
            width="16"
            height="16"
            className="mr-2"
            style={{ transform: "rotate(90deg)" }}
          />
          <h2 className="text-xl! font-semibold!">Filter</h2>
        </div>
        <div className="block md:hidden">
          <button
            className="bg-transparent hover:bg-transparent border-none p-3!"
            aria-label="Close"
            onClick={onClose}
          >
            <GrClose width="24" height="24" />
          </button>
        </div>
      </div>

      <div className="pb-16 overflow-auto h-[calc(100svh-7rem)]">
        {Filters.map((item) => {
          return (
            <div className="mt-4! grid gap-2" key={item.id}>
              <h3 className="font-semibold! text-text-black-700! text-lg!">
                {t(item?.name)}
              </h3>

              {item.type === "check_box" ? (
                item.items.map((checkboxdata, index) => {
                  return (
                    <label
                      key={checkboxdata.id + "-" + index}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={inputs[checkboxdata?.value] || false}
                        onChange={(e) => checkBoxHandler(e, item, checkboxdata)}
                        className="w-4 h-4 text-text-black-700! bg-gray-100! border-gray-300! rounded focus:ring-blue-500!"
                        style={{ borderColor: "#B0BABF" }}
                      />
                      <span className="text-md! text-text-black-800!">
                        {checkboxdata?.key && t(checkboxdata.key)}
                      </span>
                    </label>
                  );
                })
              ) : item.type === "select" ? (
                <div className="p-2! border! w-64 rounded-md!">
                  <select
                    onChange={(e) => selectHandler(e, item)}
                    className="w-full focus:outline-none outline-none "
                    style={{ borderColor: "#B0BABF" }}
                    value={inputs[item.key] || ""}
                  >
                    <option disabled value="">
                      Select {t(item?.name)}
                    </option>
                    {item.items.map((item: any, index: number) => {
                      return (
                        <option key={item.id + "-" + index} value={item.value}>
                          {t(item.key)}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : item.type === "from_to" ? (
                <div className="w-64 flex gap-5">
                  <input
                    type="text"
                    onChange={(e) => minMaxHandler(e, "from", item)}
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#B0BABF" }}
                    placeholder="Min"
                    value={inputs[`${item.key}-from`] || ""}
                  />
                  <input
                    type="text"
                    onChange={(e) => minMaxHandler(e, "to", item)}
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#B0BABF" }}
                    placeholder="Max"
                    value={inputs[`${item.key}-to`] || ""}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}

        <div className="mt-5! pb-5! font-semibold! flex gap-2">
          <button
            onClick={() => {
              onClose();
              clearButtonHandler();
            }}
            className="bg-transparent! text-text-black-800! px-6! py-2! border-2! border-primary-300! rounded-md hover:bg-gray-100! transition-colors"
          >
            Clear
          </button>
          <button
            onClick={applyButtonHandler}
            className="bg-primary-300! border-2! border-primary-300! text-white! px-6! py-2! rounded-md hover:bg-primary-400! hover:border-primary-400! transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Filter);
