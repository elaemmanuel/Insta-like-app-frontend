import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

import {
  Upload,
  Image as ImageIcon,
  MapPin,
  Users,
  Type,
  Loader2
} from "lucide-react";

function CreatorDashboard() {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [people, setPeople] = useState("");

  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const handleUpload = async () => {

    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("caption", caption);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("people", people);
    formData.append("user_email", user.email);

    try {

      setLoading(true);

      await axios.post(`${BASE_URL}/upload`, formData);

      toast.success("Content uploaded successfully");

      // RESET STATES
      setFile(null);
      setPreview(null);

      setCaption("");
      setTitle("");
      setLocation("");
      setPeople("");

    } catch (err) {

      console.error(err);
      toast.error("Upload failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <MainLayout>

      <div className="max-w-3xl mx-auto w-full">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white">
            Creator Studio
          </h1>

          <p className="text-zinc-400 mt-2">
            Upload and manage scalable AI-powered media content.
          </p>

        </div>

        {/* MAIN CARD */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

          {/* FILE UPLOAD */}
          <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-10 text-center hover:border-blue-500 transition mb-8">

            <div className="flex justify-center mb-4">

              <div className="bg-blue-500/20 p-4 rounded-full">
                <Upload
                  className="text-blue-400"
                  size={40}
                />
              </div>

            </div>

            <h2 className="text-xl font-semibold text-white mb-2">
              Upload Media
            </h2>

            <p className="text-zinc-500 mb-6">
              Select high-quality images to distribute globally.
            </p>

            {/* FILE INPUT */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {

                const selected = e.target.files[0];

                setFile(selected);

                if (selected) {
                  setPreview(
                    URL.createObjectURL(selected)
                  );
                }

              }}
              className="text-sm text-zinc-300"
            />

            {/* FILE NAME */}
            {file && (
              <div className="mt-4 text-green-400 text-sm">
                Selected: {file.name}
              </div>
            )}

            {/* IMAGE PREVIEW */}
            {preview && (

              <div className="mt-6">

                <img
                  src={preview}
                  alt="preview"
                  className="rounded-2xl max-h-[400px] w-full object-cover border border-zinc-800"
                />

              </div>

            )}

          </div>

          {/* FORM GRID */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* TITLE */}
            <div>

              <label className="text-sm text-zinc-400 mb-2 block">
                Title
              </label>

              <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-4">

                <Type
                  className="text-zinc-500"
                  size={18}
                />

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter media title"
                  className="bg-transparent w-full p-4 outline-none text-white"
                />

              </div>

            </div>

            {/* LOCATION */}
            <div>

              <label className="text-sm text-zinc-400 mb-2 block">
                Location
              </label>

              <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-4">

                <MapPin
                  className="text-zinc-500"
                  size={18}
                />

                <input
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  placeholder="Add location"
                  className="bg-transparent w-full p-4 outline-none text-white"
                />

              </div>

            </div>

          </div>

          {/* CAPTION */}
          <div className="mt-5">

            <label className="text-sm text-zinc-400 mb-2 block">
              Caption
            </label>

            <textarea
              value={caption}
              onChange={(e) =>
                setCaption(e.target.value)
              }
              placeholder="Write a caption..."
              rows={4}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none text-white resize-none"
            />

          </div>

          {/* PEOPLE */}
          <div className="mt-5">

            <label className="text-sm text-zinc-400 mb-2 block">
              Tagged People
            </label>

            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-4">

              <Users
                className="text-zinc-500"
                size={18}
              />

              <input
                value={people}
                onChange={(e) =>
                  setPeople(e.target.value)
                }
                placeholder="Comma separated names"
                className="bg-transparent w-full p-4 outline-none text-white"
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition rounded-2xl py-4 font-semibold text-white flex justify-center items-center gap-2 disabled:opacity-60"
          >

            {loading ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={20}
                />
                Uploading...
              </>
            ) : (
              <>
                <ImageIcon size={20} />
                Publish Content
              </>
            )}

          </button>

        </div>

      </div>

    </MainLayout>
  );
}

export default CreatorDashboard;