import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  type: String,
  fname: String,
  url: String,
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  stars: {
    type: Number,
    default: 0,
  },
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: "Employee",
    required: true,
  },
  voters: [
    {
      firstName: String,
      lastName: String,
      stars: Number,
    },
  ],
});

export default mongoose.model("ContestVideo", VideoSchema);
