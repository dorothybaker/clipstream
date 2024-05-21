import moment from "moment";
import { useRef, useState } from "react";
import formatNumber from "../utils/formatNumber";

function RecommendCard({ recommend }) {
  const videoEl = useRef(null);
  const [duration, setDuration] = useState(0);

  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    if (!video) return;

    setDuration(video.duration);
  };
  return (
    <div className="flex sm:items-center gap-2 sm:flex-row flex-col">
      <div className="flex-1">
        <video
          src={recommend.videoUrl}
          ref={videoEl}
          onLoadedMetadata={handleLoadedMetadata}
          style={{ display: "none" }}
        />
        <div className="relative">
          <img
            src={recommend.thumbnail}
            alt=""
            className="lg:h-[115px] sm:h-[140px] h-[170px] w-full object-cover sm:rounded-lg"
          />
          {duration > 0 && (
            <span className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-1 text-xs font-normal rounded-md">
              {duration <= 3599
                ? moment.utc(duration * 1000).format("mm:ss")
                : moment.utc(duration * 1000).format("HH:mm:ss")}
            </span>
          )}
        </div>
      </div>
      <div className="lg:flex-1 flex-2 flex flex-col gap-1 sm:px-0 px-2">
        <h2 className="text-[15px] text-gray-300 line-clamp-2">
          {recommend.title}
        </h2>
        <div className="flex sm:items-start items-center justify-between sm:gap-1 gap-3 sm:flex-col flex-row">
          <span className="text-sm text-gray-300">
            {recommend.userId.username}
          </span>
          <p className="text-sm font-normal text-gray-400">
            {formatNumber(recommend.views)} views &middot;{" "}
            {moment(recommend.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecommendCard;
