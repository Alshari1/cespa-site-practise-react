async function sha1(text) {
    const buffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

const CLOUDINARY_CLOUD_NAME =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "djcmjuizm";

const CLOUDINARY_UPLOAD_PRESET =
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

const CLOUDINARY_API_KEY =
    import.meta.env.VITE_CLOUDINARY_API_KEY || "689812215252213";

const CLOUDINARY_API_SECRET =
    import.meta.env.VITE_CLOUDINARY_API_SECRET ||
    "GeKRZjaR_vHNxs8RaERjsRGecoA";

async function getCloudinarySignature(params) {
    const sorted = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== "")
        .sort(([a], [b]) => a.localeCompare(b));

    const stringToSign = sorted
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

    const signature = await sha1(
        stringToSign + CLOUDINARY_API_SECRET
    );

    return signature;
}


export async function uploadToCloudinary(file) {
    if (!CLOUDINARY_CLOUD_NAME) {
        throw new Error("Cloudinary cloud name is not configured.");
    }

    const form = new FormData();
    form.append("file", file);

    if (CLOUDINARY_UPLOAD_PRESET) {
        form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    } else {
        const timestamp = Math.floor(Date.now() / 1000);

        const signature = await getCloudinarySignature({ timestamp });

        form.append("api_key", CLOUDINARY_API_KEY);
        form.append("timestamp", timestamp.toString());
        form.append("signature", signature);
    }

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: form,
        }
    );

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Image upload failed: ${body}`);
    }

    const data = await res.json();
    console.log("Cloudinary Response:", data);
    // console.log(data)

    return data.secure_url;
}