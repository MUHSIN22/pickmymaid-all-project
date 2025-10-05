import { Box, Button, ButtonGroup, Checkbox, Flex, Grid, HStack, Heading, Hide, Icon, IconButton, Input, Select } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { Filters, getIntialValue } from "./Filters.data";
import { getAllFiltersByQuery, getAllQueriestoFilterState } from "./utils";
import { GrClose, VscSettings } from "@/components/atoms/Icons/Icons";
import { useSessionStorage } from "@/lib/hooks/useSessionStorage";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueries } from "@/lib/hooks/getQueries";

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
  const { getQueries, addQueries } = useQueries();
  const router = useRouter();

  // monitoring the url
  useEffect(() => {
    // if the query is empty
    if (!nationality && !skills && !salary && !availability && !option && !location && !sort) return;
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

    setFilteredData((prev) => {
      setFilteredDataLastState(prev);
      return filteredDataStructure;
    });
    setInputs({ ...checkBoxInputs });
    if (location) setInputs({ ...checkBoxInputs, location });
  }, [option, skills, nationality, availability, salary, location, sort]);

  const checkBoxHandler = (e, item, checkboxItem) => {
    setInputs({ ...inputs, [checkboxItem.value]: e.target.checked });
    let isItemAlreadyExist = false;

    if (filteredData) {
      filteredData.forEach((value) => {
        if (value.key === item?.key) {
          isItemAlreadyExist = true;
        }
      });
    }

    if (e.target.checked) {
      if (isItemAlreadyExist) {
        const addingCheckBox = filteredData.map((value) => {
          if (value?.key === item?.key && value) {
            value = {
              ...value,
              values: [...value.values, checkboxItem?.value],
            };
          }
          return value;
        });
        setFilteredData((prev) => {
          setFilteredDataLastState(prev);
          return addingCheckBox;
        });
      } else {
        setFilteredData((prev) => {
          setFilteredDataLastState(prev);
          return [...(filteredData || []), { type: "multiple", key: item?.key, values: [checkboxItem?.value] }];
        });
      }
    } else {
      const removingCheck = (filteredData || [])
        .map((value) => {
          if (value?.key === item?.key) {
            if (value.values.length === 1) {
              return null;
            }
            const removedItem = value.values.filter((singleItem) => singleItem !== checkboxItem?.value);
            value = { ...value, values: removedItem };
          }
          return value;
        })
        .filter(Boolean);
      setFilteredData((prev) => {
        setFilteredDataLastState(prev);
        return removingCheck;
      });
    }
  };

  /**
   * @summary - this function calling in every onchange of the select(dropdown)
   * and adding data to filterarray
   */
  const selectHandler = (e, item) => {
    setInputs({ ...inputs, [item?.key]: e.target.value });
    const { value } = e.target; // taking value
    let isItemAlreadyExist = false;
    filteredData?.forEach((value) => {
      if (value.key === item?.key) {
        isItemAlreadyExist = true;
      } else {
        isItemAlreadyExist = false;
      }
    });
    if (isItemAlreadyExist) {
      const newFilteredData = filteredData?.map((filtersValue) => {
        if (filtersValue.key === item.key) {
          filtersValue.values = value;
          return filtersValue;
        }
        return filtersValue;
      });
      setFilteredData((prev) => {
        setFilteredDataLastState(prev);
        return newFilteredData;
      });
    } else {
      setFilteredData((prev) => {
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
  const minMaxHandler = (e, type, item) => {
    const { value } = e.target; // taking value
    let isItemAlreadyExist = false;
    filteredData.map((data): any => {
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
      const editedData = filteredData.map((dataforedit) => {
        if (dataforedit.key === item.key) {
          const newData = {
            ...dataforedit,
            values: { ...dataforedit.values, [type]: value },
          };
          return newData;
        }
        return dataforedit;
      });
      setFilteredData((prev) => {
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

      setFilteredData((prev) => {
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
    if ((filteredData?.length >= 0 && filteredDataLastState?.length > 0) || (filteredData?.length > 0 && filteredDataLastState?.length === 0)) {
      addUrls(filteredData);
    }
  }, [filteredData]);

  return (
    <Grid
      pr="20px"
      position="sticky"
      top="4rem"
      left={0}
      gap="10px"
      maxH="calc(100svh - 4rem)">
      <HStack
        mt={2}
        justifyContent="space-between"
        pt={{ base: "1rem", sm: "3rem" }}>
        <HStack>
          <Icon
            as={VscSettings}
            style={{ transform: "rotate(90deg)" }}
          />
          <Heading size="md">{t("searchmaid.filter.filter")}</Heading>
        </HStack>
        <Hide above="md">
          <IconButton
            bg="transparent"
            _hover={{ bg: "transparent" }}
            border="none"
            aria-label="Close"
            onClick={onClose}
            icon={<Icon as={GrClose} />}
          />
        </Hide>
      </HStack>
      <Box
        pb="4rem"
        overflow="auto"
        height="calc(100svh - 7rem)">
        {Filters.map((item) => {
          return (
            <Grid
              mt="18px"
              gap="8px"
              key={item.id}>
              <Heading
                fontWeight="500"
                color="text.black.700"
                size="md">
                {t(item?.name)}
              </Heading>
              {item.type === "check_box" ? (
                item.items.map((checkboxdata) => {
                  return (
                    <Checkbox
                      isChecked={inputs[checkboxdata?.value]}
                      onChange={(e) => checkBoxHandler(e, item, checkboxdata)}
                      colorScheme="blue"
                      border="#B0BABF"
                      key={checkboxdata.id}>
                      {checkboxdata?.key && t(checkboxdata.key)}
                    </Checkbox>
                  );
                })
              ) : item.type === "select" ? (
                <Select
                  onChange={(e) => selectHandler(e, item)}
                  w="250px"
                  borderColor="#B0BABF"
                  value={inputs[item.key]}>
                  <option
                    disabled
                    selected
                    value="">
                    Select {t(item?.name)}
                  </option>
                  {item.items.map((item: any) => {
                    return (
                      <option
                        key={item.id}
                        value={item.value}>
                        {t(item.key)}
                      </option>
                    );
                  })}
                </Select>
              ) : item.type === "from_to" ? (
                <Flex
                  w="250px"
                  gap="20px">
                  <Input
                    onChange={(e) => minMaxHandler(e, "from", item)}
                    borderColor="#B0BABF"
                    placeholder="Min"
                    value={inputs[`${item.key}-from`]}
                  />
                  <Input
                    onChange={(e) => minMaxHandler(e, "to", item)}
                    borderColor="#B0BABF"
                    placeholder="Max"
                    value={inputs[`${item.key}-to`]}
                  />
                </Flex>
              ) : (
                ""
              )}
            </Grid>
          );
        })}
        <ButtonGroup
          mt="20px"
          pb="20px">
          <Button
            onClick={() => {
              onClose();
              clearButtonHandler();
            }}
            bg="transparent"
            color="text.black.800">
            {t("searchmaid.filter.clear")}
          </Button>
          <Button onClick={applyButtonHandler}>{t("searchmaid.filter.apply")}</Button>
        </ButtonGroup>
      </Box>
    </Grid>
  );
};

export default React.memo(Filter);
