'use client';

import { useState } from 'react';

interface Algorithm {
  id: string;
  name: string;
  complexity: string;
}

interface AlgorithmSelectorProps {
  algorithms: Algorithm[];
  selectedAlgorithm: string;
  setSelectedAlgorithm: (id: string) => void;
}

export default function AlgorithmSelector({ 
  algorithms, 
  selectedAlgorithm, 
  setSelectedAlgorithm 
}: AlgorithmSelectorProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Select Algorithm</h2>
        <button
          className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600"
          onClick={() => setCollapsed(c => !c)}
        >{collapsed ? 'Mở rộng' : 'Thu gọn'}</button>
      </div>
      {!collapsed && (
        <div className="divide-y divide-gray-700 bg-gray-800 rounded-lg">
          {algorithms.map((algorithm) => (
            <button
              key={algorithm.id}
              onClick={() => setSelectedAlgorithm(algorithm.id)}
              className={`w-full flex items-center px-4 py-3 text-left transition-all focus:outline-none group ${
                selectedAlgorithm === algorithm.id
                  ? 'bg-purple-600/20 text-white' : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              <span className={`mr-3 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selectedAlgorithm === algorithm.id ? 'border-purple-500 bg-purple-500' : 'border-gray-500'}`}>{selectedAlgorithm === algorithm.id && <span className="w-2 h-2 bg-white rounded-full block" />}</span>
              <span className="flex-1">
                <span className="font-semibold">{algorithm.name}</span>
                <span className="ml-2 text-xs opacity-70">({algorithm.complexity})</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}