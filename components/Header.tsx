'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              <Image 
                src="/logo.png" 
                alt="Algorithm Visualizer Logo" 
                width={32} 
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ALG
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}