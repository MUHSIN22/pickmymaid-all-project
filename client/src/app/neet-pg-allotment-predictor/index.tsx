"use client";

import React, { useState, useMemo, FC, ChangeEvent, FormEvent } from "react";

// --- TYPE DEFINITIONS ---
interface User {
  name: string;
  mobile: string;
  rank: string;
}

interface FormData {
  name: string;
  mobile: string;
  rank: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  rank?: string;
  consent?: string;
}

interface Filters {
  category: string;
  specialty: string;
  collegeType: string;
  allotmentRound: string;
}

interface ApiDataItem {
  College: string;
  Specialty: string;
  Category: string;
  "Last Rank (Rounds 1-3)": string;
  "Last Rank (Stray Vacancy)": string;
  [key: string]: string | number | undefined; // Allow additional string/number properties
}

interface AnalysisResult {
  college: string;
  specialty: string;
  chance: "High Chance" | "Moderate Chance" | "No Allotment Likely";
  lastRank: string;
  allotmentCategory: string;
  smLastRank: string;
  catLastRank: string;
  userCategory: string;
  order: number;
}

// --- STATIC DATA ---
const STATIC_DATA = {
  colleges: {
    Government: [
      "Academy of Medical Sciences Pariyaram",
      "Government Medical College Palakkad",
      "Govt. Medical College Alappuzha",
      "Govt. Medical College Ernakulam",
      "Govt. Medical College Kollam",
      "Govt. Medical College Kottayam",
      "Govt. Medical College Kozhikode",
      "Govt. Medical College Manjeri",
      "Govt. Medical College Thiruvananthapuram",
      "Govt. Medical College Thrissur",
      "Regional Cancer Centre Thiruvananthapuram",
    ],
    "Self-Financing": [
      "Al Azhar Medical College and Super Specialty Hospital Thodupuzha",
      "Amala Institute of Medical Sciences Thrissur",
      "Azeezia Institute of Medical Sciences & Research Meyyannoor Kollam",
      "Believers Church Medical College Hospital Kuttapuzha Thiruvalla",
      "Dr Moopens Medical College Wayanad",
      "Dr. Somervell Memorial CSI Medical College Karakonam Thiruvananthapuram",
      "Jubilee Mission Medical College & Research Institute Thrisur",
      "KMCT Medical College Mukkom Kozikkode",
      "MES Medical College Perinthalmanna Malappuram",
      "Malabar Medical College Hospital & Research Centre Kozhikkode",
      "Malankara Orthodox Syrian Church Medical College Kolenchery Ernakulam",
      "Mount Zion Medical College Pathanamthitta",
      "P K Das Institute of Medical Sciences Palakkad",
      "Pushpagiri Institute of Medical Sciences & Research Centre Thiruvalla",
      "SUT Academy of Medical Science Thiruvananthapuram",
      "Sree Gokulam Medical College & Research Foundation Venjaramoodu TVPM",
      "Sree Narayana Institute of Medical Sciences Ernakulam",
      "Travancore Medical College Kollam",
    ],
  },
  categories: [
    "AC",
    "BH",
    "BX",
    "DX",
    "EW",
    "EZ",
    "HQ",
    "IQ",
    "KU",
    "LA",
    "MM",
    "MQ",
    "MU",
    "NC",
    "NM",
    "NR",
    "PD",
    "SC",
    "SM",
    "ST",
    "WD",
    "XS",
  ],
  specialties: [
    "Anaesthesia",
    "Anatomy",
    "Biochemistry",
    "Community Medicine",
    "Dermatology Venereology & Leprosy",
    "Diploma in Clinical Pathology",
    "Emergency Medicine",
    "Family Medicine",
    "Forensic Medicine",
    "General Medicine",
    "General Surgery",
    "Geriatrics",
    "Microbiology",
    "Obstetrics & Gynaecology",
    "Ophthalmology",
    "Orthopaedics",
    "Otorhinolaryngology",
    "Paediatrics",
    "Pathology",
    "Pharmacology",
    "Physical Medicine and Rehabilitation",
    "Physiology",
    "Psychiatry",
    "Radiodiagnosis",
    "Radiotherapy",
    "Respiratory Medicine",
    "Transfusion Medicine",
  ],
};

// --- HELPER & UI COMPONENTS ---
const DbmciIcon: FC = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="100"
      cy="100"
      r="95"
      fill="#2691e4"
      stroke="#263a7e"
      strokeWidth="10"
    />
    <path
      d="M60 140L100 60L140 140"
      stroke="white"
      strokeWidth="15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M80 110H120"
      stroke="white"
      strokeWidth="15"
      strokeLinecap="round"
    />
  </svg>
);
const Spinner: FC = () => (
  <div className="flex flex-col items-center justify-center gap-4">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2691e4]"></div>
    <p className="text-lg text-gray-600">Checking Allotments...</p>
  </div>
);

