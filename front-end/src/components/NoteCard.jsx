import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import {  Link } from 'react-router'
import toast from "react-hot-toast"
import { formatDate } from '../lib/utils'
import api from "../lib/axios"
const NoteCard = ({note , setNote}) => {
  
  const handelDelete = async (id) =>{
    // delete 
    try {
      await api.delete(`/note/${id}`)
      setNote((prev) => prev.filter(note => note._id !== id));
      toast.success("Note Deleted successfuly!")
    } catch (error) {
      console.log("error in handelDelete" , error)
      toast.error("failed to delete the Note")
    }
  }
  const confirmDelete = (e,id) => {
    e.preventDefault()
    // toast to confirm delete 
    toast((t) => (
      <span className="flex gap-2 items-center">
        Are you sure?
        <button
          className="btn btn-xs btn-error"
          onClick={() => {
            handelDelete(id);
            toast.dismiss(t.id);
          }}
        >
          Delete
        </button>
        <button
          className="btn btn-xs"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>
      </span>
    ));
};

  return (
    <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary'>
      <div className='card-body'>
        {/* title  */}
        <h3 className='card-title card-base-content'>{note.title}</h3>
        {/* contant  */}
        <p className='text-base-content/70 line-clamp-3'>{note.description}</p>

        {/* action card  */}
        <div className='card-actions justify-between items-center mt-4'>
          {/* data  */}
          <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
          {/* buttons  */}
          <div className='flex items-center gap-1'>
            <PenSquareIcon className='size-4'/>

            {/* delete  */}
            <button onClick={(e)=> confirmDelete(e , note._id)} className='btn btn-ghost btn-xs text-red-400 hover:text-red-700 '>
              <Trash2Icon className='size-4'/>
            </button>
          </div>

        </div>
        
      </div>

    </Link>
  )
}

export default NoteCard