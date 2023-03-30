import axios from "axios";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const SendMail = () => {
  const [editorState, setEditorState] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    // Check if all required fields are filled
    if (!userEmail || !subject || !editorState) {
      setErrors({
        userEmail: !userEmail ? "required" : "",
        subject: !subject ? "required" : "",
        editorState: !editorState ? "required" : "",
      });
      return;
    }

    const senderMail =
      localStorage.getItem("userEmail") || "abc@gmail.com";

    const res = await axios.post(
      `https://mailboxclient-c494d-default-rtdb.firebaseio.com/inbox/${
        userEmail.split("@")[0]
      }.json`,
      {
        mail: editorState,
        subject: subject,
        isReaded: false,
        senderMail: senderMail,
      }
    );
    console.log(res);

    alert("Mail sent!");
    setUserEmail("");
    setSubject("");
    setEditorState("");
    setErrors({});
    //   window.location.href = "/inbox";
  };

  return (
    <div>
      <input
        onChange={(e) => setUserEmail(e.target.value)}
        className={`form-control mt-1 ${errors.userEmail ? "is-invalid" : ""}`}
        placeholder="Enter the mail Id"
        type="email"
        required
      />
      {errors.userEmail && (
        <div className="invalid-feedback">{errors.userEmail}</div>
      )}
      <input
        onChange={(e) => setSubject(e.target.value)}
        className={`form-control mt-1 ${errors.subject ? "is-invalid" : ""}`}
        placeholder="Subject"
        required
      />
      {errors.subject && (
        <div className="invalid-feedback">{errors.subject}</div>
      )}
      <Editor
        editorStyle={{ border: "1px solid", padding: "15px" }}
        wrapperStyle={{ padding: "20px" }}
        onEditorStateChange={(e) => console.log(e)}
        onChange={(e) => setEditorState(e.blocks[0].text)}
        required
      />
      {errors.editorState && (
        <div className="invalid-feedback">{errors.editorState}</div>
      )}
      <button className="btn btn-primary" onClick={handleSubmit}>
        SEND MAIL
      </button>
    </div>
  );
};

export default SendMail;
