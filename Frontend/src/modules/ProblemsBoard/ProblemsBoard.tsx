import { ProblemDashForm } from "./features/problemDashForm/ProblemDashForm";
import { ProblemDashList } from "./features/problemDashList";
import { Header } from "./components/header";

export const ProblemsBoard = () => {
  return (
    <div>
      <div className="h-screen pt-20 pb-10 px-16">
        <Header />
        <main className="mt-10 h-[90%] grid grid-cols-3 gap-10 overflow-y-auto">
          <ProblemDashList />
          <ProblemDashForm />
        </main>
      </div>
    </div>
  );
};
