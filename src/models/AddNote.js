import React from "react";
import { useContext,useState } from "react";
import NoteContext from "../context/notes/NoteContext";

function Addnotes({isOpen,onClose}) {
  const Notecontext = useContext(NoteContext)
  const {addNote} = Notecontext
  const [note, setnote] = useState({title: '',description:''});
  const [Error, setError] = useState('');

  const inputChanged=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }

  const submitClicked=()=>{
    if (!note.title && !note.description ) {
      setError(`Please write some text in both title and description  . `)
    }
    else if (!note.title) {
        setError(`Please write some text in title. `)
      }
     else if (!note.description) {
        setError(`Please write some text in description. `)
      }
      else if (note.description.length<2) {
        setError('please write description of more than 2 words')
      }
     else {
      addNote(note.title,note.description)
      setnote({title: '',description:''})
      onClose()
      setError('')
    }
  }



  if(!isOpen) return null;
  return (
    <div className="addnote-modal z-2">
      <div className="addnote-modal-content">
        <div className="text-end">
      <i onClick={onClose} className="fa-solid fa-xmark text-end "></i>
        </div>
      <div className="mb-2">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          required
          type="text"
          className="form-control"
          id="title"
          name="title"
          placeholder="Your title here"
          onChange={inputChanged}
        />
      </div>
      <div className="form-floating">
        <textarea
        required
          className="form-control textarea"
          placeholder="Your description here"
          id="description"
          name="description"
          onChange={inputChanged}
        ></textarea>
        <label htmlFor="floatingTextarea2">Description</label>
      </div>
      <div>
        {Error && <p className="addnote-error-message"> {Error} </p>}
      </div>
      <div className="text-center">
      <button type="button" onClick={submitClicked} className="btn save-del btn-outline-success">Save</button>
      </div>
       </div>
    </div>
  );
}

export default Addnotes;