// --- REGISTRATION COMPONENT ---
interface RegistrationFormProps {
  onRegister: (data: User) => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    rank: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!/^[6-9]\d{9}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number.";
    if (!formData.rank || parseInt(formData.rank, 10) <= 0)
      newErrors.rank = "Enter a valid positive rank.";
    if (!formData.consent) newErrors.consent = "You must consent to continue.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Lead Captured:", formData); // Securely store this data
      onRegister({
        name: formData.name,
        mobile: formData.mobile,
        rank: formData.rank,
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
      <div className="text-center mb-6">
        <DbmciIcon />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          NEET PG Kerala Allotment Predictor
        </h1>
        <p className="text-gray-600">By DBMCI Calicut</p>
      </div>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2691e4] focus:border-[#2691e4]"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2691e4] focus:border-[#2691e4] text-black"
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="rank"
            className="block text-sm font-medium text-gray-700"
          >
            NEET PG Rank (AIR)
          </label>
          <input
            type="number"
            id="rank"
            name="rank"
            onChange={handleChange}
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
          {errors.rank && (
            <p className="text-red-500 text-xs mt-1">{errors.rank}</p>
          )}
        </div>
        <div className="pt-2">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              onChange={handleChange}
              className="h-4 w-4 text-[#2691e4] focus:ring-[#2691e4] border-gray-300 rounded mt-1"
            />
            <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
              I consent to be contacted by DBMCI Calicut.
            </label>
          </div>
          {errors.consent && (
            <p className="text-red-500 text-xs mt-1">{errors.consent}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#2691e4] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#263a7e] transition-colors duration-300"
        >
          Analyze My Chances
        </button>
      </form>
    </div>
  );
};

// --- CORE ANALYSIS & DISPLAY COMPONENTS ---
const MarketingBanner: FC = () => (
  <div className="bg-gradient-to-r from-[#2691e4] to-[#263a7e] text-white p-6 rounded-xl shadow-lg my-8 w-full">
    <h3 className="text-2xl font-bold text-center mb-4 text-[#ffcb05]">
      DBMCI Calicut – Preferred Choice for NEET PG
    </h3>
    <p className="text-center mb-6">
      Live & Face-to-Face Batches, Mentorship, Reading Room, Hostel Facilities
    </p>
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      <a
        href="tel:+919567433033"
        className="flex items-center justify-center gap-2 bg-[#ffcb05] text-[#263a7e] font-bold py-3 px-6 rounded-lg w-full sm:w-auto hover:opacity-90"
      >
        Call Now
      </a>
      <a
        href="https://wa.me/919567433033"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 px-6 rounded-lg w-full sm:w-auto hover:opacity-90"
      >
        WhatsApp Us
      </a>
    </div>
    <div className="mt-6 text-center">
      <a
        href="https://chat.whatsapp.com/B9xaXHaRoPjFSCEmuDSs6R?mode=ac_t"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white underline hover:text-[#ffcb05]"
      >
        Join our FREE Allotment Discussion Group!
      </a>
    </div>
  </div>
);

interface ResultCardProps {
  result: AnalysisResult;
  isStray: boolean;
}

const ResultCard: FC<ResultCardProps> = ({ result, isStray }) => {
  const chanceConfig = {
    "High Chance": {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-500",
    },
    "Moderate Chance": {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-500",
    },
    "No Allotment Likely": {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-500",
    },
  };
  const config = chanceConfig[result.chance] || {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-400",
  };
  return (
    <div
      className={`p-4 rounded-lg shadow-md border-l-4 ${config.bg} ${config.border}`}
    >
      <h4 className="font-bold text-gray-800">{result.college}</h4>
      <div className="mt-2 pt-2 border-t flex justify-between items-center">
        <span className={`font-bold text-sm ${config.text}`}>
          {result.chance}
        </span>
        <div className="text-right">
          <p className="text-xs text-gray-500">
            Cutoff Rank: {result.lastRank}
          </p>
          <p className="text-xs font-semibold text-gray-700">
            Allotted via: {result.allotmentCategory}
          </p>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-600 space-y-1 bg-gray-50 p-2 rounded">
        {result.smLastRank !== "N/A" && (
          <p>
            SM Cutoff: <strong>{result.smLastRank}</strong>
          </p>
        )}
        {result.catLastRank !== "N/A" && result.userCategory !== "SM" && (
          <p>
            {result.userCategory} Cutoff: <strong>{result.catLastRank}</strong>
          </p>
        )}
      </div>
      {isStray && (
        <p className="mt-2 text-xs font-bold text-red-700 bg-red-100 p-2 rounded-md">
          Riskier—Not Guaranteed
        </p>
      )}
    </div>
  );
};
const Disclaimer: FC = () => (
  <div className="text-xs text-gray-600 p-4 border-t mt-8 text-left bg-gray-50 rounded-b-lg">
    <p>
      <b>Important Guidance for Kerala Allotment:</b> This tool uses 2024
      allotment data. The official seat matrix may change as per CEE Kerala’s
      decision each year. Results are for guidance only. Stray vacancy round
      chances are risky; use with caution.
    </p>
  </div>
);

interface AnalysisDashboardProps {
  user: User;
  onStartOver: () => void;
}

const AnalysisDashboard: FC<AnalysisDashboardProps> = ({
  user,
  onStartOver,
}) => {
  const [filters, setFilters] = useState<Filters>({
    category: "SM",
    specialty: "",
    collegeType: "Govt",
    allotmentRound: "rounds1-3",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [apiData, setApiData] = useState<ApiDataItem[]>([]);

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFetchData = async () => {
    setIsLoading(true);
    setError("");
    setApiData([]);

    const params = new URLSearchParams();
    if (filters.collegeType !== "All")
      params.append("type", filters.collegeType);
    if (filters.specialty) params.append("specialty", filters.specialty);

    const API_URL = `https://script.google.com/macros/s/AKfycbwQeEBb2IULIfrtOKdyTzZjN4nZbL3MQA3McPSIRMleo16c6j5cEYV-CmXACe6xUXCI/exec?${params.toString()}`;

    try {
      const response = await fetch(API_URL);
      if (!response.ok)
        throw new Error(`API request failed with status ${response.status}`);
      const json = await response.json();

      if (!json.success || !Array.isArray(json.data)) {
        throw new Error(json.error || "Invalid data structure from API.");
      }
      setApiData(json.data);
    } catch (err: unknown) {
      console.error(err);
      setError(
        "Server temporarily down. The DBMCI Calicut tech team is already aware—please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const analysisResults = useMemo<AnalysisResult[]>(() => {
    if (apiData.length === 0) return [];

    const userRank = parseInt(user.rank, 10);
    const userCategory = filters.category;
    const rankField =
      filters.allotmentRound === "rounds1-3"
        ? "Last Rank (Rounds 1-3)"
        : "Last Rank (Stray Vacancy)";

    const getChance = (
      lastRankStr: string
    ): { tier: AnalysisResult["chance"] | null; order: number } => {
      const lastRank = parseInt(lastRankStr, 10);
      if (isNaN(lastRank) || lastRank === 0) return { tier: null, order: 0 };
      if (userRank <= lastRank) return { tier: "High Chance", order: 3 };
      if (userRank <= lastRank * 1.3)
        return { tier: "Moderate Chance", order: 2 };
      return { tier: "No Allotment Likely", order: 1 };
    };

    const results: AnalysisResult[] = [];
    const relevantData = apiData.filter(
      (item) => item[rankField] && item[rankField] !== "N/A"
    );
    const uniqueEntries = [
      ...new Map(
        relevantData.map((item) => [`${item.College}|${item.Specialty}`, item])
      ).values(),
    ];

    uniqueEntries.forEach((entry) => {
      const smEntry = relevantData.find(
        (e) =>
          e.College === entry.College &&
          e.Specialty === entry.Specialty &&
          e.Category === "SM"
      );
      const catEntry = relevantData.find(
        (e) =>
          e.College === entry.College &&
          e.Specialty === entry.Specialty &&
          e.Category === userCategory
      );

      const smRank = smEntry ? parseInt(smEntry[rankField], 10) : 0;

      const smLastRankForDisplay = smEntry ? smEntry[rankField] : "N/A";
      const catLastRankForDisplay = catEntry ? catEntry[rankField] : "N/A";

      const baseResult = {
        college: entry.College,
        specialty: entry.Specialty,
        userCategory: userCategory,
        smLastRank: smLastRankForDisplay,
        catLastRank: catLastRankForDisplay,
      };

      if (smEntry && smRank > 0 && userRank <= smRank) {
        results.push({
          ...baseResult,
          chance: "High Chance",
          lastRank: smEntry[rankField],
          allotmentCategory: "SM",
          order: 3,
        });
      } else {
        const catChance = getChance(catEntry ? catEntry[rankField] : "N/A");
        if (catChance.tier) {
          results.push({
            ...baseResult,
            chance: catChance.tier,
            lastRank: catEntry ? catEntry[rankField] : "N/A",
            allotmentCategory: userCategory,
            order: catChance.order,
          });
        }
      }
    });

    const sortFn = (a: AnalysisResult, b: AnalysisResult) =>
      b.order - a.order ||
      (parseInt(a.lastRank, 10) || Infinity) -
        (parseInt(b.lastRank, 10) || Infinity);
    return results.sort(sortFn);
  }, [user, filters, apiData]);

  const renderResults = (results: AnalysisResult[]) => {
    const isStray = filters.allotmentRound === "stray";
    return (
      <div className="mt-6">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((r, i) => (
              <ResultCard
                key={`${r.college}-${r.specialty}-${i}`}
                result={r}
                isStray={isStray}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 bg-gray-100 p-4 rounded-md">
            No allotments in the selected round for these filters.
          </p>
        )}
      </div>
    );
  };

  const AdviceBanner: FC = () => {
    if (isLoading || apiData.length === 0) return null;

    if (filters.allotmentRound === "rounds1-3") {
      return (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg my-4 text-sm">
          <p>
            <strong>Guidance:</strong> Accept any seat offered in these rounds.
            These are the safest and most reliable allotments.
          </p>
        </div>
      );
    }
    if (filters.allotmentRound === "stray") {
      return (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-800 p-4 rounded-md my-4">
          <h4 className="font-bold">Stray Vacancy Round (Riskier)</h4>
          <p className="text-sm mt-1">
            Stray vacancy seats are not guaranteed and are riskier. Consider
            these only if you have no main round options.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Hi {user.name}, Your Rank: {user.rank}
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Select your preferences to see your chances.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <FilterDropdown
          id="collegeType"
          name="collegeType"
          label="College Type"
          value={filters.collegeType}
          onChange={handleFilterChange}
          options={[
            { value: "Govt", label: "Government" },
            { value: "Self-Financing", label: "Self-Financing" },
            { value: "All", label: "All Colleges" },
          ]}
        />
        <FilterDropdown
          id="category"
          name="category"
          label="Category"
          value={filters.category}
          onChange={handleFilterChange}
          options={STATIC_DATA.categories}
        />
        <FilterDropdown
          id="specialty"
          name="specialty"
          label="Specialty"
          value={filters.specialty}
          onChange={handleFilterChange}
          options={STATIC_DATA.specialties}
          placeholder="Select your desired specialty"
        />
        <FilterDropdown
          id="allotmentRound"
          name="allotmentRound"
          label="Allotment Round"
          value={filters.allotmentRound}
          onChange={handleFilterChange}
          options={[
            { value: "rounds1-3", label: "Rounds 1-3 (Safe Allotment)" },
            { value: "stray", label: "Stray Vacancy Round (Riskier)" },
          ]}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center mt-4 p-4 space-y-4 sm:space-y-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onStartOver}
            className="bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            Start Over
          </button>
          <button
            onClick={handleFetchData}
            disabled={isLoading || !filters.specialty}
            className="bg-[#2691e4] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#263a7e] transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Loading..."
              : !filters.specialty
              ? "Select a Specialty"
              : "Check Chances"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {isLoading && (
        <div className="mt-6">
          <Spinner />
        </div>
      )}

      {!isLoading && apiData.length > 0 && (
        <>
          <AdviceBanner />
          {renderResults(analysisResults)}
        </>
      )}
      {!isLoading && !error && apiData.length === 0 && (
        <p className="text-center text-gray-600 mt-4">
          Select a specialty and click &quot;Check Chances&quot; to begin.
        </p>
      )}

      <MarketingBanner />
      <Disclaimer />
    </div>
  );
};

interface FilterDropdownProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: (string | { value: string; label: string })[];
  placeholder?: string;
}

const FilterDropdown: FC<FilterDropdownProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  placeholder,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#2691e4] focus:border-[#2691e4] sm:text-sm rounded-md"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => {
        const val = typeof opt === "object" ? opt.value : opt;
        const lbl = typeof opt === "object" ? opt.label : opt;
        return (
          <option key={val} value={val}>
            {lbl}
          </option>
        );
      })}
    </select>
  </div>
);

// --- MAIN PAGE COMPONENT ---
const NeetPgPredictorPage: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const handleStartOver = () => setUser(null);
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {user ? (
        <AnalysisDashboard user={user} onStartOver={handleStartOver} />
      ) : (
        <RegistrationForm onRegister={setUser} />
      )}
    </div>
  );
};

export default NeetPgPredictorPage;
