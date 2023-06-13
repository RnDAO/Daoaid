import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

//icons
import { toast } from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";

//interfaces
import { IProblem, IProblemVote } from "@modules/Shared/interfaces";
import { Link } from "react-router-dom";

//store
import { useAuthStore, useProblemStore } from "@modules/Shared/store";

//services
import {
  addProblemUpvote,
  deleteProblemUpvote,
  getProblemUpVotes,
} from "@modules/Shared/services/api";

interface IProp {
  problem: IProblem;
}

export const DashProblems = ({ problem }: IProp) => {
  const [voted, setVote] = useState(false);
  const [upVotes, setUpVotes] = useState([]);
  const store = useProblemStore();
  const authStore = useAuthStore();

  const queryClient = useQueryClient();

  //reload vote counts query
  const reloadVoteCount = () => {
    queryClient.invalidateQueries("upvotes");
  };

  const checkUserVote = (votes: IProblemVote[]) => {
    //@ts-ignore
    if (!authStore.user.id) return setVote(false);
    let match = votes.filter((vote: IProblemVote) => {
      //@ts-ignore
      return vote.upvotedBy._id == authStore.user.id;
    });

    match.length > 0 ? setVote(true) : setVote(false);
  };

  const {} = useQuery(["upvotes", problem], () => getProblemUpVotes(problem), {
    staleTime: 2000,
    onSuccess: (data) => {
      //set problem store
      //@ts-ignore
      setUpVotes(data.data.data.upvotes);
      checkUserVote(data.data.data.upvotes);
    },
  });

  const handleUpVote = async () => {
    //@ts-ignore
    if (!authStore.user.walletAddress) {
      toast.error("Please connect a wallet.");
      return;
    }
    if (await addProblemUpvote(problem)) {
      reloadVoteCount();
      setVote(true);
    } else {
      // handle error
      toast.error("oops! an error occured , try again later.");
    }
  };

  const removeUpVote = async () => {
    //@ts-ignore
    if (!authStore.user.id) return;
    if (await deleteProblemUpvote(problem)) {
      reloadVoteCount();
      setVote(false);
    } else {
      // handle error
      toast.error("oops! an error occured , try again later.");
    }
  };

  return (
    <div className="h-auto flex mb-2 ">
      <div className="w-[5%] pt-[22px] h-full max-w-8 ">
        {voted && (
          <div className="h-[50%]   flex items-end justify-end font-semibold text-sm text-rnBlack mb-0.5">
            <button
              type="button"
              onClick={removeUpVote}
              className="bg-green-400 text-white  rounded-sm h-fit w-6 px-1"
            >
              <AiOutlineCheck />
            </button>
          </div>
        )}

        {!voted && (
          <div
            className={`h-[50%]    flex items-end justify-end font-semibold text-sm text-rnBlack mb-0.5  `}
          >
            <button
              type="button"
              onClick={handleUpVote}
              className="bg-white rounded-sm h-fit w-6 px-1"
            >
              <IoIosArrowUp />
            </button>
          </div>
        )}
        <div className="h-[50%] text-textGray  flex justify-end items-start  text-xs">
          <span className="rounded-sm h-fit w-6 px-1 bg-white text-xs text-center">
            {upVotes.length}
          </span>
        </div>
      </div>
      <div className="w-[95%] ml-1 bg-white flex hover:shadow-lg shadow-gray-500  rounded-md h-auto px-4">
        <div className="w-[80%] h-auto flex flex-col">
          <div className="h-[41px]    flex items-end font-semibold text-sm text-rnBlack">
            <span>
              {problem.title.charAt(0).toUpperCase() + problem.title.slice(1)}
            </span>
          </div>
          <div className="h-auto min-h-[41px] pb-2 pr-2 text-textGray  flex items-start  text-xs">
            {/* {problem.description.substr(0, 160)}{" "}
            {problem.description.length > 160 ? ". . ." : ""} */}
            {problem.description}
          </div>
        </div>
        <div className="w-[20%] h-full flex items-center justify-center ">
          <Link to="/proposal">
            <button
              type="button"
              onClick={() => store.setFocusedProblems([problem])}
              className="bg-blueShade text-btnBlue text-xs font-semibold rounded-lg border-blueShadeBorder py-1 cursor-pointer px-2"
            >
              Add a solution
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
