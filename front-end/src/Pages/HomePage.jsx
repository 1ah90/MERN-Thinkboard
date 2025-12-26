import { useState } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import { useEffect } from 'react'
import api from '../lib/axios'
import NoteNotFound from '../components/NoteNotFound'

function HomePage() {
  const [notes , setNotes] = useState([])
  const [isloading , setIsloading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async () =>{
      try {
        const res = await api.get("/note")
        const data = res.data
        setNotes(data)
        setIsloading(true)
        console.log(data)
      
      } catch (error) {
        console.log("Error fetching Data " , error)
      } finally{
        setIsloading(false)
      }
    }
    fetchNotes()
  },[])
  return (
    <div className=''>
      <Navbar/>

      {/* <RateLimitedUI/> */}
      <div className='p-4 md:p-0'>

        {notes.length === 0 && <NoteNotFound/>}
        <div className='p-4 mx-auto mt-4 max-w-7xl '>
          {isloading && <div className='text-center text-primary py-10'>Is Loading ...</div>}
        </div>
        {notes.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 max-w-6xl m-auto'>
            {notes.map(note => (
              
              <NoteCard key={note._id} note={note} setNote={setNotes}/>
            ))}
          </div>
        )}
        </div>
    </div>
    
  )
}

export default HomePage