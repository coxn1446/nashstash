import React from 'react';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="text-center p-card">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">
          Nash Stash
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A collection of games for the App Store
        </p>
        <div className="bg-white rounded-lg shadow-lg p-card max-w-md mx-auto">
          <p className="text-gray-500">
            App shell ready for development. Start building your games!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;

