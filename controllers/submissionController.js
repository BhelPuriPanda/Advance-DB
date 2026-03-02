import mongoose from "mongoose";
import { Submission } from "../models/submission";
import { Assignment } from "../models/assignment";

export const leaderboard = await submissionSchema.aggregate([
  { $match: { assignmentId: new mongoose.Types.ObjectId(id) } },
  { $sort: { score: -1 } },
  { $limit: 10 },
  {
    $lookup: {
      from: "students",
      localField: "studentId",
      foreignField: "_id",
      as: "student"
    }
  },
  { $unwind: "$student" },
  {
    $project: {
      score: 1,
      "student.name": 1
    }
  }
]);

export const submitAssignment = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { assignmentId, answer } = req.body;
    const studentId = req.user.id;

    // 1️⃣ Check assignment exists
    const assignment = await Assignment.findById(assignmentId).session(session);
    if (!assignment) {
      throw new Error("Assignment not found");
    }

    // 2️⃣ Calculate AI score (simulate for now)
    const score = Math.floor(Math.random() * 10) + 1;
    const feedback = "Good attempt!";

    // 3️⃣ Create submission
    const submission = await Submission.create(
      [{
        assignmentId,
        studentId,
        answer,
        score,
        feedback
      }],
      { session }
    );

    // 4️⃣ (Optional) Update leaderboard cache
    // Later we optimize this

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Submission successful",
      submission
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};