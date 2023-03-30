import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Mail = () => {
  const { id } = useParams()
  const { allMails } = useSelector((state) => state.mail);
  const mail = allMails.find((e) => e.id === id)

  if (!mail) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3>Sent by: {mail.senderMail}</h3>
      <p>Subject: {mail.subject}</p>
      <p>{mail.mail}</p>
    </div>
  );
}

export default Mail
