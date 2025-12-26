import express from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getNoteById,
} from '../controllers/notesController.js';

const router = express.Router();

// GET 
router.get('/', getAllNotes);

// GET by id 

router.get('/:id', getNoteById)
// CREAT 
router.post('/', createNote);

// UPDATE 
router.put('/:id', updateNote);

// DELETE 
router.delete('/:id', deleteNote);


export default router;
