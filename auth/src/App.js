import Auth from './Auth';
import { useEffect , useState} from 'react';
import { auth } from './firebase';
import Path from './Path';
// import './App.css';
function App() {
    const [preUser, setPreUser] = useState(null);
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
   if(user){
     setPreUser({
       uid: user.uid,
       email: user.email,
     });
   }
   else{
    setPreUser(null)
   }
    })
  },[])

  return (
    <div className="App">
      <center>
        {preUser?<Path/>:<Auth/>}
      </center>
    </div>
  );
}

export default App;
