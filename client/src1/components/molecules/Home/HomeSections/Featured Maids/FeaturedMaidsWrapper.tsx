import React from "react";
import FeaturedMaids from "./FeaturedMaids";
import { ICounts, IFeaturedMaidCard } from "../../../../../app/page";

export default function FeaturedMaidsWrapper({
  counts,
  featuredMaids,
}: {
  counts: ICounts;
  featuredMaids: IFeaturedMaidCard[];
}) {
  return <FeaturedMaids counts={counts} featuredMaids={featuredMaids} />;
}
