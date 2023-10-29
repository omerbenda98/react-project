import { useEffect, useState } from "react";
import axios from "axios";

const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Cleanup function to revoke the blob URL when the component is unmounted
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Generate a preview URL for the selected file
    const objectURL = URL.createObjectURL(selectedFile);
    setPreview(objectURL);
  };

  const handleUpload = async (updateInputState) => {
    let newImageUrl = "";

    if (file) {
      const formData = new FormData();
      formData.append("profilePic", file);

      // Make an axios POST request to upload the image
      try {
        const response = await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        newImageUrl = response.data.imageUrl;
        updateInputState((prev) => ({ ...prev, imageUrl: newImageUrl }));
        // updateUserInfo((prevState) => ({
        //   ...prevState,
        //   imageUrl: newImageUrl,
        // }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    return newImageUrl;
  };

  return {
    file,
    preview,
    handleFileChange,
    handleUpload,
  };
};

export default useFileUpload;
