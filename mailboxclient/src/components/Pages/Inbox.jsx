import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Inbox = () => {
    const [allMails, setMails] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
       getAllMails()
    },[])
    const getAllMails = async () => {
        const userEmail = localStorage.getItem("userEmail") || 'abc@gmail.com';
      const res = await axios.get(
        `https://mailboxclient-c494d-default-rtdb.firebaseio.com/inbox/${userEmail.split('@')[0]}.json`
        );
        console.log(res)
let s = []
       for (let key in res.data) {
         s.push({...res.data[key] , id : key})  
       }
       setMails(s)
    };
      

    return (
        <>
            <button className=' btn btn-primary mt-2' onClick={()=>navigate('/sendmail')}>COMPOSE</button>
        <div className="m-5">
          {allMails.map((e) => (
            <div
              key={e.id}
              className=" rounded-3 shadow p-3 d-flex justify-content-between"
            >
              <div>
                <b>{e.senderMail}</b>
              </div>
              <div>
                <b className=" m-2">{e.subject}</b>
                <span>{e.mail}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
}

export default Inbox