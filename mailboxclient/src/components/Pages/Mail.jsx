import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchAllMails } from '../../store/MailSlicer'

const Mail = () => {
  const { id } = useParams()
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllMails());
  }, []);
    const { allMails } = useSelector((state) => state.mail);
    const mail = allMails.find((e)=>e.id==id)
  return (
    <div>
      <h3>Sended by : {mail?.senderMail}</h3>
      <p>subject : {mail?.subject}</p>
      <p>{mail?.mail}</p>
    </div>
  );
}

export default Mail