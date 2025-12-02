import { create } from "zustand";
import * as THREE from "three";
import { useStore } from "./useStore";

export const useLoader = create((set, get) => ({
    files: {
        cities: "./cities.json",
        umap: "./umap.json",
    },
    progress: 0,

    totalToLoad: 0,
    loadedCount: 0,
    isLoading: false,

    isDataReady: false,
    isRenderReady: false,

    hasError: false,

    loadRender: async () => {
        set({ isLoading: true });
        try {
            await get().loadTextures();
            set({ isRenderReady: true });
        } catch (err) {
            console.error(err);
            set({ hasError: true });
        } finally {
            set({ isLoading: false });
        }
    },

    loadData: async () => {
        set({ isLoading: true });
        try {
            const jsons = await get().loadJSONs();
            await get().processUmap(jsons);
            set({ isDataReady: true });
        } catch (err) {
            console.error(err);
            set({ hasError: true });
        } finally {
            set({ isLoading: false });
        }
    },

    loadJSONs: async () => {
        const files = get().files;

        const entries = Object.entries(files);
        set({ totalToLoad: entries.length, loadedCount: 0 });

        const output = {};

        for (const [key, file] of entries) {
            const res = await fetch(file);
            const json = await res.json();

            output[key] = json.data;

            set((s) => ({
                loadedCount: s.loadedCount + 1,
                progress: ((s.loadedCount + 1) / s.totalToLoad) * 100,
            }));
        }

        return output;
    },

    processUmap: async ({ cities, umap }) => {
        const getPath = useStore.getState().getPath;
        const maxTimestep = useStore.getState().maxTimestep;
        const seed = 2333;

        let sumX = 0;
        let sumY = 0;
        let sumZ = 0;

        let minX = Infinity,
            maxX = -Infinity;
        let minY = Infinity,
            maxY = -Infinity;
        let minZ = Infinity,
            maxZ = -Infinity;

        const processed = umap.map((pt) => {
            sumX += pt.x;
            sumY += pt.y;
            sumZ += pt.z;

            if (pt.x < minX) minX = pt.x;
            if (pt.x > maxX) maxX = pt.x;
            if (pt.y < minY) minY = pt.y;
            if (pt.y > maxY) maxY = pt.y;
            if (pt.z < minZ) minZ = pt.z;
            if (pt.z > maxZ) maxZ = pt.z;

            const city = cities.find((c) => c.geoid === pt.geoid);
            const path = getPath(pt.geoid, pt.timestep, city.asciiname);

            return {
                ...pt,
                ...city,
                path: path,
                last: pt.timestep === maxTimestep,
                // active: pt.timestep === maxTimestep,
                active: false,
                texture: null,
            };
        });

        const n = umap.length;
        const centroid = {
            x: sumX / n,
            y: sumY / n,
            z: sumZ / n,
        };

        const bbox = {
            min: [minX, minY, minZ],
            max: [maxX, maxY, maxZ],
            size: [maxX - minX, maxY - minY, maxZ - minZ],
            center: [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2],
        };

        useStore.setState({
            cities,
            umap: processed,
            sprites: processed,
            centroid,
            bbox,
        });
    },

    loadTextures: async () => {
        const umap = useStore.getState().umap;
        const loader = new THREE.TextureLoader();

        const activePoints = umap.filter((pt) => pt.active);
        const total = activePoints.length;

        set({ totalToLoad: total, loadedCount: 0 });

        const promises = umap.map((pt) => {
            if (!pt.active) {
                return Promise.resolve(pt);
            }

            return new Promise((resolve) => {
                loader.load(
                    pt.path,
                    (texture) => {
                        set((s) => ({
                            loadedCount: s.loadedCount + 1,
                            progressRender: ((s.loadedCount + 1) / total) * 100,
                        }));

                        resolve({ ...pt, texture });
                    },
                    undefined,
                    () => resolve({ ...pt, texture: null })
                );
            });
        });

        // This keeps full array length and order
        const textures = await Promise.all(promises);

        useStore.setState({ sprites: textures });
    },
}));
