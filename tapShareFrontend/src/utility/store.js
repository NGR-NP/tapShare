import { create } from "zustand";
import axios from "axios";
import { baseUrl } from "../config";
import generateUserId from "./generateUserId";
import JSZip from "jszip";

export const useStore = create((set, get) => ({
  loading: false,
  progress: 0,
  fireButton: false,
  files: [],
  emailData: {
    value: "",
    type: "",
  },
  filesData: [],
  zipping: false,
  removeFileByName: (fileName) => {
    set((state) => ({
      files: state.files.filter((file) => file.name !== fileName),
    }));
  },
  setEmailData: (email) =>
    set((set) => ({
      emailData: {
        ...set.emailData,
        ...email,
      },
    })),
  receiverEmail: [],
  isReceiverValid: false,
  setLoading: (isLoading) => set({ loading: isLoading }),
  setIsReceiverValid: (isValid) => set({ isReceiverValid: isValid }),
  validEmailToAdd: false,
  setValidEmailToAdd: (isValid) => set({ validEmailToAdd: isValid }),
  setReceiverEmail: (email) =>
    set((state) => ({
      receiverEmail: [...state.receiverEmail, email],
    })),
  replaceReceiverEmail: (email) =>
    set(() => ({
      receiverEmail: email,
    })),
  setFiles: async (newFiles, setToasterData) => {
    if (!newFiles.length) return set({ files: [] });

    const existingFiles = get().files;

    const uniqueFiles = newFiles.filter(
      (newFile) =>
        !existingFiles.some(
          (existingFile) => existingFile.name === newFile.name
        )
    );
    const file = [...existingFiles, ...uniqueFiles];
    set({ files: file });
    try {
      set({ zipping: true });
      const zippedFiles = await Promise.all(
        file.map(async (file) => {
          const zip = new JSZip();
          if (file.type === "") {
            const zippedBlob = await zip.generateAsync({ type: "blob" });
            const zippedFile = new File([zippedBlob], file.name + ".zip");
            return zippedFile;
          } else if (file.size > 1 * 1024 * 1024) {
            zip.file(file.name, file);
            const zippedBlob = await zip.generateAsync({ type: "blob" });
            const zippedFile = new File([zippedBlob], file.name + ".zip");
            return zippedFile;
          } else {
            return file;
          }
        })
      );

      set({ filesData: zippedFiles });
    } catch (error) {
      console.error("Error handling files:", error);
      setToasterData({
        open: true,
        message: "Error handling files",
        severity: "error",
      });
    } finally {
      set({ zipping: false });
      set({ loading: false });
    }
  },
  send_file: async (file, setToasterData, setFiles, navigate) => {
    const files = get().files;
    const filesData = get().filesData;
    if (files.length !== filesData.length) {
      set({ loading: true });
      return setToasterData({
        open: true,
        message: "file is not zipped yet please wait",
        severity: "info",
      });
    }

    if (
      localStorage.getItem("userId") == null ||
      localStorage.getItem("userId") == "" ||
      localStorage.getItem("userId") == undefined
    ) {
      const userId = generateUserId();
      localStorage.setItem("userId", userId);
      set({ fireButton: true });
    }
    // get the public ip address of the device
    const response = await axios.get("https://api64.ipify.org?format=json");
    const ipAddress = response.data.ip;

    const formData = new FormData();
    formData.append("email", JSON.stringify(get().receiverEmail));
    formData.append("userId", localStorage.getItem("userId"));
    formData.append("ipAddress", ipAddress);
    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }
    try {
      set({ loading: true });
      const res = await axios.post(`${baseUrl}api/v1/sendFile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          set({ progress: percentCompleted });
        },
      });

      if (res.data.status === 200) {
        setToasterData({
          open: true,
          message: "files sent successfully",
          severity: "success",
        });
        set(() => ({
          receiverEmail: [],
        }));
        set(() => ({
          emailData: {
            value: "",
            type: "",
          },
        }));
        setFiles([]);
      } else if (res.data.status === 201) {
        setFiles([]);
        set(() => ({
          emailData: {
            value: "",
            type: "",
          },
        }));
        navigate("/" + localStorage.getItem("userId"));
        // "http://127.0.0.1:5173/" + localStorage.getItem("userId");
        // navigate("/seeAllMyFiles");
      } else {
        setToasterData({
          open: true,
          message: "Error sending files",
          severity: "error",
        });
      }
    } catch (error) {
      setToasterData({
        open: true,
        message: "Error sending files",
        severity: "error",
      });
      // window.location.href =
      // "https://ngr-np-obscure-waddle-rwqqq5gpgw6hwj7x-5173.preview.app.github.dev/" + localStorage.getItem("userId");
    } finally {
      set({ loading: false });
    }
  },
}));
