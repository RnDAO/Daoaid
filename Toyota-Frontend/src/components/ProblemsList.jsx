import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import instance from "../axiosInstance";
import { setGlobalState, useGlobalState } from "../store";
import { getProblemsList } from "../utils/problems";
import { Oval } from "react-loading-icons";

const ProblemsList = () => {
  const [problems] = useGlobalState("problems");
  const [connectedAddress] = useGlobalState("connectedAddress");
  const [list, setList] = useState(problems);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(problems, list);

  useEffect(() => {
    //set problems in list
    getProblemsList();
    setIsLoading(true);
  }, []);

  useEffect(() => {
    //set problems in list
    setList(problems);
    setIsLoading(false);
  }, [problems]);

  return (
    <div className="col-span-1 h-full overflow-auto ">
      <div className=" flex justify-between items-center h-[10%]  pl-[10.5%]">
        <span className="font-bold text-rnBlack">Problems</span>
        <Link to="/problems">
          <button
            type="button"
            className="bg-btnBlue  text-white text-xs py-1 px-2 cursor-pointer rounded-md font-semibold"
          >
            Add a problem
          </button>
        </Link>
      </div>
      <div className="h-[80%] px-2 overflow-y-auto ">
        {isLoading ? (
          <div className=" w-fit h-full flex items-center m-auto">
            <Oval strokeWidth={4} stroke="#ffffff" fill="transparent" />
          </div>
        ) : list.length > 0 ? (
          list.map((problem, id) => <Problems problem={problem} key={id} />)
        ) : (
          ""
        )}
      </div>
      <div className="h-[10%] flex justify-center items-center text-xs text-btnBlue">
        see all problems
      </div>
    </div>
  );
};

export default ProblemsList;

const Problems = ({ problem }) => {
  const [voted, setVote] = useState(false);
  const [upVotes, setUpVotes] = useState([]);
  const [connectedAddress] = useGlobalState("connectedAddress");
  const [userId] = useGlobalState("userId");

  const upvote = () => {
    setVote(true);
  };

  const handleUpVote = async (e) => {
    e.preventDefault();
    if (!connectedAddress) {
      toast.error("Please connect a wallet.");
      return;
    }
    if (!userId) return;
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `problems/${problem._id}/create-upvote`,
        method: "POST",
      }).then((res) => {
        // handle success
        getUpVotes();
        setVote(true);
      });
    } catch (e) {
      // handle error
      toast.error("oops! an error occured , try again later.");
      console.error(e);
    }
  };

  const removeUpVote = async (e) => {
    e.preventDefault();
    if (!userId) return;
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `problems/${problem._id}/remove-upvote`,
        method: "DELETE",
      }).then((res) => {
        // handle success
        getUpVotes();
        setVote(false);
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };

  const checkUserVote = (votes) => {
    if (!userId) return setVote(false);
    let match = votes.filter((vote) => {
      return vote.upvotedBy._id == userId;
    });

    match.length > 0 ? setVote(true) : setVote(false);
  };

  const getUpVotes = async () => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `problems/${problem._id}/upvotes`,
        method: "GET",
      }).then((res) => {
        // handle success
        setUpVotes(res.data.data.upvotes);
        checkUserVote(res.data.data.upvotes);
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };

  useEffect(() => {
    if (problem) getUpVotes();
  }, [problem, userId]);

  return (
    <div className="h-[82px] flex mb-2 ">
      <div className="w-[10%] max-w-8 ">
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
        to="/proposal"
        onClick={() => setGlobalState("focusedProblems", [problem])}
        className="w-[90%] ml-1 bg-white flex flex-col  rounded-md h-full px-4 hover:shadow-lg shadow-gray-500 "
      >
        <div className="h-[50%]   flex items-end font-semibold text-sm text-rnBlack">
          <span>
            {problem.title.charAt(0).toUpperCase() + problem.title.slice(1)}
          </span>
        </div>
        <div className="h-[50%] text-textGray  flex items-start  text-xs">
          {problem.description.substr(0, 80)}{" "}
          {problem.description.length > 80 ? ". . ." : ""}
        </div>
      </Link>
    </div>
  );
};
