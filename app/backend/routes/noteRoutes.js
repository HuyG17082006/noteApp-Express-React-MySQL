import noteController from '../controller/noteController.js'
import express from 'express';

const noteRouter = express.Router();

const { 
    addNote,
    restoreNote,
    moveNoteToTrash,
    hardDelete,
    getAll,
    updateNote,
    checkNote,
    getAllDeletedNotes,
    hardDeleteAll
} = noteController;

noteRouter.get('/', getAll);
noteRouter.get('/trash', getAllDeletedNotes);
noteRouter.get('/:id', checkNote);
noteRouter.post('/', addNote);
noteRouter.put('/:id', updateNote);
noteRouter.delete('/trash', hardDeleteAll);
noteRouter.delete('/:id', moveNoteToTrash);
noteRouter.delete('/:id/permanent', hardDelete);
noteRouter.patch('/:id/restore', restoreNote);

export default noteRouter;

