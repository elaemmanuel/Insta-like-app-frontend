


import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import MainLayout from "../layouts/MainLayout";
import ImageCard from "../components/ImageCard";

function Feed() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/images`);
      setImages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-10">
        
        {/* MAIN FEED */}
        <div className="max-w-2xl w-full mx-auto">
          
          {/* SEARCH */}
          <div className="sticky top-20 z-20 backdrop-blur-md bg-black/70 pb-4">
            <div className="relative">
              
              <input
                type="text"
                placeholder="Search captions, AI tags, creators..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500 transition-all"
              />

              <span className="absolute right-5 top-4 text-zinc-500">
                🔍
              </span>
            </div>
          </div>

          {/* STORIES */}
          <div className="flex gap-5 overflow-x-auto py-6 scrollbar-hide">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center min-w-[72px]"
              >
                <div className="p-[2px] rounded-full bg-gradient-to-br from-fuchsia-500 via-red-500 to-yellow-500">
                  <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-zinc-800"></div>
                  </div>
                </div>

                <span className="text-xs text-zinc-400 mt-2">
                  creator{i}
                </span>
              </div>
            ))}
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-20 text-zinc-500">
              Loading feed...
            </div>
          )}

          {/* NO RESULTS */}
          {!loading && filteredImages.length === 0 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center mt-8">
              <h3 className="text-xl font-semibold text-white mb-2">
                No content found
              </h3>

              <p className="text-zinc-500">
                Try searching with different keywords or AI tags.
              </p>
            </div>
          )}

          {!loading && images.length === 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              No Media Yet
            </h2>

            <p className="text-zinc-500">
              Upload content from Creator Studio to populate the feed.
            </p>
          </div>
        )}

          {/* POSTS */}
          <div className="space-y-8">
            {filteredImages.map((img, i) => (
              <ImageCard
              key={i}
              img={img}
              onCommentAdded={(newComment) => {
                setImages((prev) =>
                  prev.map((item) =>
                    item.id === img.id
                      ? {
                          ...item,
                          comments: [...(item.comments || []), newComment]
                        }
                      : item
                  )
                );
              }}
            />
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="hidden xl:block">
          
          <div className="sticky top-24 space-y-6">
            
            {/* ABOUT */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              
              <h3 className="text-white font-semibold text-lg mb-3">
                About Elari's Media platform
              </h3>

              <p className="text-zinc-400 text-sm leading-6">
                Elari's media platform is a scalable cloud-native media sharing platform powered
                by Azure services, asynchronous processing, Redis caching,
                AI tagging, and distributed cloud storage.
              </p>
            </div>

            {/* FEATURES */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              
              <h3 className="text-white font-semibold text-lg mb-4">
                Platform Features
              </h3>

              <div className="space-y-3 text-sm">
                
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">
                    AI Vision Tagging
                  </span>

                  <span className="text-green-400">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">
                    Redis Caching
                  </span>

                  <span className="text-green-400">
                    Connected
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">
                    Azure Functions
                  </span>

                  <span className="text-green-400">
                    Running
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">
                    Blob Storage
                  </span>

                  <span className="text-green-400">
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* CLOUD */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-6">
              
              <h3 className="text-black font-bold text-xl mb-2">
                Cloud-Native
              </h3>

              <p className="text-black/80 text-sm leading-6">
                Designed with distributed cloud architecture principles for
                scalable enterprise deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Feed;