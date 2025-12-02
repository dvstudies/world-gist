import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

function generateRandomColor() {
    const hex = Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0");
    return `#${hex}`;
}

export function generateRandomColors(count = 1) {
    const n = Math.max(0, Math.floor(Number(count) || 0));
    return Array.from({ length: n }, generateRandomColor);
}
