/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Banner from "@/assets/images/About/banner-background.webp";
import "./BannerSection.scss";
import { BiSearch } from "../../../../../components/atoms/Icons/Icons";

const list: string[] = [
  "Muslim",
  "Part Time",
  "UAE",
  "Dubai",
  "Filipino",
  "Indian",
  "Indonesian",
  "Srilankan",
  "Nepali",
  "Malayalam",
  "Arabic",
  "Maid cum Nanny",
  "Maid",
  "Nanny",
  "Cleaning",
  "Cooking",
  "Live-in",
  "Live-out",
  "English",
  "Caregiver",
  "Driver",
  "Private Tutor",
  "Private Nurse",
  "Postpartum care",
  "Cook",
];

const availableNationalities: string[] = [
  "Philippines",
  "India",
  "Nepal",
  "Srilanka",
  "Indonesia",
];

const BannerSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("nationality");
  const searchParamsValue = searchParams.get("searchParams");
  const [search, setSearch] = useState<string>("");
  const [filteredList, setFilteredList] = useState<string[]>(list || []);
  const [isListActive, setListActive] = useState<boolean>(false);

  const handleSearch = () => {
    if (search !== "") {
      router.push(`/search?searchParams=${search}`);
    }
  };

  useEffect(() => {
    if (searchParamsValue) {
      setSearch(searchParamsValue);
    }
  }, [searchParamsValue]);

  const handleSuggestionClick = (value: string) => {
    router.push(`/search?searchParams=${value}`);
  };

  useEffect(() => {
    if (search === "") {
      setFilteredList(list);
    } else if (search) {
      setFilteredList(
        list.filter((item) =>
          item.toLowerCase().includes(search?.toLowerCase())
        )
      );
    }
  }, [search]);

  const handleSearchBoxAppearance = () => {
    document.addEventListener("click", (event) => {
      if (
        !(event?.target as any)?.className?.includes("search-input") &&
        !(event?.target as any)?.className?.includes("list-item")
      ) {
        setListActive(false);
      }
    });
  };

  useEffect(() => {
    handleSearchBoxAppearance();
  }, []);

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url('${
          availableNationalities.includes(query as string)
            ? Banner?.src
            : Banner?.src
        }')`,
      }}
    >
      <div className="banner__content">
        <div className="banner__title">
          <h1
            className="heading-section-title px-2!"
            style={{ color: "black", fontWeight: 600 }}
          >
            All Maids/Nannies are in The UAE Now <br />
          </h1>
        </div>
        <div className="banner__search-container px-4!">
          <div className="banner__search-form">
            <div className="banner__search-input-group">
              <input
                className="banner__search-input search-input"
                type="text"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by type eg. Cook Cleaning"
                onFocus={() => setListActive(true)}
                value={search}
              />
              {isListActive && filteredList && filteredList.length > 0 && (
                <ul className="banner__suggestions-list">
                  {filteredList.map((item, index) => (
                    <li
                      className="banner__suggestion-item list-item"
                      key={index}
                      onClick={() => {
                        handleSuggestionClick(item);
                        setListActive(false);
                      }}
                    >
                      <span className="text-description">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <button
            className="btn solid banner__search-button "
            onClick={handleSearch}
          >
            <BiSearch />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
