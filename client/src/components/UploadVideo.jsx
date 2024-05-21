import { useEffect, useRef } from "react";

function UploadVideo({ videoUrl, setVideoUrl }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djin7iczh",
        uploadPreset: "r5y9cmqc",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setVideoUrl(result.info.secure_url);
        }
      }
    );
  }, []);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-400">Video URL</label>
      <button
        type="button"
        className={`${
          videoUrl ? "text-green-500" : "text-primary"
        } text-[15px] uppercase w-max h-10`}
        onClick={() => widgetRef.current?.open()}
      >
        {videoUrl ? "video uploaded" : "upload video"}
      </button>
    </div>
  );
}

export default UploadVideo;
