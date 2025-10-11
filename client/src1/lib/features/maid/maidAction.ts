import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBasicStateStructure } from "../../../types/features/basic.types";
import { IJobApplicationForm } from "../../../types/components/authenticationForm/authenticationForms.types";
import { IFeaturedMaidCard, IMaidCountType, IMaidListItem } from "../../../types/features/maid/maid.types";
import { baseUrl } from "../../config";
import { experienceCalculator } from "../../../utils/experienceCalculator";
import { axiosInstance, axiosInstanceV2 } from "../../axiosInstance";

export const fetchMaidForSearch = createAsyncThunk<
  {
    count: number;
    maids: IMaidListItem[];
    page: number;
  },
  { page: number; search: string }
>("maids/fetchMaidData", async (req, { rejectWithValue }) => {
  try {
    const {
      data: { data },
    } = await axiosInstanceV2.get(`maids/find/${req.page}${req.search?.startsWith("?") ? "" : "?"}${req.search}`);
    const returnFormat: IMaidListItem[] = data?.maids.map((item: any) => ({
      option: item.option,
      id: item._id,
      location: item.location,
      availability: item.availability,
      skills: item.skills,
      age: item.age,
      salary: item.salary,
      nationality: item.nationality,
      name: item.name,
      references: item.references,
      profile: baseUrl + item.profile,
      service: item.service,
      youtubeLink: item.youtube_link,
      postedDate: item.date,
      refNumber: item.ref_number,
      employmentHistory: experienceCalculator(item?.employmentHistory),
      isInWishlist: item.is_in_wishlist,
    }));
    return {
      count: data.count,
      maids: returnFormat,
      page: req.page,
    };
  } catch (error: any) {
    console.log(error);
    return rejectWithValue({
      message: error.response.data.message,
    });
  }
});

export const applyForJob = createAsyncThunk<IBasicStateStructure, { body: IJobApplicationForm }>("maid/apply-for-job", async (req, { rejectWithValue }) => {
  try {
    const { data: response } = await axiosInstance.post("job/register", req.body);
    return { message: response.message } as IBasicStateStructure;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message,
    });
  }
});

export const fetchMaidDataById = createAsyncThunk("manageMaid/fetchMaidDatabyId", async (id: string) => {
  try {
    const response = await axiosInstance.post(`/job/id`, { id });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch maid data");
  }
});

export const fetchMaidCounts = createAsyncThunk("manage-maid/get-count", async (_, { rejectWithValue }) => {
  try {
    const {
      data: { message },
    } = await axiosInstance.get("job/counts");
    const response = message?.[0];
    return {
      nationalityCounts: response.nationalityCounts,
      serviceCounts: response.serviceCounts,
      totalCounts: response.available_maids,
    } as IMaidCountType;
  } catch (error: any) {
    return rejectWithValue({
      message: "Something went wrong",
    });
  }
});

export const fetchFeaturedMaids = createAsyncThunk<any, any>("manage-maid/get-featured-maid", async (req, { rejectWithValue }) => {
  try {
    const {
      data: { data: response },
    } = await axiosInstance.get(`job/featured?from=${req}`);

    const returnFormat: IFeaturedMaidCard[] = response?.map((user: any) => ({
      id: user._id,
      refNumber: user.ref_number,
      name: user.name,
      experience: experienceCalculator(user?.employmentHistory),
      profile: `${baseUrl}${user?.profile}`,
      salary: {
        from: user.salary?.from,
        to: user?.salary?.to,
      },
      nationality: user?.nationality,
      option: user?.option,
      reference: user?.references,
      hired: !user?.availability,
      youtubeLink: user.youtube_link,
      service: user.service,
      postedDate: user.date,
      isInWishlist: user.is_in_wishlist,
    }));

    return returnFormat as IFeaturedMaidCard[];
  } catch (error: any) {
    console.log({ error });

    return rejectWithValue({
      message: "Something went wrong",
    });
  }
});
