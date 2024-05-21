import { GoPaperAirplane } from "react-icons/go";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../utils/makeRequest";
import { useEffect, useState } from "react";

function Comments({ id }) {
  const {
    data: comments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      try {
        const res = await API.get(`/videos/comments/${id}`);

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (text) => {
      try {
        const res = await API.post(`/videos/comment/${id}`, { desc: text });

        if (res.status === 200) {
          const data = res.data;

          setText("");
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["comments", id] });
      }
    },
  });

  const handleComment = () => {
    if (!text) return;

    mutate(text);
  };

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  return (
    <>
      <div className="flex items-end gap-2 w-full h-10">
        <input
          type="text"
          placeholder="Write a comment"
          className="py-0.5 w-full outline-none bg-transparent border-b border-white/10 text-[15px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => handleComment()} disabled={isPending}>
          <GoPaperAirplane size={16} />
        </button>
      </div>
      <details className="lg:hidden block">
        <summary className="text-xs uppercase text-gray-100 cursor-pointer">
          view all comments
        </summary>
        <div className="flex flex-col gap-2 mt-2">
          {comments?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      </details>
      <div className="lg:flex hidden flex-col gap-2 mt-2">
        {comments?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </>
  );
}

export default Comments;
