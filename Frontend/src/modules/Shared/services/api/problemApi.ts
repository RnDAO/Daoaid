import { IProblem } from "@modules/Shared/interfaces";
import axiosInstance from "@modules/Shared/lib/axiosInstance";

export const getProblemsList = async () => {
  const res = await axiosInstance({
    // url of the api endpoint (can be changed)
    url: "problems/",
    method: "GET",
  });

  return res;
};

export const getUpVotes = async (problem: IProblem) => {
  const res = await axiosInstance({
    // url of the api endpoint (can be changed)
    url: `problems/${problem._id}/upvotes`,
    method: "GET",
  });
  // handle success
  return res;
  // setUpVotes(res.data.data.upvotes);
  //checkUserVote(res.data.data.upvotes);
};

export const deleteUpvote = async (problem: IProblem) => {
  try {
    const res = await axiosInstance({
      // url of the api endpoint (can be changed)
      url: `problems/${problem._id}/remove-upvote`,
      method: "DELETE",
    });
    return true;
  } catch (error) {
    return false;
  }
};
export const addUpvote = async (problem: IProblem) => {
  try {
    const res = await axiosInstance({
      // url of the api endpoint (can be changed)
      url: `problems/${problem._id}/create-upvote`,
      method: "POST",
    });
    return true;
  } catch (error) {
    return false;
  }
};
