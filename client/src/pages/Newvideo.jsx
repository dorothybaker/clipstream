import { useEffect, useRef, useState } from "react";
import Menu from "../components/Menu";
import UploadVideo from "../components/UploadVideo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../utils/makeRequest";
import { useNavigate } from "react-router-dom";

function Newvideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [thumbnail, setThumbnail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

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
          setThumbnail(result.info.secure_url);
        }
      }
    );
  }, []);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ title, description, thumbnail, videoUrl, tags }) => {
      const listTags = tags.split(",");

      try {
        const res = await API.post("/videos/create", {
          title,
          description,
          thumbnail,
          videoUrl,
          tags: listTags,
        });

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      if (data) {
        navigate("/");
        queryClient.invalidateQueries({ queryKey: ["random"] });
      }
    },
  });

  const [error, setError] = useState("");
  const handleUpload = () => {
    if (!title || !description || !videoUrl || !thumbnail || !tags) {
      setError("All fields are required!");
      return;
    }

    setError("");
    mutate({ title, description, videoUrl, thumbnail, tags });
  };

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
  }, []);

  return (
    <div className="flex items-start sm:gap-3 sm:flex-row flex-col">
      <div className="lg:w-[270px] sm:w-[100px] w-full h-[50px] sm:h-[calc(100vh-50px)] sm:sticky top-[50px]">
        <Menu />
      </div>
      <div className="flex-1 w-full sm:border-none border-t border-white/10">
        <div className="flex items-center justify-center sm:h-[calc(100vh-50px)] overflow-y-auto h-full">
          <div className="sm:w-[550px] flex flex-col gap-2 w-full bg-white/5 mx-auto p-4">
            <h1 className="text-2xl">Upload a new video</h1>
            {error && <span className="text-sm text-red-500">{error}</span>}
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpload();
              }}
            >
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Title</label>
                <input
                  type="text"
                  className="h-11 bg-[#0f0f0f]/40 px-3 rounded-md outline-none w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Description</label>
                <textarea
                  className="h-24 bg-[#0f0f0f]/40 p-2 resize-none rounded-md outline-none w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Tags</label>
                <input
                  type="text"
                  className="h-11 bg-[#0f0f0f]/40 px-3 rounded-md placeholder:text-sm outline-none w-full"
                  placeholder="Seperate the tags with commas."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Thumbnail Image</label>
                <button
                  type="button"
                  className={`${
                    thumbnail ? "text-green-500" : "text-primary"
                  } text-[15px] uppercase w-max h-10`}
                  onClick={() => widgetRef.current?.open()}
                >
                  {thumbnail
                    ? "thumbnail image uploaded"
                    : "upload Thumbnail image"}
                </button>
              </div>
              <UploadVideo videoUrl={videoUrl} setVideoUrl={setVideoUrl} />
              <button
                type="submit"
                className={`${
                  isPending
                    ? "bg-primary/40 cursor-not-allowed text-gray-500"
                    : "bg-primary cursor-pointer text-white"
                } h-11 uppercase`}
              >
                upload new video
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newvideo;
