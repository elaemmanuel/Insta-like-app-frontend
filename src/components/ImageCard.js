


import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import { useAuth } from "../context/AuthContext";

import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Sparkles
} from "lucide-react";

function ImageCard({ img, onCommentAdded }) {

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // IMAGE LOADING STATE
  const [imageLoaded, setImageLoaded] = useState(false);

  // LOCAL COMMENTS STATE
  const [comments, setComments] = useState(img.comments || []);

  // SHOW/HIDE COMMENTS
  const [showAllComments, setShowAllComments] = useState(false);

  const { user } = useAuth();

  const submitComment = async () => {
    if (!comment) return;

    try {
      setLoading(true);

      await axios.post(`${BASE_URL}/comment`, {
        filename: img.id,
        comment,
        user_email: user.email
      });

      // UPDATE COMMENTS INSTANTLY
      const updatedComments = [...comments, comment];
      setComments(updatedComments);

      // OPTIONAL CALLBACK
      if (onCommentAdded) {
        onCommentAdded(comment);
      }

      // SUCCESS TOAST
      toast.success("Comment added");

      // CLEAR INPUT
      setComment("");

    } catch (err) {
      console.error(err);

      // ERROR TOAST
      toast.error("Failed to post comment");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden mb-10 shadow-xl">

      {/* HEADER */}
      <div className="flex items-center justify-between px-5 py-4">

        <div className="flex items-center gap-3">

          {/* AVATAR */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-[2px]">

            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-sm font-bold text-white">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

          </div>

          {/* USER INFO */}
          <div>

            <h3 className="font-semibold text-white text-sm">
              {img.created_by?.split("@")[0]}
            </h3>

            <p className="text-zinc-500 text-xs">
              {img.location || "Global Media"}
            </p>

          </div>

        </div>

        {/* FOLLOW BUTTON */}
        <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition">
          Follow
        </button>

      </div>

      {/* IMAGE */}
      <div className="relative bg-black">

        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-zinc-900" />
        )}

        <img
          src={img.url}
          alt=""
          onLoad={() => setImageLoaded(true)}
          className={`w-full max-h-[700px] object-contain bg-black transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

      </div>

      {/* BODY */}
      <div className="px-5 py-4">

        {/* ACTION BUTTONS */}
        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center gap-5">

            <button className="hover:scale-110 transition">
              <Heart size={24} />
            </button>

            <button className="hover:scale-110 transition">
              <MessageCircle size={24} />
            </button>

            <button className="hover:scale-110 transition">
              <Send size={24} />
            </button>

          </div>

          <button className="hover:scale-110 transition">
            <Bookmark size={24} />
          </button>

        </div>

        {/* AI TAGS */}
        {img.tags?.length > 0 && (

          <div className="flex flex-wrap gap-2 mb-4">

            {img.tags.slice(0, 5).map((tag, i) => (

              <div
                key={i}
                className="bg-blue-500/10 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/20 flex items-center gap-1"
              >

                <Sparkles size={12} />

                {tag}

              </div>

            ))}

          </div>

        )}

        {/* CAPTION */}
        <div className="text-sm leading-relaxed mb-4">

          <span className="font-semibold mr-2 text-white">
            {user?.email?.split("@")[0]}
          </span>

          <span className="text-zinc-300">
            {img.caption || "No caption"}
          </span>

        </div>

        {/* VIEW COMMENTS BUTTON */}
        {comments.length > 2 && !showAllComments && (

          <button
            onClick={() => setShowAllComments(true)}
            className="text-zinc-500 text-sm hover:text-zinc-300 transition mb-3"
          >
            View all {comments.length} comments
          </button>

        )}

        {/* COMMENTS */}
        <div className="space-y-2 mb-4">

          {(showAllComments
            ? comments
            : comments.slice(-2)
          ).map((c, i) => (

            <div key={i} className="text-sm">

              <span className="font-semibold mr-2 text-white">
                user
              </span>

              <span className="text-zinc-400">
                {c}
              </span>

            </div>

          ))}

        </div>

        {/* COMMENT BOX */}
        {user?.role === "consumer" && (

          <div className="flex items-center gap-3 border border-zinc-800 bg-zinc-900 rounded-2xl px-4 py-2">

            <input
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-transparent flex-1 outline-none text-sm text-white"
            />

            <button
              onClick={submitComment}
              disabled={!comment || loading}
              className="text-blue-400 font-medium text-sm disabled:text-zinc-600 hover:text-blue-300 transition"
            >
              {loading ? "Posting..." : "Post"}
            </button>

          </div>

        )}

      </div>
    </div>
  );
}

export default ImageCard;