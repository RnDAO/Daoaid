import { useState } from "react";

//icons
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";

//interfaces
import {
  ISolution,
  ISolutionVote,
} from "@modules/Shared/interfaces/solutionInterface";

//store
import { useSolutionStore } from "@modules/Shared/store/solutionStore";
import { useAuthStore } from "@modules/Shared/store";
import { toast } from "react-hot-toast";
import {
  addSolutionUpvote,
  deleteSolutionUpvote,
  getSolutionUpVotes,
} from "@modules/Shared/services/api";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

interface IProp {
  solution: ISolution;
}

export const Solutions = ({ solution }: IProp) => {
  const [voted, setVote] = useState(false);
  const [upVotes, setUpVotes] = useState([]);

  const store = useSolutionStore();
  const authStore = useAuthStore();

  const queryClient = useQueryClient();

  //reload vote counts query
  const reloadVoteCount = () => {
    queryClient.invalidateQueries("solutionUpVotes");
  };

  const checkUserVote = (votes: ISolutionVote[]) => {
    //@ts-ignore
    if (!authStore.user.id) return setVote(false);
    let match = votes.filter((vote) => {
      //@ts-ignore
      return vote.upvotedBy._id == authStore.user.id;
    });

    match.length > 0 ? setVote(true) : setVote(false);
  };

  const {} = useQuery(
    ["solutionUpVotes", solution],
    () => getSolutionUpVotes(solution),
    {
      staleTime: 2000,
      onSuccess: (data) => {
        //set problem store
        //@ts-ignore
        setUpVotes(data.data.data.upvotes);
        checkUserVote(data.data.data.upvotes);
      },
    }
  );

  const handleUpVote = async () => {
    //@ts-ignore
    if (!authStore.user.walletAddress) {
      toast.error("Please connect a wallet.");
      return;
    }
    if (await addSolutionUpvote(solution)) {
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
    if (await deleteSolutionUpvote(solution)) {
      reloadVoteCount();
      setVote(false);
    } else {
      // handle error
      toast.error("oops! an error occured , try again later.");
    }
  };

  return (
    <div className="h-auto flex mb-2 ">
      <div className="w-[10%] h-full pt-[21px] max-w-8 ">
        {voted && (
          <div
            className={` h-[50%]  flex items-end justify-end font-semibold text-sm text-rnBlack mb-0.5  `}
          >
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
      <Link
        to={`proposal/${solution._id}`}
        onClick={() => {
          store.setSelectedsolution(solution);
          //setGlobalState("comments", []);
        }}
      >
        <div className="w-[90%] h-auto ml-1 bg-white hover:shadow-lg shadow-gray-500 flex flex-col  rounded-md  px-4">
          <div className="h-[41px]   flex items-end font-semibold text-sm text-rnBlack">
            <span>
              {solution.title.charAt(0).toUpperCase() + solution.title.slice(1)}
            </span>
          </div>
          <div className="h-auto min-h-[41px] pb-2 text-textGray  flex items-start  text-xs">
            <span>
              {solution.description.substr(0, 100)}{" "}
              {solution.description.length > 100 ? ". . ." : ""}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
