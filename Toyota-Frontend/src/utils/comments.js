import instance from "../axiosInstance";
import { setComments } from "../store";

//get all problems
const getCommentsList = async (selectedSolution) => {
  try {
    await instance({
      // url of the api endpoint (can be changed)
      url: `solutions/${selectedSolution}/comments`,
      method: "GET",
    }).then((res) => {
      // handle success
      // console.log(res.data.data.problems);
      setComments(res.data.data.comments);
      // console.log(res.data.data.comments);
    });
  } catch (e) {
    // handle error
    console.error(e);
  }
};

//filter comments for each section
const filterComments = (type, comments) => {
  return comments.filter(
    (comment) => comment.type.toUpperCase() == type.toUpperCase()
  );
};

export { getCommentsList, filterComments };
