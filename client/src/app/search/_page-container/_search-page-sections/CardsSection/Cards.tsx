import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchMaidForSearch } from "@/lib/features/maid/maidAction";
import { filterSearchParams } from "@/utils/searchMaidParamsFilter";
import { countries, services } from "./cards.data";
import "./Cards.scss";
import MaidCard from "@/components/atoms/Cards/MaidCard/MaidCard";

const Cards = () => {
  const dispatch = useAppDispatch();
  const { country, keyword } = useParams<{ country?: string; keyword?: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>("");

  const { maids, loading } = useAppSelector((state) => state.maid);

  const currentPage = Number(searchParams.get("page") || 1);

  useMemo(() => {
    setQuery(searchParams.toString());
  }, [searchParams]);

  useEffect(() => {
    let newQuery: string = '';

    if (country && keyword) {
      newQuery += `country=${countries[country]}&service=${services[filterSearchParams(keyword as string)[0]]
        }`;
    } else if (keyword?.includes('available-in-uae')) {
      const filteredKeyword = filterSearchParams(keyword as string);
      newQuery += `service=${services[filteredKeyword?.[0]]}`;
    } else if (keyword) {
      const filteredKeyword = filterSearchParams(keyword as string);
      newQuery += `country=${countries[filteredKeyword?.[1]]}&service=${services[filteredKeyword?.[0]]
        }`;
    }

    if (newQuery?.length > 1) {
      if (query !== '') {
        setQuery((prev) => removeDuplicateQueries(`${prev}&${newQuery}`));
      } else {
        setQuery(`?${newQuery}`);
      }
    }
  }, [country, keyword, searchParams]);

  function removeDuplicateQueries(queryString: string) {
    const params = new URLSearchParams(queryString);
    const paramEntries = Array.from(params.entries());
    const paramMap = new Map(paramEntries);

    const uniqueParams = Array.from(paramMap.entries());
    const uniqueQueryString = new URLSearchParams(uniqueParams).toString();

    return `?${uniqueQueryString}`;
  }

  useLayoutEffect(() => {
    const splittedPath = pathname.split('/');

    if (splittedPath?.[2] && splittedPath[2] !== '') {
      if (
        query !== '' &&
        (query.includes('country') || query.includes('service'))
      ) {
        dispatch(fetchMaidForSearch({ page: currentPage, search: query }));
      }
    }

    if (!splittedPath[2] || splittedPath[2] === '') {
      dispatch(fetchMaidForSearch({ page: currentPage, search: query }));
    }
  }, [query]);

  return (
    <div className="cards-container">
      <div className="cards-grid">
        {loading &&
          [...Array(8)].map((_, index) => (
            <div className="cards-skeleton" key={index}></div>
          ))}
        {maids &&
          maids[currentPage]?.map((item, i) => (
            <MaidCard key={i} {...item} experience={item.employmentHistory || 0} />
          ))}
      </div>
    </div>
  );
};

export default React.memo(Cards);