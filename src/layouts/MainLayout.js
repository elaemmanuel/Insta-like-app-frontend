// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// function MainLayout({ children }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         background: "#0f172a",
//         color: "white",
//         minHeight: "100vh"
//       }}
//     >
//       {/* SIDEBAR */}
//       <Sidebar />

//       {/* MAIN */}
//       <div style={{ flex: 1 }}>
//         <Navbar />

//         <div style={{ padding: "20px" }}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainLayout;




import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        background: "#000000", // Changed to pure black
        color: "#ffffff",      // Pure white text
        minHeight: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
    >
      {/* SIDEBAR - Fixed width typical of IG layout */}
      <div style={{ width: "245px", borderRight: "1px solid #262626" }}>
        <Sidebar />
      </div>

      {/* MAIN CONTAINER */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />

        {/* FEED AREA - Centered and restricted width like the image */}
        <div 
          style={{ 
            padding: "20px 0", 
            display: "flex", 
            justifyContent: "center",
            width: "100%"
          }}
        >
          <div style={{ width: "100%", maxWidth: "470px" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;