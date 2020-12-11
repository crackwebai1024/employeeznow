import mongoose from "mongoose";

const SearchResultSchema = new mongoose.Schema(
  {
    searchresult: [
      {
        _id: {
          type: mongoose.Schema.ObjectId,
          ref: "Employee",
        },
        locations: Object,
        employeezNowId: String,
        slug: String,
        distBetweenEmp: Number,
        purchased: Boolean,
        incart: Boolean,
        firstName: String,
        lastName: String,
        employeeskill: Object,
        employeepreference: Object,
        employeeexperience: Object,
        diffdist: Number,
        commonShift: [String],
        ratediff: Number,
        totalpoints: Number,
      },
    ],
    filterID: {
      type: mongoose.Schema.ObjectId,
      ref: "SearchFilter",
      required: true,
    },
  },
  {
    // virtuals true => it displays virtual schema
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model("SearchResult", SearchResultSchema);
