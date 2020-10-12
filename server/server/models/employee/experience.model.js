import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  primaryJob: {
    company: String,
    title: String,
    startDate: String,
    endDate: String,
    description: String,
    current: {
      type: Boolean,
      default: false,
    },
  },
  otherJob: [
    {
      company: String,
      title: String,
      startDate: String,
      endDate: String,
      description: String,
    },
  ],
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: "Employee",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("EmployeeExperience", ExperienceSchema);
