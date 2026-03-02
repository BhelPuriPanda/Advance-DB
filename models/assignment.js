import mongoose from "mongoose";

export const Assignment = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  uniqueCode: {
    type: String,
    required: true,
    unique: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  expiresAt: {
    type: Date
  },
  leaderboardCache: [
    {
      studentId: mongoose.Schema.Types.ObjectId,
      score: Number
    }
  ]
}, { timestamps: true });

assignmentSchema.index({ uniqueCode: 1 });
assignmentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });