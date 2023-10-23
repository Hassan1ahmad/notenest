import React from 'react'
import './Noteitem.css'


function Notesitem(props) {
   const sendId=()=>{
    props.deletenoteid(props.note._id,props.note.title,true)
   }
  return (
    <>
    
    {/* ------------------shows notes------------------------ */}
    <div className='container-noteitem container  my-4'>
        {/* style="width: 18rem;" */}
                <div className="card" >
            <div className="card-body">
              <div className='d-flex justify-content-between'>
                <h5 className="card-title">{props.note.title}</h5>
                <div className='d-flex justify-content-center align-items-center'>
                  <i onClick={()=>{props.onEdit(props.note.title,props.note.description,props.note._id)}} className="fa-solid  fa-pen-to-square"></i>      <i onClick={sendId} className="fa-solid  fa-trash-can"></i>
                  </div>

              </div>
                {/* <span className="badge rounded-pill text-bg-secondary">{props.note.tag}</span> */}
                <p className="card-text">{props.note.description}</p>
            </div>
            </div>
    </div>
    </>
  )
}

export default Notesitem
