import { useState, useMemo, useCallback, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Search as SearchIcon } from "lucide-react";

// --- SHADCN/UI Imports ---
// We now only need the Select component and its parts
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
// We still need cn for styling.
import { cn } from "@/lib/utils";

/**
 * @typedef {Object} City
 * @property {string} asciiname - The city name used for display and key.
 * @property {number} lat - Latitude.
 * @property {number} lng - Longitude.
 * // Add any other properties your city object has
 */

/**
 * Select component for choosing a city from the store.
 * Replaces the Leva panel control with a standard application Select dropdown.
 *
 * @param {Object} props
 * @param {string} props.theme - (Currently unused but kept for compatibility)
 */
export default function Search() {
    // State management

    const cities = useStore((s) => s.cities);
    const search = useStore((s) => s.search);
    const setCityToSearch = useStore((s) => s.setCityToSearch);

    // The currently selected value (the asciiname string)
    const [value, setValue] = useState(search?.asciiname || "");

    // UseMemo to prepare city data: Options array and a lookup map.
    const { cityOptions, cityMap } = useMemo(() => {
        if (!cities || !Array.isArray(cities)) {
            return { cityOptions: [], cityMap: new Map() };
        }

        const sortedCities = [...cities].sort((a, b) =>
            a.asciiname.localeCompare(b.asciiname)
        );

        const options = [];
        const map = new Map();

        sortedCities.forEach((d) => {
            const ascii = d.asciiname;
            options.push({
                label: ascii,
                key: d.geoid,
                value: ascii,
            });
            map.set(ascii, d);
        });

        return { cityOptions: options, cityMap: map };
    }, [cities]);

    const handleChange = useCallback(
        (newAsciiname) => {
            setValue(newAsciiname);

            const fullCityObject = cityMap.get(newAsciiname);

            if (fullCityObject) {
                setCityToSearch(fullCityObject);
            } else {
                setCityToSearch(null);
            }
        },
        [cityMap, setCityToSearch]
    );

    // Update the local state when the global search state changes externally
    useEffect(() => {
        if (search?.asciiname !== value) {
            setValue(search?.asciiname || "");
        }
    }, [search]);

    return (
        <Select
            value={value}
            onValueChange={handleChange}
        >
            <SelectTrigger className="w-full font-normal text-left">
                {/* Visual indicator for search context */}
                <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />

                {/* Display the current selection or the placeholder */}
                <SelectValue placeholder="Search City..." />
            </SelectTrigger>
            <SelectContent className="w-full max-h-80">
                {/* Render the city options inside the SelectContent */}
                {cityOptions.map((city) => (
                    <SelectItem
                        key={city.key}
                        value={city.value}
                    >
                        {city.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
