import noteController from '../controller/noteController.js'
import express from 'express';

const noteRouter = express.Router();

const { 
    addNote,
    restoreNote,
    deleteNote,
    getAll,
    updateNote,
    checkNote
} = noteController;

noteRouter.get('/', getAll);
noteRouter.get('/:id', checkNote);
noteRouter.post('', addNote);
noteRouter.put('/:id', updateNote);
noteRouter.delete('/:id', deleteNote);
noteRouter.patch('/:id/restore', restoreNote);

export default noteRouter;

