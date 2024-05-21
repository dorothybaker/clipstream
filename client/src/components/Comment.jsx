import moment from "moment";

function Comment({ comment }) {
  return (
    <div className="flex items-start gap-2">
      <div>
        <div className="w-[35px]">
          <img
            src={
              comment.userId.image ||
              "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.avif"
            }
            alt=""
            className="w-[35px] h-[35px] object-cover rounded-full"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-5 text-sm">
          <span className="text-gray-400">{comment.userId.fullName}</span>
          <span className="text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-sm text-gray-300">{comment.desc}</p>
      </div>
    </div>
  );
}

export default Comment;
