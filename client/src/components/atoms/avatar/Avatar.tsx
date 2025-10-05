"use client";
import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { RiLogoutCircleLine } from "../Icons/Icons";

const Avatar = ({ fullName, onLogout }: { fullName: string; onLogout: () => void }) => {
    const Letters = fullName
        .split(" ")
        .map((word, i) => (i < 2 ? word[0]?.toUpperCase() : ""))
        .join("");
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <div className="grid justify-items-center items-center cursor-pointer">
                    <div className="aspect-[1/1] w-[2rem] h-[2rem] rounded-full overflow-hidden bg-primary-300 flex items-center justify-center">
                        <p className="text-[1rem] font-[500]">{Letters}</p>
                    </div>
                    <p className="text-[1rem] capitalize">{fullName}</p>
                </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                sideOffset={5}
                className="min-w-[150px]  bg-white rounded-md shadow-md border border-gray-100 grid gap-2 py-3 outline-0">
                <h2 className="text-[1rem] capitalize px-2 text-description">Hy, {fullName}</h2>
                <button
                    onClick={onLogout}
                    className="flex items-center p-2 gap-2 text-red-500 hover:bg-gray-100 cursor-pointer">
                    <RiLogoutCircleLine
                        width={20}
                        height={20}
                    />
                    Logout
                </button>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default Avatar;
