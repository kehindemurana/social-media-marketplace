import { X } from "lucide-react";
import React, { useState } from "react";

const WithdrawModel = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState([
    { type: "text", name: "Account Holder Name", value: "" },
    { type: "text", name: "Bank Name", value: "" },
    { type: "number", name: "Account Number", value: "" },
    { type: "text", name: "Account Type", value: "" },
    { type: "text", name: "SWIFT", value: "" },
    { type: "text", name: "Branch", value: "" },
  ]);

  const handleSubmission = (e) => {
    e.preventDefault();
  };

  

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur 
    bg-opacity-50 z-100 flex justify-center items-center sm:p-4"
    >
      <div
        className="bg-white sm:rounded-lg shadow-2xl w-full
      max-w-lg h-screen sm:h-80 flex flex-col"
      >
        {/*Header*/}
        <div
          className="bg-linear-to-r from-indigo-600 to-indigo-400
         text-white p-4 2m:rounded-t-lg flex items-center justify-between"
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">
              Withdraw Funds</h3>
          
          </div>
             <button onClick={onClose} className='ml-4 p-1
              hover:bg-white/20 hover:bg-opacity-20
            rounded-lg transition-colors'>
              <X className='w-5 h-5'/>
            </button>
        </div>
                <form action="" onSubmit={handleSubmission} 
                className='flex flex-col items-start 
        gap-4 p-4 overflow-y-scroll'>
                          <div className='grid grid-cols-[2fr_3fr_1fr]'>
                            Amount
                            <input onChange={(e)=>setAmount(e.target.value)} 
                            type="number" className="w-full px-2 py-1.5 text-sm border 
                            border-gray-300 rounded outline-indigo-400" required/>
                          
                          </div>
                               {account.map((acc, index)=>{
            return(
              <div key={index} className='grid grid-cols-[2fr_3fr_1fr]'>
                <label htmlFor="" className='text-sm font-medium
                 text-gray-800'>{acc.name}</label>
              <input type={acc.type} value={acc.value}
               onChange={(e)=>setAccount((prev)=>prev.map((c,i)=>
                (i === index ? {...c, value:e.target.value} : c)))}
                 className='w-full px-2 py-1.5 text-sm border
                  border-gray-300 rounded outline-indigo-400'/>
                  <X className='w-5 h-5 text-gray-500 hover:text-gray-700
                  cursor-pointer'
                   onClick={()=>setCredential((prev)=>prev.filter((_, i)=> i !==index))}/>
              </div>
            )
          })}
                 {/*submit button*/}
          <button type='submit' className='bg-indigo-600
          hover:bg-indigo-700 text-white px-6 py-2 mt-4 rounded-md'>
            Apply for Witdraw
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawModel;
