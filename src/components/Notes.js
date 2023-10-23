import React,{useContext,useState,useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext'
import Notesitem from './Notesitem'
import AddNote from '../models/AddNote'
import EditNote from '../models/EditNotes'
import ErrorNotification from './ErrorNotification'
import './note.css'
import { useHistory } from 'react-router-dom'


function Notes() {
  let history =useHistory()

  const notescontext =useContext(NoteContext)
  const {allnotes,notes,deleteNote,getusername,userName,Error,setError,isLoading} = notescontext

  const [isModelOpen, setisModelOpen] = useState(false);
  const [delisvisible, setdelisvisible] = useState(false);
  const [iseditopen, setIseditopen] = useState(false);

  // console.log(isloading)
// set error
const handleCloseError = () => {
  setError(null);
}
// call for all notes and username
  useEffect(() => {
    if (localStorage.getItem('token')) {
        allnotes();
        getusername()

    } else {
        history.push('/signup');
    }

    // eslint-disable-next-line
}, []);

  // function to get id and title from noteitem for delting notes
  const [delid, setdelid] = useState(null);
  const [deltitle, setDeltitle,] = useState(null);
  const deletenoteid=(id,title,isvisible)=>{
    setdelid(id)
    setDeltitle(title)
    setdelisvisible(isvisible)    
  }
//  get edit notes values from noteitem
   const [editingtitle, seteditingtitle] = useState('');
   const [editingdescription, setEditingdescription] = useState('');
   const [editingid, seteditingid] = useState('');
   

  return (
    <div className=' notesitem-bg'>
      {/* -------------handling error-------------------------------- */}
      {Error && <ErrorNotification message={Error} onClose={handleCloseError} />}
  {/* ----------------showing username-----------------  */}
    <div className="user-box d-inline">
      Welcome, <span className="user-name">{userName}</span>!
    </div>
    
    <div>
    {/* Loading spinner */}
    {isLoading && <div className="loader-container">
    <div className="loader"></div>
    </div>}
    
    {/* If notes are not loading and there are no notes, show the "Add a new note" button */}
    {!isLoading && notes.length === 0 && 
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <button type="button" 
                onClick={() => setisModelOpen(true)}
                className="btn fristnotebutton">
          Add Your first note
        </button>
      </div>
    }
    
    {/* If notes exist, show them */}
    {!isLoading && notes.length > 0 && (
      <>
        <div className='text-end me-3 mt-2 sticky-top z-1 '>
          <button type="button" 
                  onClick={() => setisModelOpen(true)}
                  className="btn btn-dark">
            Add a new note
          </button>
        </div>
        
        <div className='text-center fs-2 fw-bolder text-light'>Your Notes</div>
        <div className={`note d-flex justify-content-evenly flex-wrap z-0`}>
          {notes.map((note) => {
            return <Notesitem key={note._id} 
                              deletenoteid={deletenoteid} 
                              note={note}
                              onEdit={(title,description,id) => {
                                seteditingtitle(title);
                                setEditingdescription(description);
                                seteditingid(id);
                                setIseditopen(true);
                              }} />
          })}
        </div>
      </>
    )}
  </div>
        {/* -------------------shows delete-------------------- */}
    {delisvisible &&
         <div class="deletenote-modal modal">
          <div class="modal-dialog">
            <div class="deletenote-modal-content modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Delete: {deltitle}</h5>
                <button type="button" class="btn-close" onClick={()=>{setdelisvisible(false)}} aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to delete this?</p>
              </div>
              <div class="modal-footer">
                <button type="button" onClick={()=>{deleteNote(delid);setdelisvisible(false);}} class="btn btn-secondary" >Yes</button>
                <button type="button" onClick={()=>{setdelisvisible(false)}} class="btn btn-primary">No</button>
              </div>
            </div>
          </div>
        </div> } 
        {/* --------------------------Add note------------------------ */}
     
     <AddNote   
    isOpen={isModelOpen}
    onClose={()=>setisModelOpen(false)}
    />
    
    {/* ------------------editnote-------------- */}
    {iseditopen && <EditNote onClose={()=>{setIseditopen(false)}} title={editingtitle} description={editingdescription} id={editingid}/>}

   
    </div>
  )
}

export default Notes
