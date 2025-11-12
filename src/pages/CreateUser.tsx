// createUser.tsx page

import React from 'react'
import type { IUser } from '../interface/user';
import { createUser } from '../services/api';




const CreateUser:React.FC = () => {
    const userData:IUser = {
        id: 1234567,
        name: "john deo",
        role: 'admin',
    }
     const handleCreateUser = async () => {
  await  createUser(userData);
  }
  return (
    <div className="card">
        <button onClick={() => {handleCreateUser()}}>
       Add user
        </button>
        
      </div>)
}

export default CreateUser