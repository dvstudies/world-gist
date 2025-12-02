import * as THREE from "three";
import { create } from "zustand";

export const useStore = create((set, get) => ({
    landing: true,
    cities: null,
    umap: null,
    sprites: [],
    clusterData: null,
    centroid: null,
    bbox: null,
    search: null,
    timestep: 49,
    maxTimestep: 49,
    seed: 2333,
    active: null,
    visStyle: null,

    setTimestep: (timestep) => {
        const umap = get().umap;
        const search = get().search;

        if (timestep) {
            set({ timestep });

            if (search) {
                const generation = umap.filter((p) => p.geoid === search.geoid);
                const newSearch = generation.find(
                    (p) => p.timestep === timestep
                );
                console.log("time", timestep, newSearch);
                set({ search: newSearch });
            }
        }
    },

    setCityToSearch: (city) => {
        const umap = get().umap;
        const timestep = get().timestep;

        if (city) {
            const generation = umap.filter((p) => p.geoid === city.geoid);
            const search = generation.find((p) => p.timestep === timestep);
            set({ search });
        } else {
            set({ search: null });
        }
    },

    setSpriteToSearch: (sprite) => {
        set({
            search: sprite,
            timestep: sprite ? sprite.timestep : get().timestep,
        });
    },

    updateSettings: (key, partial) =>
        set((state) => ({
            [key]: {
                ...state[key],
                ...partial,
            },
        })),

    imgViewerSettings: {
        timestep: 49,
        search: null,
    },

    setSearch: (search, timestep) => {
        const umap = get().umap;
        const getCityByGeoId = get().getCityByGeoId;

        if (search?.timestep) {
            console.log("dd");
            set({ search });
            get().updateSettings("imgViewerSettings", { search });
        } else {
            console.log("not with tm");
            const tm = get().timestep;
            const searchAug = umap.find(
                (c) => c.geoid === search.geoid && c.timestep === tm
            );
            set({ search: searchAug });
            get().updateSettings("imgViewerSettings", { search: searchAug });
        }
    },

    setTimeStep: (timestep) => {
        set({ timestep });
        get().updateSettings("imgViewerSettings", { timestep });
    },

    getCityByGeoId: (id) => {
        const cities = get().cities;
        return cities.find((c) => c.geoid === id);
    },

    getGeneration: (geoid) => {
        const umap = get().umap;
        return umap
            .filter((p) => p.geoid === geoid)
            .sort((a, b) => a.timestep - b.timestep);
    },

    getPath: (geoid, timestep, asciiname) => {
        const seed = get().seed;
        const maxTimestep = get().maxTimestep;
        const last = timestep === maxTimestep;

        const folder = last ? "/last" : "/intermediates";
        const tm = timestep.toString().padStart(3, "0");

        const path = last
            ? `${folder}/${asciiname}_${geoid}_${seed}.png`
            : `${folder}/${geoid}_${seed}_${tm}.png`;

        return path;
    },

    fitToPoint: (point, bounds) => {
        const RADIUS = 4;
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(RADIUS),
            new THREE.MeshBasicMaterial({ visible: false })
        );
        sphere.position.copy(point);
        bounds.refresh(sphere).fit();
    },

    fitToGeneration: (geoid, bounds) => {
        const getGeneration = get().getGeneration;
        const generation = getGeneration(geoid);

        const box = new THREE.Box3();
        generation.forEach((pt) => {
            // box.expandByPoint(new THREE.Vector3(pt.x, pt.y, pt.z));

            const RADIUS = 4;
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(RADIUS),
                new THREE.MeshBasicMaterial({ visible: false })
            );
            sphere.position.copy(new THREE.Vector3(pt.x, pt.y, pt.z));

            box.expandByObject(sphere);
        });
        bounds.refresh(box).fit();
    },

    spriteInteractions: {
        handleClick: (e, index, bounds) => {
            const sprites = get().sprites;
            const fitToPoint = get().fitToPoint;
            const fitToGeneration = get().fitToGeneration;
            e.stopPropagation();
            const sprite = sprites[index];

            // fitToPoint(sprite, bounds);
            fitToGeneration(sprite.geoid, bounds);

            get().setSpriteToSearch(sprite);
        },

        handleMiss: (bounds) => {
            bounds.refresh().fit();
            get().setSpriteToSearch(null);
        },
    },
}));
