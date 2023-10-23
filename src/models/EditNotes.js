import React,{useState,useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

function EditNote(props) {
  // context
  const context = useContext(NoteContext)
  const {editingnote} = context
  // using editing note from context to update notes and handling blank inputs with errors
  const [Error, setError] = useState();
  const updatenote=()=>{
    if (!editednote.etitle && !editednote.edescription ) {
      setError(`Please write some text in both title and description  . `)
    }
    else if (!editednote.etitle) {
        setError(`Please write some text in title. `)
      }
     else if (!editednote.edescription) {
        setError(`Please write some text in description. `)
      }
      else if (editednote.edescription.length<2) {
        setError('please write description of more than 2 words')
      }else{
    editingnote(editednote.etitle,editednote.edescription,props.id) 
    props.onClose()
  }
  }  
  // fetching title,description and if  from noteitem
  const [editednote, seteditednote] = useState({etitle:props.title || '',edescription:props.description ||''});
    const inputchanged=(e)=>{
        seteditednote ({...editednote,[e.target.name]: e.target.value})
    }
    // return null when title and description is blank
    if(!props.title && !props.description) return null
  return (
    <div className="addnote-modal z-2">
      <div className="addnote-modal-content">
        <div className="text-end">
      <i  onClick={props.onClose} className="fa-solid fa-xmark text-end "></i>
        </div>
        <div className='text-center fs-4 fw-bolder'>
        Edit Note
            </div>
      <div className="mb-2">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          id="etitle"
          name="etitle"
          value={editednote.etitle}
          onChange={inputchanged}

          placeholder="Your title here"
         
        />
      </div>
      <div className="form-floating">
        <textarea
          className="form-control textarea"
          placeholder="Your description here"
          id="edescription"
          name="edescription"
          value={editednote.edescription}
          onChange={inputchanged}
        ></textarea>
        <label htmlFor="floatingTextarea2">Description</label>
      </div>
      <div>
        {Error && <p className="addnote-error-message"> {Error} </p>}
      </div>
      <div className="text-center">
      <button onClick={updatenote} type="button" className="btn save-del btn-outline-success">Update Note</button>
      </div>
       </div>
    </div>
  )
}

export default EditNote
