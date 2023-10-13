import React,{useEffect,useState} from 'react'
import {onSnapshot,collection,doc,updateDoc,where,query} from 'firebase/firestore'
import BasicModal from '../../Modal';
import {AiFillEye} from 'react-icons/ai';
import PasswordModal from '../../PasswordsModal';
import Home from '../Home'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const Manager = ({database}) => {

  const yo=false;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let userEmail=localStorage.getItem("userEmail");
  let navigate = useNavigate();
  let auth = getAuth();

  const [passwordOpen, setPasswordOpen] = useState(false);
  // const handlePasswordOpen = () => setPasswordOpen(true);

  const [showPassword,setShowPassword]=useState('');

  const handlePasswordClose = () => setPasswordOpen(false);

  const collectionRef=collection(database,'userPasswords');

  const emailQuery=query(collectionRef,where('email','==',userEmail))

  // const [id,setId]=useState(null);
  const [passwordsArray,setPasswordsArray]=useState([]);
  const [passwordObject,setPasswordObject]=useState({});
  const [oldPasswords,setOldPasswords]=useState([]);
 const getPasswords=()=>{
    onSnapshot(emailQuery,(response)=>{
      setPasswordsArray(response.docs.map((item)=>{
        return{...item.data(),id: item.id}
      }));

      const data=(response.docs.map((item)=>{
        return{...item.data(),id: item.id}
      }));
      setOldPasswords(data[0].passwordsArray);
    })
  }

  const getPasswordsInputs=(event)=>{
    const data={[event.target.name]:event.target.value}
    setPasswordObject({...passwordObject,...data});

  }
  // console.log(passwordObject );
  
  const addPasswords=()=>{
    const docToUpadate=doc(database,"userPasswords",passwordsArray[0].id);
    updateDoc(docToUpadate,{
      passwordsArray:[...oldPasswords,passwordObject],
    })
  }

  const openPasswordModal=(password)=>{
    setShowPassword(password);
    setPasswordOpen(true);
  }

 
  useEffect(()=>{
    onAuthStateChanged(auth,(response=>{
      if(response){

        getPasswords();
      }else{
        navigate("/");
      }
      console.log(response);
    }))

    
  },[])

// console.log(passwordObject);

  return (
    <div>
      <h1>Manager</h1> 
      <div>
        <button onClick={handleOpen}>Add a password</button>
        <div>
        {passwordsArray.map((password)=>{
          return(
            <div>
              {password.passwordsArray.map((password)=>{
                return(
                  <>
                  <div>
                    <p>{password.name}</p>
                    <AiFillEye size={30} onClick={()=>openPasswordModal(password.password)}/> 
                  </div>
                  </>
                )
              })}
            </div>
          )
        })}
      </div>
      </div>
      <BasicModal open={open} handleClose={handleClose} getPasswordsInputs={getPasswordsInputs} addPasswords={addPasswords}  />
      <PasswordModal 
      open={passwordOpen}
      // handlePasswordOpen={handlePasswordOpen}
      handleClose={handlePasswordClose}
      showPassword={showPassword}
      originalPassword={passwordsArray[0]?.password}
      handlePasswordClose={handlePasswordClose}
      />


    </div>

  )
}

export default Manager