import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Project',
    },
    finished: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'Tasks',
  }
);

export const Task = mongoose.model('Task', TaskSchema);
