'use client';

interface ControlPanelProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onGenerateArray?: () => void;
  hideGenerateArray?: boolean;
}

export default function ControlPanel({ 
  isPlaying, 
  onPlay, 
  onPause, 
  onReset, 
  onGenerateArray,
  hideGenerateArray = false
}: ControlPanelProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={isPlaying ? onPause : onPlay}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            isPlaying 
              ? 'bg-orange-600 hover:bg-orange-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          <i className={`ri-${isPlaying ? 'pause' : 'play'}-fill text-lg`}></i>
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>
        
        <button
          onClick={onReset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-restart-line text-lg"></i>
          <span>Reset</span>
        </button>
        
        {!hideGenerateArray && onGenerateArray && (
          <button
            onClick={onGenerateArray}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-shuffle-line text-lg"></i>
            <span>New Array</span>
          </button>
        )}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-400">
        <p>Use controls to visualize algorithm execution step by step</p>
      </div>
    </div>
  );
}