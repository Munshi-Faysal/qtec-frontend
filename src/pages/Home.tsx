// src/pages/Home.tsx
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 min-h-screen flex items-center justify-center text-white px-6 py-20">
      <div className="text-center max-w-3xl">
        {/* Badge / Tag */}
        <span className="inline-block bg-white text-indigo-700 font-semibold px-4 py-1 rounded-full text-sm mb-4 shadow">
          Technical Task Submission
        </span>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          Qtec Technical Task
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl font-medium text-gray-200 mb-6">
          Submitted by <span className="text-white font-bold">Munshi Faysal Ahmed</span> — Backend Team Lead
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Build modern UI with <span className="font-semibold text-white">React</span>, <span className="font-semibold text-white">TypeScript</span>, and <span className="font-semibold text-white">Tailwind CSS</span> — all in a clean, component-based architecture. 🚀
        </p>

        {/* CTA */}
        <a
          href="/account"
          className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full text-lg shadow-lg hover:bg-gray-100 transition duration-300"
        >
          View Account Module
        </a>
      </div>
    </div>
  );
};

export default Home;
