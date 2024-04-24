import {
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/src/pages/server/uploadthing";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();