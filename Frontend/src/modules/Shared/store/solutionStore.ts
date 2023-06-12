import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ISolution } from "@modules/Shared/interfaces/solutionInterface";

interface Solution {
  solutions: ISolution[];
  solutionSearchResult: ISolution[];
  autosolutionSearchResult: ISolution[];
  focusedsolutions: ISolution[];
  selectedsolution: ISolution | {};

  setSolutions: (list: ISolution[]) => void;
  setSolutionSearchResult: (list: ISolution[]) => void;
  setAutosolutionSearchResult: (list: ISolution[]) => void;
  setFocusedsolutions: (list: ISolution[]) => void;
  setSelectedsolution: (solution: ISolution) => void;
  removesolutions: () => void;
  removeFocusedsolutions: () => void;
  removeSelectedsolution: () => void;
  removesolutionSearchResult: () => void;
  removeAutosolutionSearchResult: () => void;
}

export const useSolutionStore = create<Solution>()(
  persist(
    (set) => ({
      solutions: [],
      solutionSearchResult: [],
      autosolutionSearchResult: [],
      focusedsolutions: [],
      selectedsolution: {},
      //set solutions array
      setSolutions(list: ISolution[]) {
        set(() => ({
          solutions: list,
        }));
      },
      //set solutions search result array
      setSolutionSearchResult(list: ISolution[]) {
        set(() => ({
          solutionSearchResult: list,
        }));
      },

      //set auto solutions search result array
      setAutosolutionSearchResult(list: ISolution[]) {
        set(() => ({
          autosolutionSearchResult: list,
        }));
      },
      //set auto solutions search result array
      setFocusedsolutions(list: ISolution[]) {
        set(() => ({
          focusedsolutions: list,
        }));
      },
      //set auto solutions search result array
      setSelectedsolution(solution: ISolution) {
        set(() => ({
          selectedsolution: solution,
        }));
      },

      //delete states

      //clear solutions array
      removesolutions() {
        set(() => ({
          solutions: [],
        }));
      },
      //clear solutions array
      removesolutionSearchResult() {
        set(() => ({
          solutionSearchResult: [],
        }));
      },
      //clear auto solutions array
      removeAutosolutionSearchResult() {
        set(() => ({
          autosolutionSearchResult: [],
        }));
      },
      //clear focused solutions array
      removeFocusedsolutions() {
        set(() => ({
          focusedsolutions: [],
        }));
      },
      //clear selected solution array
      removeSelectedsolution() {
        set(() => ({
          selectedsolution: {},
        }));
      },
    }),
    {
      name: "solutionData",
    }
  )
);
