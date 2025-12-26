import Note from '../models/Note.js';

// GET function
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ created: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error(`Error in getAllNotes controller `, error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// GET note by ID
export async function getNoteById(req, res) {
  try {
    const id = req.params.id;
    const foundNote = await Note.findById(id);
    if (!foundNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(foundNote)
  } catch (error) {
    console.error(`Error in getNotesById ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// CREATE function
export async function createNote(req, res) {
  try {
    const {title, description } = req.body;
    const newNote = new Note({ title: title, description: description });
    const saveNote = await newNote.save();
    res.status(201).json({ message: saveNote });
  } catch (error) {
    console.error(`Error in createNote controller`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// UPDATE function
export async function updateNote(req, res) {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    const updateNote = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updateNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: updateNote });
  } catch (error) {
    console.error(`Error in updateNote ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// DELETE function
export async function deleteNote(req, res) {
  try {
    const id = req.params.id;
    const deleteNote = await Note.findByIdAndDelete(id);
    if (!deleteNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note delet it successefully' });
  } catch (error) {
    console.error(`Error in deleteNote controller`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
