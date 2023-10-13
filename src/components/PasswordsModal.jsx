import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiOutlineCloseCircle} from 'react-icons/ai';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function PasswordModal({
  open,
  handleClose,
  showPassword,
  originalPassword,
  handlePasswordClose
}) {
    const [newPassword,setNewPassword]=useState('');
    const [showNewPassword,setShowNewPassword]=useState(false);

    const validatePassword=()=>{
        console.log(newPassword);
        console.log(originalPassword);
        if(newPassword === originalPassword){
          toast.success("Validated Successfully!");
            setShowNewPassword(true);
        }
        else{
          toast.error("Please enter the correct password!");
        }
        
    }
    const closeModal=()=>{
      handlePasswordClose();
      setShowNewPassword(false);
    }

  return (
    <div>
        <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div> 
            <AiOutlineCloseCircle onClick={closeModal} />
          </div>
       
          {showNewPassword ?(
          <Typography id="modal-modal-title" variant="h6" component="h2">
            The password is :- {showPassword}
          </Typography>

          ):(
            <div>
             <input
            placeholder="Enter your Login  Password"
            onChange={(event)=>setNewPassword(event.target.value)}
            name="password"
            type={"password"}
          /> 
          <button 
          onClick={validatePassword}>
            validate
          </button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
