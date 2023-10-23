import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import './Login.css'

function SignUp() {
  const host = process.env.REACT_APP_API_URL
  const [credentials, setCredentials] = useState({name:'',email:'',password:''});
  const [error, setError] = useState('');
  let history =useHistory()

  // Api call 
  const inputsumbitted = async(e) => {
    e.preventDefault();
    const url = `${host}/api/auth/createuser`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            })
        });

        const data = await response.json();

        // If there's an application-level error (like email already exists)
        if (!data.success) {
            if (data.error === 'Email already exists!') {
                setError('Email Already Present');
            } else if(data.error === 'Please provide a valid email address.'){
              setError('Please provide a valid email address.');
            }
            else {
                setError('Oops! Something went wrong on our end. Please try again later');
            }
        } else {
            localStorage.setItem('token', data.jwt_token);
            history.push('/notes');
            setError('');
        }
    } catch (error) {
        // This catch block handles unexpected API errors
        setError(' Unable to complete request. Please try again later.');
    }
}

  const inputchanged=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})

  }

  // show password function
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
                <form onSubmit={inputsumbitted}>
                <div className="form-label text-center fs-3">SIGN-UP</div>
                <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input onChange={inputchanged} required value={credentials.name} id='name' name='name' type="text" className="form-control"  aria-label="First name"/>
                </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address:</label>
              <input onChange={inputchanged} required value={credentials.email} type="email" name='email' className="form-control" autoComplete='username' id="exampleInputEmail1" aria-describedby="emailHelp"/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
              <input onChange={inputchanged} required value={credentials.password} name='password' type={`${showpass === true? 'text' :'password'}`} autoComplete="current-password" className="form-control" id="exampleInputPassword1"/>
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
          Have an account already?<Link to='/login' > Log in. </Link>
          </div>
              </div>
              </div>
  )
}

export default SignUp