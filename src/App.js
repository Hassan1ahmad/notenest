import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from './components/NavBar'
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Notes from './components/Notes';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Footer from './components/Footer'

function App() {
  return (
    <>
    <div className="wrapper">
    <NoteState>
    <Router basename={process.env.PUBLIC_URL}>
      <NavBar/>
      <div className="main-content">
      <Switch>
        <Route exact path="/" > <Home/> </Route>
        <Route exact path="/notes" > <Notes/> </Route>
        <Route exact path="/login" > <LogIn/> </Route>
        <Route exact path="/signup" > <SignUp/> </Route>
      </Switch>
      </div>
    </Router>
    <Footer/>
    </NoteState>
    </div>

    </>
  );
}

export default App;
