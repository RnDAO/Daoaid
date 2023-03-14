import { useEffect, useState, useRef } from "react";
import { truncate, useGlobalState } from "../store";
import { filterComments } from "../utils/comments";
import ReactTimeAgo from "react-time-ago";
import { Oval } from "react-loading-icons";

const ProposalInfoItems = () => {
  const [comments] = useGlobalState("comments");
  const [isLoading, setIsLoading] = useState(true);

  const [descriptionComments, setDescriptionComments] = useState([]);

  const bottomRef = useRef(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [descriptionComments]);

  useEffect(() => {
    setDescriptionComments(filterComments("description", comments));
    setIsLoading(false);
  }, [comments]);
  return (
    <div className="col-span-1 overflow-y-auto">
      {isLoading ? (
        <div className=" w-fit h-full flex items-center m-auto">
          <Oval strokeWidth={4} stroke="#bbbbbb" fill="transparent" />
        </div>
      ) : (
        descriptionComments.map((comment, id) => (
          <ProblemsCard comment={comment} key={id} />
        ))
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ProposalInfoItems;

const ProblemsCard = ({ comment }) => {
  return (
    <div className=" h-auto max-h-60 w-full rounded-md bg-white p-4 mb-3">
      <h4 className="text-sm font-semibold bg-highlight w-fit leading-6 px-2 rounded-sm">
        {comment.title}
      </h4>
      <div className="flex justify-between items-center pt-3">
        <h4 className="text-sm font-bold text-rnB">
          {truncate(comment.user, 4, 4, 11)}
        </h4>
        {comment.createdAt && (
          <small className="text-xs text-rn">
            <ReactTimeAgo date={comment.createdAt} locale="en-US" />
          </small>
        )}
      </div>
      <p className="text-sm text-textGray py-2">{comment.comment}</p>
    </div>
  );
};
