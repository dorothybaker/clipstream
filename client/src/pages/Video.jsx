import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Comments from "../components/Comments";
import RecommendCard from "../components/RecommendCard";
import formatNumber from "../utils/formatNumber";
import { GoDownload, GoShare, GoThumbsdown, GoThumbsup } from "react-icons/go";
import { useParams } from "react-router-dom";
import { API } from "../utils/makeRequest";
import { useEffect } from "react";
import moment from "moment";

function Video() {
  const { data: user } = useQuery({ queryKey: ["authUser"] });
  const { id } = useParams();

  const {
    data: video,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["singlevideo", id],
    queryFn: async () => {
      try {
        const res = await API.get(`/videos/${id}`);
        if (res.status === 200) {
          const data = res.data;

          await API.put(`/videos/view/${id}`, {});

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [id, refetch, user]);

  const isMyVideo = user?._id === video?.userId._id;

  const queryClient = useQueryClient();
  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await API.post(`/users/subscribe/${id}`, {});
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
        queryClient.invalidateQueries({ queryKey: ["singlevideo", id] });
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      }
    },
  });

  const { mutate: like, isPending: processing } = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await API.post(`/videos/like/${id}`, {});
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
        queryClient.invalidateQueries({ queryKey: ["singlevideo", id] });
      }
    },
  });

  const subscribed = user?.subscribingTo.includes(video?.userId._id);

  const { data: recommended, isLoading: loading } = useQuery({
    queryKey: ["recommended"],
    queryFn: async () => {
      try {
        const res = await API.get(`/videos/tags`);

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
  }, []);

  return (
    <div className="sm:px-6 sm:py-4 sm:pb-4 pb-1 flex items-start sm:gap-4 gap-3 max-w-[1400px] w-full mx-auto lg:flex-row flex-col">
      <div className="sticky top-[50px] z-20 block sm:hidden w-full">
        <video
          src={video?.videoUrl}
          controls
          className="h-full sm:rounded-2xl w-full sm:hidden block"
        ></video>
      </div>
      <div className="flex-1 flex flex-col gap-2 w-full">
        <div className="sm:block hidden">
          <video
            src={video?.videoUrl}
            controls
            className="h-full sm:rounded-2xl w-full"
          ></video>
        </div>
        <div className="flex flex-col gap-2 px-2">
          <h3 className="sm:text-xl text-base font-normal">{video?.title}</h3>
          <div className="flex sm:items-center items-start gap-2 justify-between sm:flex-row flex-col">
            <p className="text-sm text-gray-300">
              {formatNumber(video?.views)} views &middot;{" "}
              {moment(video?.createdAt).format("Do MMMM, YYYY")}
            </p>
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-1 text-sm"
                disabled={processing}
              >
                <GoThumbsup size={20} onClick={() => like(video?._id)} />
                <span>{formatNumber(video?.likes.length, 0)}</span>
              </button>
              <button className="flex items-center gap-1 text-sm">
                <GoThumbsdown size={20} />
                <span>Dislike</span>
              </button>
              <button className="flex items-center gap-1 text-sm">
                <GoShare size={20} />
                <span>Save</span>
              </button>
              <button className="flex items-center gap-1 text-sm">
                <GoDownload size={20} />
                <span>Download</span>
              </button>
            </div>
          </div>
          <div className="h-px bg-white/20 w-full" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <div className="w-[35px]">
                    <img
                      src={
                        video?.userId.image ||
                        "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.avif"
                      }
                      alt=""
                      className="w-[35px] h-[35px] object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-sm">{video?.userId.username}</h2>
                  <span className="text-sm text-gray-500">
                    {formatNumber(video?.userId.subcribers.length)} subscribers
                  </span>
                </div>
              </div>
              {user && !isMyVideo && (
                <button
                  className={`text-sm uppercase ${
                    isPending
                      ? "bg-primary/40 text-gray-400"
                      : "bg-primary text-white"
                  }  px-3 py-2 rounded-lg`}
                  onClick={() => subscribe(video?.userId._id)}
                  disabled={isPending}
                >
                  {subscribed ? "subscribed" : " Subscribe"}
                </button>
              )}
            </div>
            <details>
              <summary className="text-xs uppercase text-gray-100 cursor-pointer">
                show more
              </summary>
              <p className="text-sm text-gray-400 mt-1">{video?.description}</p>
            </details>
          </div>

          <Comments id={video?._id} />
        </div>
      </div>
      <div className="lg:w-[410px] w-full lg:sticky top-[66px]">
        <div className="w-full flex flex-col gap-4">
          {recommended?.map((recommend) => (
            <RecommendCard key={recommend._id} recommend={recommend} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Video;
