import mongoose from "mongoose";

export const Submission = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  score: {
    type: Number
  },
  feedback: {
    type: String
  }
}, { timestamps: true });

submissionSchema.index({ assignmentId: 1 });
submissionSchema.index({ studentId: 1 });
submissionSchema.index({ assignmentId: 1, score: -1 });
submissionSchema.index(
  { assignmentId: 1, studentId: 1 },
  { unique: true }
);

