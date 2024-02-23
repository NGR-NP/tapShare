import React from "react";
import { useStore } from "../../utility/store";
import UploadingAnimation from "../animated/uploadingAnimation";
import { useNavigate } from "react-router-dom";

export default function UploadFiles({ setToasterData }) {
  // store calls
  const navigate = useNavigate();
  const send_file = useStore((state) => state.send_file);
  const filesData = useStore((state) => state.filesData);
  const loading = useStore((state) => state.loading);
  const zipping = useStore((state) => state.zipping);
  const setReceiverEmail = useStore((state) => state.setReceiverEmail);
  const setFiles = useStore((state) => state.setFiles);
  const emailData = useStore((state) => state.emailData);
  const setEmailData = useStore((state) => state.setEmailData);
  const validEmailToAdd = useStore((state) => state.validEmailToAdd);
  const receiverEmail = useStore((state) => state.receiverEmail);
  // console.log(filesData);
  // handles email adding to the array
  const handleEmailAddClick = (data) => {
    if (data?.value && !validEmailToAdd) {
      setToasterData({
        open: true,
        message: "One of the email is invalid",
        severity: "warning",
      });
      return;
    }
    if (
      Array.isArray(receiverEmail) &&
      receiverEmail.some((email) => email.value === data.value)
    ) {
      setToasterData({
        open: true,
        message: "Email/phone already exists",
        severity: "warning",
      });
      return;
    }
    if (!validEmailToAdd) {
      setToasterData({
        open: true,
        message: "Invalid email/phone",
        severity: "warning",
      });
      return;
    }
    setReceiverEmail(data);
    setEmailData({ type: "", value: "" });
    uploadFile();
  };

  function uploadFile() {
    send_file(filesData, setToasterData, setFiles, navigate);
  }

  return (
    <>
      {loading ? (
        <div className="w-fit h-fit mt-4">
          {!zipping ? (
            <UploadingAnimation />
          ) : (
            <UploadingAnimation name="zipping" />
          )}
        </div>
      ) : (
        <>
          {Array.isArray(receiverEmail) &&
            receiverEmail.length <= 0 &&
            !validEmailToAdd && (
              <>
                <button
                  role="button"
                  className="bg-blue-500 p-0 text-gray-50 rounded-full text-center mt-2 font-semibold hover:bg-blue-600 ease-in transition-all duration-300 hover:scale-110 py-2 px-5"
                  onClick={uploadFile}
                  title={zipping ? "file is too large please wait while zipping" : "Generate Link"}
                >
                  {zipping ? "zipping..." : "Generate Link"}
                </button>
              </>
            )}
          {((Array.isArray(receiverEmail) && receiverEmail.length > 0) ||
            validEmailToAdd) && (
            <>
              <button
                role="button"
                className="bg-blue-500 p-0 text-gray-50 rounded-full text-center mt-2 font-semibold hover:bg-blue-600 ease-in transition-all duration-300 hover:scale-110 py-2 px-5"
                onClick={() => {
                  handleEmailAddClick(emailData);
                }}
                title={zipping ? "file is too large please wait while zipping" : "send email"}
              >
                {zipping ? "zipping..." : "Send Now"}
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}
