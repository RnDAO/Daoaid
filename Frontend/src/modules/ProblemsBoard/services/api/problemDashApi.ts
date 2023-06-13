import axiosInstance from "@modules/Shared/lib/axiosInstance";

//get problems based on search parameter
export const getAutoProblemSearch = async (text: string) => {
  const res = await axiosInstance({
    // url of the api endpoint (can be changed)
    url: `problems?search=${text}`,
    method: "GET",
  });
  // handle success
  // console.log(res.data.data.problem);
  //setAutoProblemSearchResult(res.data.data.problems);

  return res;
};

//get problems based on search parameter
export const getProblemSearch = async (query: string | null) => {
  const res = await axiosInstance({
    // url of the api endpoint (can be changed)
    url: `problems?search=${query}`,
    method: "GET",
  });
  return res;
};

//add problem
export const addProblem = async (data: {
  title: string;
  description: string;
}) => {
  try {
    await axiosInstance({
      url: "problems/",
      method: "POST",
      data: data,
    });

    return true;
  } catch (error) {
    return false;
  }
};
