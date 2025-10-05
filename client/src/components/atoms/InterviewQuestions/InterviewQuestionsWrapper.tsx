"use client";
import dynamic from "next/dynamic";
import React from "react";
const InterviewQuestions = dynamic(() => import("./InterviewQuestions"), {
  ssr: false,
});

export default function InterviewQuestionsWrapper(props: any) {
  return <InterviewQuestions {...props} />;
}
