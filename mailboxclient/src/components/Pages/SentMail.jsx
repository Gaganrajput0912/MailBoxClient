import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDotFilled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { deleteMail, fetchAllMails, fetchSendedMail, mailActions } from "../../store/MailSlicer";
import { AiFillDelete } from "react-icons/ai";

const SentMail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSendedMail());
  }, []);

  const { sendedMail } = useSelector((state) => state.mail);
console.log(sendedMail)


  return (
    <>
      <button
        className=" btn btn-primary mt-2"
        onClick={() => navigate("/sendmail")}
      >
        COMPOSE
      </button>
      <div className="m-2 mx-5">
        {sendedMail?.map((e) => (
          <div className="d-flex gap-3">
            <div
              key={e.id}
              style={{ cursor: "pointer", width: "90%" }}
              className=" rounded-3 shadow p-3 d-flex justify-content-between"
            >
              <div>
                <b className={e.isReaded ? "fw-normal" : "fw-bold"}>
                  {e.email}
                </b>
              </div>
              <div>
                <b className={e.isReaded ? "fw-normal m-2" : "fw-bold m-2"}>
                  {e.subject}
                </b>
                <span className=" fw-light">{e.mail}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SentMail;