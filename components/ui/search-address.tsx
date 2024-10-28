"use client";
import { CommandLoading } from "cmdk";
import type { RawResult } from "leaflet-geosearch/dist/providers/bingProvider.js";
import type { SearchResult } from "leaflet-geosearch/dist/providers/provider.js";
import { useState } from "react";

import { cn } from "@/lib/utils/core/cn";
import { useSearchAddress } from "@/components/hooks/use-search-address";
import Check from "@/components/icons/check";
import ChevronsUpDown from "@/components/icons/chevrons-up-down";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SearchAddressProps {
  onSelectLocation: (item: SearchResult<RawResult> | null) => void;
}

export function SearchAddress({ onSelectLocation }: SearchAddressProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { query, results, loading, handleSearch, selectedItem, setSelectedItem } =
    useSearchAddress();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-80 justify-between truncate"
        >
          <p className="truncate">
            {selectedItem
              ? `${selectedItem.label} (${selectedItem.raw.entityType})`
              : "Select place..."}
          </p>

          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput
            placeholder="Search the place..."
            onValueChange={(value) => handleSearch(value)}
            className="w-full"
          />
          <CommandList>
            {loading ? (
              <CommandLoading>
                <CommandEmpty>Type to search</CommandEmpty>
              </CommandLoading>
            ) : Object.keys(results).length > 0 ? (
              Object.entries(results).map(([type, items]) => (
                <CommandGroup
                  key={type}
                  heading={type.charAt(0).toUpperCase() + type.slice(1)}
                >
                  {items.map((item, index) => (
                    <CommandItem
                      key={index}
                      value={item.label}
                      onSelect={(currentValue: string) => {
                        const item = results[type]?.find(
                          (item) => item.label === currentValue,
                        );
                        setValue(currentValue === value ? "" : currentValue);
                        setSelectedItem(item ?? null);
                        onSelectLocation(item ?? null);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === item.label ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))
            ) : (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
