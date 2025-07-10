'use client';

interface VisualizationAreaProps {
  array: number[];
  comparingIndices: number[];
  sortedIndices: number[];
  type: 'sorting' | 'searching';
  target?: number;
  searchBounds?: { left: number; right: number };
}

export default function VisualizationArea({ 
  array, 
  comparingIndices, 
  sortedIndices, 
  type,
  target,
  searchBounds
}: VisualizationAreaProps) {
  const maxValue = Math.max(...array);

  const getBarColor = (index: number, value: number) => {
    if (sortedIndices.includes(index)) {
      return type === 'searching' ? 'bg-green-500' : 'bg-green-500';
    }
    if (comparingIndices.includes(index)) {
      return 'bg-yellow-500';
    }
    if (type === 'searching' && target === value) {
      return 'bg-purple-500';
    }
    if (type === 'searching' && searchBounds && (index < searchBounds.left || index > searchBounds.right)) {
      return 'bg-gray-600';
    }
    return 'bg-blue-500';
  };

  const getBarHeight = (value: number) => {
    return (value / maxValue) * 200;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-end justify-center space-x-2 h-64">
        {array.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`transition-all duration-300 rounded-t ${getBarColor(index, value)} relative`}
              style={{ 
                height: `${getBarHeight(value)}px`,
                width: '40px'
              }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white font-medium">
                {value}
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">{index}</div>
          </div>
        ))}
      </div>
      
      {type === 'searching' && (
        <div className="mt-4 text-center">
          <span className="text-gray-300">
            Searching for: <span className="text-purple-400 font-semibold">{target}</span>
          </span>
          {searchBounds && (
            <span className="ml-4 text-gray-400">
              Range: [{searchBounds.left}, {searchBounds.right}]
            </span>
          )}
        </div>
      )}
      
      <div className="mt-4 flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-gray-300">Default</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-gray-300">Comparing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-300">{type === 'searching' ? 'Found' : 'Sorted'}</span>
        </div>
        {type === 'searching' && (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-600 rounded"></div>
            <span className="text-gray-300">Out of Range</span>
          </div>
        )}
      </div>
    </div>
  );
}