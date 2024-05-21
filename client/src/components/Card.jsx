import { useRef, useState } from "react";
import moment from "moment";
import formatNumber from "../utils/formatNumber";
import { useNavigate } from "react-router-dom";

function Card({ video }) {
  const videoEl = useRef(null);
  const [duration, setDuration] = useState(0);

  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    if (!video) return;

    setDuration(video.duration);
  };

  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer flex flex-col gap-2"
      onClick={() => navigate(`/videos/${video._id}`)}
    >
      <video
        src={video.videoUrl}
        ref={videoEl}
        onLoadedMetadata={handleLoadedMetadata}
        style={{ display: "none" }}
      />
      <div className="relative">
        <img
          src={video.thumbnail}
          alt=""
          className="sm:h-[205px] h-[190px] w-full object-cover sm:rounded-xl"
        />
        {duration > 0 && (
          <span className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-1 text-xs font-normal rounded-md">
            {duration <= 3599
              ? moment.utc(duration * 1000).format("mm:ss")
              : moment.utc(duration * 1000).format("HH:mm:ss")}
          </span>
        )}
      </div>
      <div className="px-1 flex items-start gap-2">
        <div>
          <div className="w-[35px]">
            <img
              src={video.userId.image}
              alt=""
              className="w-[35px] h-[35px] object-cover rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-normal line-clamp-2">{video.title}</h2>
          <span className="text-sm text-gray-300">{video.userId.username}</span>
          <p className="text-sm font-normal text-gray-400">
            {formatNumber(video.views)} views &middot;{" "}
            {moment(video.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
