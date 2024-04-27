import { UploadButton } from "@/src/utils/uploadthing";



import ImageUploadData from "@/src/types/ImageUpload";
// Redux Imports
import { setSaveImage } from '@/src/store/saveImageSlice';
import { setLoadingScreen } from '@/src/store/loadingScreenSlice';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function ImageUploaderButton() {
    const dispatch = useDispatch();



    return (
        <main className="flex flex-col items-center justify-between p-24 ">
            <UploadButton
                endpoint="imageUploader"
                // Below represents the upload process
                onClientUploadComplete={(res: any) => {
                    // Do something with the response
                    // console.log("Files: ", res);

                    // Stringify the res object before saving it to Redux
                    const resJSON = JSON.stringify(res);
                    // Find the starting and ending index of the URL
                    const startIndex = resJSON.indexOf('"url":"') + '"url":"'.length;
                    const endIndex = resJSON.indexOf('","serverData"');

                    // Extract the URL using substring
                    const url = resJSON.substring(startIndex, endIndex);

                    dispatch(setSaveImage(url))
                    alert("Upload Completed");


                }}
                onUploadError={(error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
        </main>
    );
}