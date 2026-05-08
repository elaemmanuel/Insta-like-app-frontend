import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

function CreatorDashboard() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [people, setPeople] = useState("");

  const { user } = useAuth();

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("people", people);
    formData.append("user_email", user.email);
    console.log("USER OBJECT:", user);

    try {
      await axios.post(`${BASE_URL}/upload`, formData);
      alert("Uploaded successfully");

      setFile(null);
      setCaption("");
      setTitle("");
      setLocation("");
      setPeople("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <h2>Create Content</h2>

      <div
        style={{
          marginTop: "20px",
          background: "#1e293b",
          padding: "20px",
          borderRadius: "15px",
          maxWidth: "500px"
        }}
      >
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          placeholder="People (comma separated)"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />

        <button onClick={handleUpload}>Upload</button>
      </div>
    </MainLayout>
  );
}

export default CreatorDashboard;



