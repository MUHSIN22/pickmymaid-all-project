"use client";
import dynamic from "next/dynamic";
import React from "react";
const MeetTheTeam = dynamic(() => import("./MeetTheTeam"), {
  ssr: false,
});

export default function MeetTheTeamWrapper() {
  return <MeetTheTeam />;
}
