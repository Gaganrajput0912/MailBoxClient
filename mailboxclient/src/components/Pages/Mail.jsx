// import axios from 'axios'
// import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Mail = () => {
    const { id } = useParams()
    const { allMails } = useSelector((state) => state.mail);
    const mail = allMails.find((e)=>e.id==id)
  return (
    <div>
      <h3>Sended by : {mail.senderMail}</h3>
      <p>subject : {mail.subject}</p>
      <p>{mail.mail}</p>
    </div>
  );
}

export default Mail