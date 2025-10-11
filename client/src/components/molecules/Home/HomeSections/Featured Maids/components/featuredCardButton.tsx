"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const FeaturedCardButton = () => {
    const router = useRouter();
    return (
        <Button
            className="btn-solid"
            onClick={() => router.push("/search")}>
            View All Maids / Nannies
        </Button>
    );
};

export default FeaturedCardButton;
