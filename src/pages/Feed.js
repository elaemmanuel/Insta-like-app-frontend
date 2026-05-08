// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import BASE_URL from "../api";
// import MainLayout from "../layouts/MainLayout";
// import ImageCard from "../components/ImageCard";

// function Feed() {
//   const [images, setImages] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const fetchImages = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/images`);
//       setImages(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const filteredImages = images.filter((img) => {
//     const text = search.toLowerCase();
//     return (
//       (img.caption || "").toLowerCase().includes(text) ||
//       (img.tags || []).join(" ").toLowerCase().includes(text)
//     );
//   });

//   return (
//     <MainLayout>
//       {/* HEADER */}
//       <div style={{ marginBottom: "30px" }}>
//         <h2 style={{ marginBottom: "10px" }}>Explore</h2>

//         <input
//           type="text"
//           placeholder="Search by caption or tags..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             padding: "12px",
//             width: "300px",
//             borderRadius: "25px",
//             border: "none",
//             outline: "none"
//           }}
//         />
//       </div>

//       {/* GRID */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//           gap: "25px"
//         }}
//       >
//         {filteredImages.map((img, i) => (
//           <ImageCard key={i} img={img} />
//         ))}
//       </div>
//     </MainLayout>
//   );
// }

// export default Feed;



import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import MainLayout from "../layouts/MainLayout";
import ImageCard from "../components/ImageCard";

function Feed() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/images`);
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredImages = images.filter((img) => {
    const text = search.toLowerCase();
    return (
      (img.caption || "").toLowerCase().includes(text) ||
      (img.tags || []).join(" ").toLowerCase().includes(text)
    );
  });

  return (
    <MainLayout>
      <div style={{ display: "flex", justifyContent: "center", gap: "64px" }}>
        
        {/* CENTER FEED */}
        <div style={{ width: "100%", maxWidth: "470px" }}>
          
          {/* SEARCH BAR (Matching the Explore look) */}
          <div style={{ marginBottom: "24px" }}>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "10px 16px",
                width: "100%",
                borderRadius: "8px",
                background: "#262626",
                border: "none",
                color: "white",
                outline: "none"
              }}
            />
          </div>

          {/* STORIES BAR (The circles at the top of the image) */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "30px", overflowX: "auto", padding: "10px 0" }}>
             {[1,2,3,4,5,6].map(i => (
               <div key={i} style={{ minWidth: "66px", textAlign: "center" }}>
                 <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", padding: "2px" }}>
                   <div style={{ width: "100%", height: "100%", backgroundColor: "black", borderRadius: "50%", border: "2px solid black" }} />
                 </div>
                 <div style={{ fontSize: "12px", marginTop: "4px", color: "#a8a8a8" }}>username</div>
               </div>
             ))}
          </div>

          {/* POSTS LIST */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filteredImages.map((img, i) => (
              <ImageCard key={i} img={img} />
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR (The 'Suggested for you' section) */}
        <div style={{ width: "320px", paddingTop: "10px", display: "none" /* Show this only on desktop */ }}>
           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
             <span style={{ color: "#a8a8a8", fontWeight: "600", fontSize: "14px" }}>Suggested for you</span>
             <span style={{ fontWeight: "600", fontSize: "12px", cursor: "pointer" }}>See All</span>
           </div>
           {/* Logic-free placeholder to match visual UI */}
           <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#262626" }} />
              <div style={{ flex: 1, marginLeft: "12px" }}>
                 <div style={{ fontWeight: "600", fontSize: "14px" }}>Radix UI</div>
                 <div style={{ color: "#a8a8a8", fontSize: "12px" }}>Suggested for you</div>
              </div>
              <span style={{ color: "#0095f6", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Follow</span>
           </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Feed;