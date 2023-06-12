export type Item = {
  name: string;
  price: string;
  _id: string;
};

export interface ISolution {
  _id: string;
  problemsSolved: string[];
  title: string;
  description: string;
  successMeasure: string;
  totalBudget: string;
  timeFrame: string;
  itemsNeeded: Item[];
  upvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISolutionVote {
  _id: string;
  upvotedBy: string;
  solution: string;
  createdAt: string;
  updatedAt: string;
}
