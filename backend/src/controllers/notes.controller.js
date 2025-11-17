import mongoose from "mongoose";
import Note from "../../models/notes.model.js";

const getAllNotes = async (req,res)=>{
    try {
        const notes = await Note.find({}).sort({createdAt: -1});

        if (!notes) return res.status(404).json("Notes is empty");

        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

const getNoteById = async (req, res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json("Invalid note ID");

    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json("Note not found");

    res.status(200).json(note);
}
 
const createNote = async (req,res)=>{
    try {
        const {title, content} = req.body;
        // const note = new Note({title, content});
        // const savedNote = await note.save();
        const createdNote = await Note.create({title, content});
        res.status(201).json(createdNote);
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};
 
const updateNote = async (req,res)=>{
    try {
        const {title, content} = req.body;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json("Invalid note ID");

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});

        if (!updatedNote) return res.status(404).json("Note not found");

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};
 
const deleteNote = async (req,res)=>{
    try {
        if (!mongoose.Types.ObjectId.isValid) return res.status(400).json("Invalid note ID");

        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) return res.status(400).json("Note not found");

        res.status(200).json(deletedNote);
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};
 
export {getAllNotes, getNoteById, createNote, updateNote, deleteNote};