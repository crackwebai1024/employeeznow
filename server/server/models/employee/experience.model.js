import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  primaryJob: {
    company: String,
    address: String,
    title: String,
    startDate: Date,
    endDate: Date,
    current: {
      type: Boolean,
      default: false,
    },
  },
  secondaryJob: {
    company: String,
    address: String,
    title: String,
    startDate: Date,
    endDate: Date,
  },
  otherJob: [
    {
      company: String,
      address: String,
      title: String,
      startDate: Date,
      endDate: Date,
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
