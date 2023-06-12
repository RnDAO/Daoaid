import { ISolution } from "@modules/Shared/interfaces/solutionInterface";
import axiosInstance from "@modules/Shared/lib/axiosInstance";

export const getSolutionsList = async () => {
  const res = await axiosInstance({
    // url of the api endpoint (can be changed)
    url: "solutions/",
    method: "GET",
  });

  return res;
};

export const getSolutionUpVotes = async (solution: ISolution) => {
  const res = await axiosInstance({
    // url of the api endpoint (can be changed)
    url: `solutions/${solution._id}/upvotes`,
    method: "GET",
  });
  // handle success
  return res;
  // setUpVotes(res.data.data.upvotes);
  //checkUserVote(res.data.data.upvotes);
};

export const deleteSolutionUpvote = async (solution: ISolution) => {
  try {
    await axiosInstance({
      // url of the api endpoint (can be changed)
      url: `solutions/${solution._id}/remove-upvote`,
      method: "DELETE",
    });
    return true;
  } catch (error) {
    return false;
  }
};
export const addSolutionUpvote = async (solution: ISolution) => {
  try {
    await axiosInstance({
      // url of the api endpoint (can be changed)
      url: `solutions/${solution._id}/create-upvote`,
      method: "POST",
    });
    return true;
  } catch (error) {
    return false;
  }
};
