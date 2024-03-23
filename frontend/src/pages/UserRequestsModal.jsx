// UserRequestsModal.js
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserRequestsModal = ({ onClose }) => {
    // const userRequests = ['User A', 'User B', 'User C','User A', 'User B', 'User C','User A', 'User B', 'User C'];
    const navigate=useNavigate();
    const[userRequests,setUserrequests]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/v1/account/notifications',{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }).then((res)=>{            
          console.log(res.data)

            setUserrequests(res.data);
        })
    },[])

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h2 className="text-gray-900 text-lg font-bold mb-2">Requests</h2>
          <div className="overflow-y-auto max-h-56 scrollbar-hide">
            {userRequests.map((request, index) => (
              
              <div key={request._id} className='flex p-2 align-middle justify-between'>
                <div className='rounded-full w-12 h-12 flex justify-center mt-1 mr-2 bg-slate-200'>
                  <div className='flex flex-col justify-center h-full text-xl'>
                    {request.requesterName[0]} 
                  </div>
                </div>
                <div className='flex flex-col h-full justify-center align-middle text-center p-3'>
                  {request.requesterName} {" (rs "}{request.amount}{")"}
                </div>
                <div className='flex flex-col '>
                  <button
                    className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                  onClick={()=>navigate("/send?id="+request.request + "&name=" + request.requesterName)}>
                    Pay
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Close
          </button>
        </div>
      </div>
    </div>
    
    );
};

export default UserRequestsModal;
