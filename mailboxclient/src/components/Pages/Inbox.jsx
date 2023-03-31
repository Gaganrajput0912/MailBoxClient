import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {RxDotFilled} from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMail, fetchAllMails, mailActions } from '../../store/MailSlicer'
import {AiFillDelete } from 'react-icons/ai'


const Inbox = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

  useEffect(() => {      
    dispatch(fetchAllMails())
    }, [])
    
    const { allMails } = useSelector((state) => state.mail)

    
    const handleRead = async (id) => {
         const userEmail =
           localStorage.getItem("userEmail") || "abc@gmail.com";
        const res = await axios.patch(`https://mailboxclient-c494d-default-rtdb.firebaseio.com/inbox/${userEmail.split('@')[0]}/${id}.json`, {isReaded : true})
    dispatch(fetchAllMails());
    
    }
    
    return (
      <>
        <button
          className=" btn btn-primary mt-2"
          onClick={() => navigate("/sendmail")}
          style={{margin:"auto"}}
        >
          COMPOSE    
        </button>
        <button
          className=" btn btn-primary mt-2"
          onClick={() => navigate("/sent")}
          style={{marginLeft:"10px"}}
        >
          SENT
        </button>
        <div className="m-2 mx-5">
          {allMails?.map((e) => (
            <div className='d-flex gap-3'>
              <div
                key={e.id}
                style={{ cursor: "pointer" , width : '90%' }}
                className=" rounded-3 shadow p-3 d-flex justify-content-between"
                onClick={() => {
                  handleRead(e.id);
                  navigate(`/inbox/${e.id}`);
                }}
              >
                {!e.isReaded && (
                  <RxDotFilled
                    className="mt-1 text-primary"
                    style={{ fontSize: "20px" }}
                  />
                )}
                <div>
                  <b className={e.isReaded ? "fw-normal" : "fw-bold"}>
                    {e.senderMail}
                  </b>
                </div>
                <div>
                  <b className={e.isReaded ? "fw-normal m-2" : "fw-bold m-2"}>
                    {e.subject}
                  </b>
                  <span className=" fw-light">{e.mail}</span>
                </div>
              </div>
              <button
  onClick={() => {
    dispatch(deleteMail(e.id));
  }}
  className="btn btn-sm btn-danger" // added btn-danger class
  style={{ marginLeft: "10px" }} // added inline style
>
  DELETE
</button>

            </div>
          ))}
        </div>
      </>
    );
}

export default Inbox