"use client";

import { RiArrowUpDownLinel } from "@/components/atoms/Icons/Icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useSearchParams } from "next/navigation";

export default function SortMenu({ items, onSort, smallDevice }: { items: { [key: string]: string }; onSort: (index: string) => void; smallDevice?: boolean }) {
    const searchParams = useSearchParams();
    const query = searchParams.get("sort");
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className={`px-4 bg-white py-2 ${smallDevice ? "rounded-[0px_0px_10px_0px]" : "rounded-[10px_0px]"} border-[1px] outline-0 border-primary-400 text-primary-400 flex gap-1 items-center`}>
                    Sort {query ? <span className="opacity-80 whitespace-nowrap">{query}</span> : ""}
                    <RiArrowUpDownLinel />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                sideOffset={5}
                className="min-w-[150px] bg-white rounded-md shadow-md border p-1 outline-0">
                {Object.keys(items).map((item, index) => (
                    <DropdownMenu.Item
                        key={index}
                        asChild>
                        <div
                            className="block px-3 py-2 rounded border-0 outline-0 cursor-pointer hover:bg-primary-300 hover:text-white"
                            onClick={() => onSort(item)}>
                            {items[item]}
                        </div>
                    </DropdownMenu.Item>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
