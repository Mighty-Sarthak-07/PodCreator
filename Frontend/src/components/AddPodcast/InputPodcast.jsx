import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputPodcast = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [dragging, setDragging] = useState(false);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:1000/api/v1/get-categories");
      setCategories(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) setFrontImage(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFrontImage(file);
    } else {
      toast.error("Invalid file type. Please upload an image.");
    }
  };

  const handleAudioFile = (e) => {
    const file = e.target.files[0];
    if (file) setAudioFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmitPodcast = async () => {
    if (!inputs.title || !inputs.description || !inputs.category) {
      toast.error("Title, description, and category are required!");
      return;
    }
    if (!frontImage) {
      toast.error("Front image is required!");
      return;
    }
    if (!audioFile) {
      toast.error("Audio file is required!");
      return;
    }

    const data = new FormData();
    data.append("title", inputs.title);
    data.append("description", inputs.description);
    data.append("category", inputs.category);
    data.append("frontImage", frontImage);
    data.append("audioFile", audioFile);

    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/add-podcast",
        data,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add podcast");
    } finally {
      setInputs({ title: "", description: "", category: "" });
      setFrontImage(null);
      setAudioFile(null);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="my-4 px-4 lg:px-17">
        <h1 className="text-2xl font-semibold px-7">Create your Podcast</h1>
        <div className="flex flex-col lg:flex-row p-1 lg:p-7">
          <div className="mt-5 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="w-full mr-10 flex items-center justify-center lg:justify-start">
              <div
                className={`h-[25vh] ml-10 lg:h-[60vh] flex items-center justify-center transition-all duration-300 ${
                  dragging ? "bg-blue-200" : "hover:bg-slate-50"
                }`}
                style={{ border: "1px dashed black" }}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="file"
                  name="frontImage"
                  className="hidden"
                  onChange={handleChangeImage}
                />
                {frontImage ? (
                  <img
                    src={URL.createObjectURL(frontImage)}
                    alt="thumbnail"
                    className="h-[100%] w-[100%]"
                  />
                ) : (
                  <label
                    htmlFor="file"
                    className="lg:text-xl h-[100%] p-4 w-[200%] hover:cursor-pointer flex items-center justify-center text-center"
                  >
                    <span>Drag and Drop thumbnail or Click to browse</span>
                  </label>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/6">
            <div className="flex flex-col mt-4">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title for your Podcast"
                className="mt-4 px-4 py-2 outline-none border-zinc-800 rounded border-2"
                value={inputs.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                id="description"
                name="description"
                placeholder="Description for your Podcast"
                className="mt-4 px-4 py-2 outline-none border-zinc-800 rounded border-2"
                value={inputs.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="audioFile">Select Audio</label>
              <input
                type="file"
                accept=".mp3, .wav, .m4a, .ogg"
                id="audioFile"
                className="mt-4 px-4 py-1 outline-none border-zinc-800 rounded border-2"
                onChange={handleAudioFile}
              />
              <label htmlFor="category" className="mt-4">Select Category</label>
              <select
                name="category"
                id="category"
                className="border border-zinc-900 rounded mt-4 outline-none px-5 lg:pr-24 py-2"
                value={inputs.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.categoryName}>
                    {cat.categoryName}
                    </option>
                    ))};
              </select>
            </div>
            <div className="mt-8 lg:mt-6 flex">
              <button
                className="bg-zinc-900 w-full text-white rounded px-8 py-2 font-semibold hover:bg-zinc-700 transition-all duration-300"
                onClick={handleSubmitPodcast}
              >
                Create Podcast
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPodcast;
