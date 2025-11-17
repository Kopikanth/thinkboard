import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const NoteCard = ({note, setNotes, setEmptyNote}) => {

  const handleDelete = async (e, id)=>{
    e.preventDefault();
    if (!window.confirm("Are you really want to delete this?")) return;

    try {
      await api.delete(`/notes/${id}`);
      const res = await api.get('/notes');
      setNotes(res.data);
      // setNotes((prev)=> prev.filter((note)=>note._id !== id));
      console.log(res.data.length);
      if (res.data.length === 0) setEmptyNote(true);

      toast.success("Note deleted successfully!");
    } catch (error) {
      if (error.response?.status === 429){
        toast.error("You are deleting too fast");
      } else{
        toast.error("Deleting note failed");
      }
    }
  };

  return (
    <Link to={`/notes/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
                {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
                <PenSquareIcon className="size-4"/>
                <button onClick={(e)=>handleDelete(e, note._id)} className="btn btn-ghost btn-xs text-error">
                    <Trash2Icon className="size-4"/>
                </button>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;