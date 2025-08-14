"use client";

import { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "~/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandGroup } from "~/components/ui/command";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { CommandEmpty, CommandList } from "cmdk";

export default function MultiSelectDropdown({
    label,
    options,
    onChange,
    values = [],
}: {
    label: string;
    options: { label: string; value: string }[];
    onChange: (value: string[]) => void;
    values?: string[];
}) {
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>(values);

    const toggleValue = (value: string) => {
        setSelectedValues((prev) => {
            const newValues = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
            return newValues;
        });
    };

    useEffect(() => {
        onChange(selectedValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValues]);

    const getLabel = () => {
        if (selectedValues.length === 0) return label;
        return options
            .filter((item) => selectedValues.includes(item.value))
            .map((item) => item.label)
            .join(", ");
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="border-input bg-background inline-flex w-full items-center justify-between overflow-hidden rounded-md border px-3 py-2 text-sm shadow-sm">
                    <span className={cn("truncate text-left", selectedValues.length === 0 && "text-muted-foreground")}>
                        {getLabel() || label}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
            </PopoverTrigger>

            <PopoverContent align="start" sideOffset={4} className="w-(--radix-popover-trigger-width) p-0">
                <Command>
                    <CommandInput placeholder="Tìm..." className="h-9" />
                    <CommandList>
                        <CommandEmpty className="p-5 text-center text-slate-600">Không tìm thấy dữ liệu.</CommandEmpty>

                        <CommandGroup className="max-h-60 overflow-y-auto">
                            {options.map((item) => {
                                if (!item) return null;
                                return (
                                    <CommandItem key={item.value} onSelect={() => toggleValue(item.value)}>
                                        <span className="mr-2 w-4">
                                            {selectedValues.includes(item.value) ? (
                                                <Check className="h-4 w-4" />
                                            ) : (
                                                <div className="h-4 w-4" />
                                            )}
                                        </span>
                                        {item.label}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
