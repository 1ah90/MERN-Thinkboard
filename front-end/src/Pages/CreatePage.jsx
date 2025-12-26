import { ArrowLeft } from 'lucide-react'
import  { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import api from '../lib/axios'


function CreatePage() {

  const [title , setTitle] = useState('')
  const [description, setDescription] = useState("");
  const [isLoading , setIsLoading] = useState(false)

  const navgate = useNavigate()
  const handelSumbit =  async (e) =>{
    e.preventDefault();

    // check if fields are not empty 
    if (!title.trim() || !description.trim()){
      toast.error("All fields are require!")
      return
    }
    setIsLoading(true)

    // post note 
    try {
      await api.post("/note" , {
        title ,
        description
      })
      toast.success("Note created successfully!")
      navgate('/')

    } catch (error) {
      console.log("error in Create page file " , error)
      toast.error("Failed to craete note ")
    }finally {
      setIsLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-base-200 '>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>

          <Link to={'/'} className='btn btn-ghost mb-6'>
          <ArrowLeft className='size-5'/>
          go back
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>

              <form onSubmit={handelSumbit}>
                <div className='form-control mb-4'>
                  {/* title input  */}
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input 
                  placeholder='Note Title'
                  className='input input-bordered placeholder:text-primary/20'
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
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
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                  />
                </div>
                <div className='card-actions justify-end'>
                  <button type='submit' disabled={isLoading} className={`btn btn-primary`}>{isLoading ? "Creating... ": "Create Note"}</button>   
                </div>
              </form>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePage