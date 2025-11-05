import { LevaPanel, useCreateStore, useControls } from "leva";
import { useStore } from "../store/useStore";
import { useMemo } from "react";
import { TfiSearch } from "react-icons/tfi"; // lightweight icon

export default function Search({ theme }) {
    const { cities, search, setSearch } = useStore();
    const store = useCreateStore();

    const cityOptions = useMemo(() => {
        if (!cities || !Array.isArray(cities)) return [];

        return cities.map((d) => d.asciiname).sort();
    }, [cities]);

    useControls(
        () => ({
            citySelect: {
                label: (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                        }}
                    >
                        <TfiSearch />
                        <span>Search</span>
                    </div>
                ),
                value: "",
                options: cityOptions,
                onChange: (v) => setSearch(v),
            },
        }),
        { store }
    );

    return (
        <LevaPanel
            fill
            // oneLineLabels
            titleBar={false}
            hideCopyButton
            store={store}
            theme={theme}
        />
    );
}
