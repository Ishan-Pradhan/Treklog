"use client";

function Loading() {
  return (
    <div className="container my-10 max-w-3xl mx-auto p-4 space-y-4">
      <div className="h-64 bg-gray-300 rounded-xl animate-pulse" />
      <div className="h-6 bg-gray-300 rounded w-2/3 animate-pulse" />
      <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse" />
      <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
      <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
      <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse" />
    </div>
  );
}

export default Loading;
