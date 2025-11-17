import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        // console.log(note);
      } catch (error) {
        if (error.response?.status === 429) {
          toast.error("Slow down");
        } else {
          toast.error("Error in fetching note");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [id]);

  const handleDelete = async ()=>{
    if(!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await api.delete(`/notes/${id}`);
      navigate('/');
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Deleting note is failed");
    }
  };

  const handleSave = async ()=>{
    if(!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required");
      return;
    }
    try {
      setSaving(true);
      await api.put(`/notes/${id}`, note);
      navigate('/');
      toast.success("Note updated successfully");
    } catch (error) {
      toast.error("Updating note failed");
    }finally{
      setSaving(false);
    }
  };

  // console.log(note);

  if (loading){
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link className="btn btn-ghost" to={'/'}>
              <ArrowLeftIcon className="h-5 w-5"/>
              Back to Notes
            </Link>
            <button className="btn btn-error btn-outline" onClick={handleDelete}>
              <Trash2Icon className="h-5 w-5"/>
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span> 
                </label>
                <input type="text" placeholder="Note title" className="input input-bordered" value={note.title} onChange={(e)=>setNote({...note, title: e.target.value})} />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea placeholder="Write your note here" className="textarea textarea-bordered h-32" value={note.content} onChange={(e)=>setNote({...note, content: e.target.value})}/>
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving? 'Saving...' : 'Save Note'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;