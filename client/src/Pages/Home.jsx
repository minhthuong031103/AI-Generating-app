import React, { useState, useEffect } from 'react';

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p>hehe</p>
      </div>
    </section>
  );
}
