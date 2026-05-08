// import { useState } from "react";
// import axios from "axios";
// import BASE_URL from "../api";
// import { useAuth } from "../context/AuthContext";

// function ImageCard({ img }) {
//   const [comment, setComment] = useState("");
//   const { user } = useAuth();

//   const submitComment = async () => {
//     if (!comment) return;

//     try {
//       await axios.post(`${BASE_URL}/comment`, {
//         filename: img.id,
//         comment: comment,
//         user_email: user.email
//       });

//       alert("Comment added");
//       setComment("");
//       window.location.reload(); // simple refresh
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div
//       style={{
//         background: "#1e293b",
//         borderRadius: "15px",
//         overflow: "hidden",
//         boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
//       }}
//     >
//       {/* IMAGE */}
//       <img
//         src={img.url}
//         alt=""
//         style={{
//           width: "100%",
//           height: "200px",
//           objectFit: "cover"
//         }}
//       />

//       <div style={{ padding: "15px" }}>
//         {/* CAPTION */}
//         <h4 style={{ marginBottom: "10px" }}>
//           {img.caption || "No caption"}
//         </h4>

//         {/* TAGS */}
//         <div style={{ marginBottom: "10px" }}>
//           {(img.tags || []).slice(0, 3).map((tag, i) => (
//             <span
//               key={i}
//               style={{
//                 background: "#334155",
//                 padding: "5px 10px",
//                 borderRadius: "20px",
//                 marginRight: "5px",
//                 fontSize: "12px"
//               }}
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* COMMENTS */}
//         <div style={{ marginTop: "10px" }}>
//           {(img.comments || []).slice(-2).map((c, i) => (
//             <p key={i} style={{ fontSize: "12px", opacity: 0.8 }}>
//               💬 {c}
//             </p>
//           ))}
//         </div>

//         {/* ONLY CONSUMER CAN COMMENT */}
//         {user.role === "consumer" && (
//           <>
//             <input
//               placeholder="Write comment..."
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               style={{
//                 marginTop: "10px",
//                 padding: "8px",
//                 width: "100%",
//                 borderRadius: "10px",
//                 border: "none"
//               }}
//             />

//             <button
//               onClick={submitComment}
//               style={{
//                 marginTop: "10px",
//                 width: "100%",
//                 padding: "10px",
//                 borderRadius: "10px",
//                 background: "#3b82f6",
//                 color: "white",
//                 border: "none"
//               }}
//             >
//               Post
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ImageCard;



import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import { useAuth } from "../context/AuthContext";

function ImageCard({ img }) {
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const submitComment = async () => {
    if (!comment) return;

    try {
      await axios.post(`${BASE_URL}/comment`, {
        filename: img.id,
        comment: comment,
        user_email: user.email
      });

      alert("Comment added");
      setComment("");
      window.location.reload(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        background: "#000000",
        marginBottom: "24px",
        borderBottom: "1px solid #262626", // IG posts usually separate by borders or space
        paddingBottom: "16px"
      }}
    >
      {/* HEADER: User info area */}
      <div style={{ display: "flex", alignItems: "center", padding: "12px 4px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#262626", marginRight: "10px" }} />
        <span style={{ fontWeight: "600", fontSize: "14px" }}>{user?.email.split('@')[0] || "username"}</span>
        <span style={{ margin: "0 5px", color: "#a8a8a8" }}>•</span>
        <span style={{ color: "#0095f6", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>Follow</span>
      </div>

      {/* IMAGE: Full width, no rounded corners to match the feed */}
      <img
        src={img.url}
        alt=""
        style={{
          width: "100%",
          maxHeight: "585px",
          objectFit: "cover",
          border: "1px solid #262626",
          borderRadius: "4px"
        }}
      />

      {/* ICON PLACEHOLDERS (Visual only to match your image) */}
      <div style={{ display: "flex", padding: "12px 0", gap: "16px", fontSize: "24px" }}>
        <span>♡</span> <span>💬</span> <span>✈️</span>
        <span style={{ marginLeft: "auto" }}>🔖</span>
      </div>

      <div style={{ padding: "0 4px" }}>
        {/* LIKES PLACEHOLDER */}
        <div style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px" }}>0 likes</div>

        {/* CAPTION */}
        <div style={{ fontSize: "14px", lineHeight: "1.5" }}>
          <span style={{ fontWeight: "600", marginRight: "8px" }}>{user?.email.split('@')[0] || "username"}</span>
          {img.caption || "No caption"}
        </div>

        {/* TAGS */}
        <div style={{ marginTop: "8px" }}>
          {(img.tags || []).slice(0, 3).map((tag, i) => (
            <span
              key={i}
              style={{
                color: "#00376b", // IG tag blue
                marginRight: "5px",
                fontSize: "14px"
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* COMMENTS */}
        <div style={{ marginTop: "10px" }}>
          {(img.comments || []).length > 0 && (
            <div style={{ color: "#a8a8a8", fontSize: "14px", marginBottom: "8px", cursor: "pointer" }}>
              View all {(img.comments || []).length} comments
            </div>
          )}
          {(img.comments || []).slice(-2).map((c, i) => (
            <p key={i} style={{ fontSize: "14px", margin: "4px 0" }}>
              <span style={{ fontWeight: "600", marginRight: "8px" }}>user</span> {c}
            </p>
          ))}
        </div>

        {/* ONLY CONSUMER CAN COMMENT */}
        {user.role === "consumer" && (
          <div style={{ display: "flex", alignItems: "center", marginTop: "12px", borderTop: "1px solid #262626", paddingTop: "8px" }}>
            <input
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                flex: 1,
                background: "transparent",
                color: "white",
                padding: "8px 0",
                border: "none",
                outline: "none",
                fontSize: "14px"
              }}
            />
            <button
              onClick={submitComment}
              style={{
                background: "transparent",
                color: comment ? "#0095f6" : "#00376b",
                border: "none",
                fontWeight: "600",
                cursor: comment ? "pointer" : "default",
                fontSize: "14px"
              }}
              disabled={!comment}
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageCard;