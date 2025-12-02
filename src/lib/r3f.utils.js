import * as THREE from "three";

export async function loadDownsampled(path, maxSize = 256) {
    return fetch(path)
        .then((r) => r.blob())
        .then((blob) =>
            createImageBitmap(blob, {
                resizeWidth: maxSize,
                resizeHeight: maxSize,
                resizeQuality: "medium",
            })
        )
        .then((bitmap) => {
            const texture = new THREE.Texture(bitmap);
            texture.needsUpdate = true;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
            return texture;
        });
}
