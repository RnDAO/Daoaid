import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineCheck, AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { Oval } from "react-loading-icons";

//store
import { useProblemStore } from "@modules/Shared/store";
import { useQuery } from "react-query";
import { getProblemsList } from "@modules/Shared/services/api";
import { IProblem } from "@modules/Shared/interfaces";
import { getProblemSearch } from "@modules/ProblemsBoard/services/api/problemDashApi";
import { DashProblems } from "@modules/ProblemsBoard/components/dashProblems";

export const ProblemDashList = () => {
  const store = useProblemStore();
  const [list, setList] = useState(store.problems);
  const [sortedList, setSortedList] = useState<IProblem[]>([]);
  const [sortPattern, setSortPattern] = useState("votes");
  const [isLoading, setIsLoading] = useState(true);
  // console.log(problems, list);
  let [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  const {} = useQuery("problems", getProblemsList, {
    staleTime: 2000,
    onSuccess: (data) => {
      //set problem store
      store.setProblems(data.data.data.problems);
    },
  });
  const {} = useQuery(
    ["problemsSearch", search],
    () => getProblemSearch(search),
    {
      staleTime: 2000,
      onSuccess: (data) => {
        //set problem store
        store.setProblemSearchResult(data.data.data.problems);
      },
    }
  );

  useEffect(() => {
    setIsLoading(true);
    //sort problems based on votes
    if (sortPattern == "votes") {
      let newList = [...list].sort((a, b) => b.upvotes - a.upvotes);

      setSortedList(newList);
      //sort problems based on date
    } else if (sortPattern == "date") {
      let newList = [...list].sort(
        (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
      );

      setSortedList(newList);
    }
    setIsLoading(false);
  }, [list, sortPattern]);

  //   useEffect(() => {
  //     //set problems in list
  //     if (search) {
  //       getProblemSearch(search);
  //       setIsLoading(true);
  //     } else {
  //       getProblemsList();
  //       setIsLoading(true);
  //       setProblemSearchResult([]);
  //     }
  //   }, [search]);

  useEffect(() => {
    //set problems in list with preference to search result
    if (store.problemSearchResult && store.problemSearchResult.length > 0) {
      setList(store.problemSearchResult);
    } else {
      setList(store.problems);
    }
  }, [store.problems, store.problemSearchResult]);

  return (
    <div className="col-span-2 h-full overflow-auto ">
      <div className=" flex justify-between items-center h-[10%]  pl-[5.5%]">
        <div className="w-[50%] flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setSortPattern("votes")}
            className={`${
              sortPattern == "votes"
                ? "bg-rnBlack text-white"
                : " bg-white text-textGray"
            } px-3 py-2  text-xs rounded-full hover:bg-rnBlack hover:text-white `}
          >
            Most voted
          </button>
          <button
            type="button"
            onClick={() => setSortPattern("date")}
            className={`${
              sortPattern == "date"
                ? "bg-rnBlack text-white"
                : " bg-white text-textGray"
            } px-3 py-2  border border-gray-300 text-xs rounded-full hover:bg-rnBlack hover:text-white`}
          >
            Newest
          </button>
        </div>
        <form className="w-[50%] flex justify-end items-center relative">
          <AiOutlineSearch className="pointer-events-none h-5 w-5  absolute top-4 transform -translate-y-1/2 right-2 text-xs text-lowTextGray" />

          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="form-input w-full  text-xs bg-searchGray rounded-full
             py-2 pl-2 pr-8 border border-gray-300 focus:ring-0  focus:outline-none"
          />
        </form>
      </div>
      <div className="h-[90%] px-2 overflow-y-auto ">
        {isLoading ? (
          <div className=" w-fit h-full flex items-center m-auto">
            <Oval strokeWidth={4} stroke="#000000" fill="transparent" />
          </div>
        ) : sortedList.length > 0 ? (
          sortedList.map((problem, id) => (
            <DashProblems problem={problem} key={id} />
          ))
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
