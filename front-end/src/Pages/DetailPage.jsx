import { useEffect, useState  } from "react"
import { Link, useNavigate, useParams } from "react-router"
import api from "../lib/axios"
import { ArrowLeft, LoaderIcon, Trash2Icon } from "lucide-react"
import toast from "react-hot-toast"

function DetailPage() {
  // to load the page 
  const [loading , setLoading] = useState(true)

  
  // waitting to save the note 
  const [saving , setSaving] = useState(false)
  // the note i get it 
  const [note , setNote] = useState({
  title: "",
  description: ""
})
  
  const {id} = useParams();
  const navgate = useNavigate()
  // get note 
  useEffect(()=>{
    const fetchingNote = async () => {
      try {
        const res = await api.get(`/note/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log('error in fetching the note ' , error)
        console.error("falied to fetch Note")
      } finally{
        setLoading(false)
      }
    }
    fetchingNote()
  } , [id])
  // update Note 
  const handelSumbit = async (e) => {
    e.preventDefault()

    if (!note.title.trim() || !note.description.trim()){
      toast.error("Please fill the fields")
      return
    }

    try {
      setSaving(true)
      await api.put(`/note/${id}` , note)
      toast.success("Note Update it successfully !")
      navgate('/')
    } catch (error) {
      console.log("error in handelSumbit" , error)
    }finally{
      setSaving(false)
    }
}
  // Delete Note 
  const handelDelete = async () =>{
      try {
      setSaving(true)
      await api.delete(`/note/${id}`)
      navgate('/')
      toast.success("Note Delete it successfully !")
    } catch (error) {
      console.log("error in handel Delete " ,error)
    }finally {
      setSaving(false)
    }
  } 
    // toast to confirm delete 
    const confirmDelete = (id)=> {

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
      </span>))
}

  // loading if statement 
  if (loading) {
    return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
  )}
  return (
    <div>
      <div className="min-h-screen py-5 max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <Link to={'/'} className="btn bg-base-200">
            <ArrowLeft/>
            back to page
          </Link>
          <button disabled={saving} onClick={()=> confirmDelete(id)} className="btn text-red-400 hover:text-red-500">
            <Trash2Icon/>
            {saving ? "deleting..." : "Delete" }
          </button>
        </div>

        {/* form  */}
        <form onSubmit={handelSumbit}>
              <div className='form-control mb-4'>
                {/* title input  */}
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input 
                placeholder='Note Title'
                className='input input-bordered placeholder:text-primary/20'
                value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              
              <div className='form-control mb-4'>
                {/* description input  */}
                <label className='label'>
                  <span className='label-text'>description</span>
                </label>
                <input 
                placeholder='Note description'
                className='input input-bordered placeholder:text-primary/20'
                value={note.description}
                onChange={(e) => setNote({ ...note, description: e.target.value })}
                />
              </div>
              <div className='card-actions justify-end'>
                <button type='submit' disabled={saving} className={`btn btn-primary`}>{saving ? "Saving... ": "Save Changing"}</button>   
              </div>
        </form>
      </div>
    </div>
  )
}

export default DetailPage