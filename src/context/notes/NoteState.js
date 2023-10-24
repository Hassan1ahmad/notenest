import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState=(props)=>{
  // const host = 'https://notenest.cyclic.app'
    const initialnotes =[ ]
    const [notes, setnotes] = useState(initialnotes);
    const [userName, setUserName] = useState('');
    const [Error, setError] = useState();
    const [isLoading, setisLoading] = useState(true);
  //  --------------------------------------reset notes
    const resetnotes=()=>{
      setnotes(initialnotes)
      setUserName('')
    }
   
    // -----------------------------------------get user name
    const getusername = async () => {
      const url = `https://notenest.cyclic.app/api/auth/userdetails`;
  
      try {
        setisLoading(true)
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'jwt-token': localStorage.getItem('token'),
                  'Content-Type': 'application/json'
              }
          });
  
          if (!response.ok) { // Check if response status is okay 
              throw new Error(`Server responded with ${response.status}`);
          }
           setisLoading(true)
          const data = await response.json();
          setisLoading(false)
          setUserName(data.name);

  
      } catch (error) {
          console.error("There was an error:", error);
          setError("An error occurred while fetching the username. Please try again later Or reload it.");
      }
  }


  //----------------------------------------- get all note
    const allnotes=async()=>{
      const url=`https://notenest.cyclic.app/api/notes/allnotes`
      try {
        setisLoading(true)
        const response = await fetch(url,{
          method : 'GET',
          headers :{
            'jwt-token' : localStorage.getItem('token')
          }
        })
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);}
          setisLoading(true)
          const getallnotes =await response.json()
          setnotes(getallnotes)
          setisLoading(false)

      } catch (error) {
        console.error("There was an error:", error);
        setError("An error occurred while fetching the notes. Please try again later Or reload it.");

      }
      
    }
    //---------------------------------------------- Add a note
    const addNote=async(title,description)=>{
      const url=`https://notenest.cyclic.app/api/notes/addnotes`
      try {
        const response = await fetch(url,{
          method : 'POST',
          headers :{
            'jwt-token' : localStorage.getItem('token'),
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({title,description})
  
        })
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);}
        const note = await response.json()
        setnotes(notes.concat(note))
      } catch (error) {
        console.error("There was an error:", error);
        setError("An error occurred while adding notes. Please try again later Or reload it.");
      }
     
    }
    //----------------------------------------- delete note
    const deleteNote=async(id)=>{
      const url=`https://notenest.cyclic.app/api/notes/deletenotes/${id}`
      try {
        const response= await fetch(url,{
        method : 'DELETE',
        headers :{
          'jwt-token' : localStorage.getItem('token'),
          'Content-Type' : 'application/json'
        },  
      })
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);}
    
      setnotes(notes.filter((note)=>{
        return note._id !== id
      }))
        
      } catch (error) {
        console.error("There was an error:", error);
        setError("Error in deleting note. Please try again later Or reload it.");
      }
       
    }
    // ------------------------edit note
    const editingnote=async(title,description,id)=>{
      // API call
      const url=`https://notenest.cyclic.app/api/notes/updatenotes/${id}`
      try {
        const response = await fetch(url,{
          method : 'PUT',
          headers :{
            'jwt-token' : localStorage.getItem('token'),
            'Content-Type' : 'application/json'
          },  
          body : JSON.stringify({title,description})
        })
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);}

          // logic for edit
      let newnotes= JSON.parse(JSON.stringify(notes))
      
      for (let index = 0; index <newnotes.length; index++) {
        const element =newnotes[index];
        if (element._id === id) {
          newnotes[index].title = title;
          newnotes[index].description = description
          break;
                }
      }
      setnotes(newnotes)
      
      } catch (error) {
        console.error("There was an error:", error);
        setError("Error in editing note. Please try again later Or reload it.");
      }
      
    

      
    }

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,allnotes,editingnote,getusername,userName,resetnotes ,Error,setError,isLoading}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState