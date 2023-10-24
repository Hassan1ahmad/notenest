import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { useHistory } from 'react-router-dom';

function LogIn() {
  const host = 'https://notenest.cyclic.app';
  const [credentials, setCredentials] = useState({email:'',password:''});
  const [error, setError] = useState('');
  let history =useHistory()
  // Api call
  const handlesumbitted=async(e)=>{
    e.preventDefault()
    const url=`${host}/api/auth/login`
    try {
      const response = await fetch(url,{
        method : 'POST',
        headers :{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({email:credentials.email,password:credentials.password})
      })
      const data =await response.json()
  
      if (!data.success) {
        setError('Incorrect Email Or Password')
        
      }else{
        localStorage.setItem('token',data.jwt_token)
        history.push('/notes')
        setError('')
      }
    } catch (error) {
      setError('Unable to complete request. Please try again later.');
    }
    

  }
  const inputchanged=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})

  }

  // Show password function
  const [showpass, setshowpass] = useState(false);
    const handleshowpassword=()=>{
      if (showpass === false) {
        setshowpass(true)
      }else{
        setshowpass(false)
      }
    }
  return (
           <div className='vh-100 gradient-custom'> 
              <div className='container loginbackground my-3'> 
                <form onSubmit={handlesumbitted} >
                    <div className="form-label text-center fs-3">LOG-IN</div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address:</label>
              <input type="email" name='email' value={credentials.email} onChange={inputchanged} className="form-control" autoComplete='username' id="exampleInputEmail1" aria-describedby="emailHelp"/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
              <input onChange={inputchanged} value={credentials.password} name='password' type={`${showpass === true? 'text' :'password'}`} autoComplete="current-password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" onChange={handleshowpassword}  className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label"  htmlFor="exampleCheck1">Show password</label>
            </div>
            <div>
            {error && <p className="addnote-error-message"> {error} </p>}
             </div>
            <button type="submit" className="btn butn btn-primary">Submit</button>
          </form>
          <div className='account-info'>
          First time here? Create an<Link to='/signup' > account</Link>  to begin.
          </div>
              </div>
              </div>
  )
}

export default LogIn