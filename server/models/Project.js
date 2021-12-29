import mongoose from 'mongoose';
import { Task } from './Task';

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true, collection: 'Projects' }
);

ProjectSchema.index({ name: 1, owner: 1 }, { unique: true });

ProjectSchema.pre('deleteOne', { document: true }, async function (next) {
  let idList = this.tasks;
  idList = idList.map((item) => String(item));
  await Task.deleteMany({ _id: { $in: idList } });
  next();
});

export const Project = mongoose.model('Project', ProjectSchema);
