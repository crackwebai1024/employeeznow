import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  resume: {
    fname: String,
    fcryptoName: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  license: {
    fname: String,
    fcryptoName: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  deploma: {
    fname: String,
    fcryptoName: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  referenceLetter: {
    fname: String,
    fcryptoName: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: "Employee",
    required: true,
  },
});

export default mongoose.model("EmployeeDocument", DocumentSchema);
