import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxDotFilled } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../../store/MailSlicer';

const SentMail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getAllSentMails();
  }, []);

  const { allMails } = useSelector((state) => state.mail);
  const dispatch = useDispatch();

  const getAllSentMails = async () => {
    const userEmail = localStorage.getItem('userEmail') || 'abc@gmail.com';
    const res = await axios.get(
      `https://mailboxclient-c494d-default-rtdb.firebaseio.com/inbox/${userEmail.split('@')[0]}.json`
    );
    let s = [];
    for (let key in res.data) {
      s.push({ ...res.data[key], id: key });
    }
    dispatch(mailActions.setMail(s));
  };

  const handleRead = async (id) => {
    const userEmail = localStorage.getItem('userEmail') || 'abc@gmail.com';
    const res = await axios.patch(`https://mailboxclient-c494d-default-rtdb.firebaseio.com/inbox/${userEmail.split('@')[0]}/${id}.json`, { isReaded: true });
    getAllSentMails();
  };

  const handleDelete = async (id) => {
    try {
      const userEmail = localStorage.getItem("userEmail") || "abc@gmail.com";
      await axios.delete(
        `https://mailboxclient-c494d-default-rtdb.firebaseio.com/inbox/${userEmail.split('@')[0]}/${id}.json`
      );
      dispatch(mailActions.deleteMail(id));
      navigate("/sentmail");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="m-2 mx-5">
        {allMails?.map((e) => (
          <div
            key={e.id}
            style={{ cursor: 'pointer' }}
            className="rounded-3 shadow p-3 d-flex justify-content-between"
            onClick={() => {
              handleRead(e.id);
              navigate(`/sentmail/${e.id}`);
            }}
          >
            {!e.isReaded && <RxDotFilled className="mt-1 text-primary" style={{ fontSize: '20px' }} />}
            <div>
              <b className={e.isReaded ? 'fw-normal' : 'fw-bold'}>{e.recipientMail}</b>
            </div>
            <div>
              <b className={e.isReaded ? 'fw-normal m-2' : 'fw-bold m-2'}>{e.subject}</b>
              <span className="fw-light">{e.mail}</span>
              <button className="btn btn-danger ms-2" onClick={() => handleDelete(e.id, e.recipientMail)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SentMail;
