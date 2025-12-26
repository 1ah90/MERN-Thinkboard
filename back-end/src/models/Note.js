import mongoose from 'mongoose';

// Note Schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Note Model
const Note = mongoose.model('Note', noteSchema);

export default Note;
