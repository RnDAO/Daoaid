const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema(
  {
    problemsSolved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: [true, "solution must have problems"],
      },
    ],
    title: {
      type: String,
      required: [true, "please enter the proposal title"],
    },
    description: {
      type: String,
      required: [true],
    },
    successMeasure: {
      type: String,
      required: true,
    },
    totalBudget: {
      type: Number,
      required: true,
    },
    timeFrame: {
      type: Number,
      required: true,
    },
    itemsNeeded: [
      {
        name: { type: String, required: [true, "item must have a name"] },
        price: { type: Number, required: [true, "item must have a price"] },
        // quantity: { type: number, required: [true, "item must have quantity"] },
      },
    ],

    upvotes: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

solutionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "problemsSolved",
    select: "title description",
  });
  next();
});

module.exports = mongoose.model("Solution", solutionSchema);
