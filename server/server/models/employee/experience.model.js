import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  primaryJob: {
    company: String,
    address: String,
    title: String,
    startDate: String,
    endDate: String,
    current: {
      type: Boolean,
      default: false,
    },
  },
  secondaryJob: {
    company: String,
    address: String,
    title: String,
    startDate: String,
    endDate: String,
  },
  otherJob: [
    {
      company: String,
      address: String,
      title: String,
      startDate: String,
      endDate: String,
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
