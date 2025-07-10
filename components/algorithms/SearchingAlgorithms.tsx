
'use client';

import { useState, useEffect, useRef } from 'react';
import AlgorithmSelector from '../AlgorithmSelector';
import VisualizationArea from '../VisualizationArea';
import CodeDisplay from '../CodeDisplay';
import ControlPanel from '../ControlPanel';

export default function SearchingAlgorithms() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('binary');
  const [array, setArray] = useState<number[]>([2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78]);
  const [target, setTarget] = useState(23);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const [currentIndices, setCurrentIndices] = useState<number[]>([]);
  const [foundIndex, setFoundIndex] = useState<number>(-1);
  const [searchBounds, setSearchBounds] = useState<{ left: number; right: number }>({ left: 0, right: 10 });
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const algorithms = [
    { id: 'binary', name: 'Binary Search', complexity: 'O(log n)' },
    { id: 'linear', name: 'Linear Search', complexity: 'O(n)' }
  ];

  const binarySearchCode = `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found target
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Target not found
}`;

  const linearSearchCode = `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found target
    }
  }
  return -1; // Target not found
}`;

  const getAlgorithmCode = () => {
    switch (selectedAlgorithm) {
      case 'binary':
        return binarySearchCode;
      case 'linear':
        return linearSearchCode;
      default:
        return binarySearchCode;
    }
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const reset = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentIndices([]);
    setFoundIndex(-1);
    setSearchBounds({ left: 0, right: array.length - 1 });
    setSteps([]);
    setCurrentStepIdx(0);
    setIsAutoPlaying(false);
  };

  const linearSearchLines = [
    'function linearSearch(arr, target) {',
    '  for (let i = 0; i < arr.length; i++) {',
    '    if (arr[i] === target) {',
    '      return i;',
    '    }',
    '  }',
    '  return -1;',
    '}'
  ];

  const binarySearchLines = [
    'function binarySearch(arr, target) {',
    '  let left = 0, right = arr.length - 1;',
    '  while (left <= right) {',
    '    const mid = Math.floor((left + right) / 2);',
    '    if (arr[mid] === target) {',
    '      return mid;',
    '    } else if (arr[mid] < target) {',
    '      left = mid + 1;',
    '    } else {',
    '      right = mid - 1;',
    '    }',
    '  }',
    '  return -1;',
    '}'
  ];

  const generateLinearSearchSteps = (arr: number[], target: number) => {
    const steps: any[] = [];
    let foundIdx = -1;
    for (let i = 0; i < arr.length; i++) {
      steps.push({
        line: 1,
        arr: [...arr],
        i,
        target,
        found: false,
        desc: `Check arr[${i}] === ${target} (${arr[i]} === ${target})`,
        comparing: [i],
        result: null
      });
      if (arr[i] === target) {
        foundIdx = i;
        steps.push({
          line: 2,
          arr: [...arr],
          i,
          target,
          found: true,
          desc: `Found at index ${i}`,
          comparing: [i],
          result: i
        });
        break;
      }
    }
    if (foundIdx === -1) {
      steps.push({
        line: 5,
        arr: [...arr],
        i: arr.length,
        target,
        found: false,
        desc: `Not found, return -1`,
        comparing: [],
        result: -1
      });
    }
    return steps;
  };

  const generateBinarySearchSteps = (arr: number[], target: number) => {
    const steps: any[] = [];
    let left = 0, right = arr.length - 1;
    let foundIdx = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({
        line: 3,
        arr: [...arr],
        left,
        right,
        mid,
        target,
        desc: `Check arr[${mid}] === ${target} (${arr[mid]} === ${target})`,
        comparing: [mid],
        result: null
      });
      if (arr[mid] === target) {
        foundIdx = mid;
        steps.push({
          line: 4,
          arr: [...arr],
          left,
          right,
          mid,
          target,
          desc: `Found at index ${mid}`,
          comparing: [mid],
          result: mid
        });
        break;
      } else if (arr[mid] < target) {
        steps.push({
          line: 6,
          arr: [...arr],
          left,
          right,
          mid,
          target,
          desc: `arr[${mid}] < ${target}, move left to ${mid + 1}`,
          comparing: [mid],
          result: null
        });
        left = mid + 1;
      } else {
        steps.push({
          line: 8,
          arr: [...arr],
          left,
          right,
          mid,
          target,
          desc: `arr[${mid}] > ${target}, move right to ${mid - 1}`,
          comparing: [mid],
          result: null
        });
        right = mid - 1;
      }
    }
    if (foundIdx === -1) {
      steps.push({
        line: 11,
        arr: [...arr],
        left,
        right,
        mid: null,
        target,
        desc: `Not found, return -1`,
        comparing: [],
        result: -1
      });
    }
    return steps;
  };

  const play = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    isPlayingRef.current = true;
    reset();
    await sleep(100);
    isPlayingRef.current = true;
    let steps = [];
    if (selectedAlgorithm === 'linear') {
      steps = generateLinearSearchSteps(array, target);
    } else if (selectedAlgorithm === 'binary') {
      steps = generateBinarySearchSteps(array, target);
    }
    setSteps(steps);
    setCurrentStepIdx(0);
    setIsAutoPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
  };

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 10 }, (_, i) => (i + 1) * 5 + Math.floor(Math.random() * 4));
    newArray.sort((a, b) => a - b);
    setArray(newArray);
    setTarget(newArray[Math.floor(Math.random() * newArray.length)]);
    reset();
  };

  useEffect(() => {
    reset();
  }, [selectedAlgorithm, target]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Stepper controls for Searching Algorithms
  const handleStepPrev = () => {
    setCurrentStepIdx((idx) => Math.max(0, idx - 1));
    setIsAutoPlaying(false);
    setIsPlaying(false);
  };
  const handleStepNext = () => {
    setCurrentStepIdx((idx) => Math.min(steps.length - 1, idx + 1));
    setIsAutoPlaying(false);
    setIsPlaying(false);
  };

  // Auto play effect
  useEffect(() => {
    if (!isAutoPlaying || steps.length === 0) return;
    if (currentStepIdx >= steps.length - 1) {
      setIsAutoPlaying(false);
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStepIdx((idx) => Math.min(steps.length - 1, idx + 1));
    }, 900);
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentStepIdx, steps.length]);

  return (
    <div className="space-y-6">
      <AlgorithmSelector
        algorithms={algorithms}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
      />
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <label className="text-gray-300">Target Value:</label>
          <input
            type="number"
            title="Target Value"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-purple-500 outline-none text-sm"
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <VisualizationArea
            array={steps.length > 0 ? steps[currentStepIdx].arr : array}
            comparingIndices={steps.length > 0 ? steps[currentStepIdx].comparing : currentIndices}
            sortedIndices={[]}
            type="searching"
            target={target}
            searchBounds={searchBounds}
          />
          <ControlPanel
            isPlaying={isPlaying}
            onPlay={play}
            onPause={pause}
            onReset={reset}
            onGenerateArray={generateRandomArray}
          />
          {/* Stepper controls for Searching Algorithms */}
          {steps.length > 0 && (
            <div className="flex items-center justify-center space-x-2 mt-2">
              <button onClick={handleStepPrev} disabled={currentStepIdx === 0} className="px-2 py-1 bg-gray-600 rounded text-white">Prev</button>
              <span className="text-gray-200">Step {currentStepIdx + 1} / {steps.length}</span>
              <button onClick={handleStepNext} disabled={currentStepIdx === steps.length - 1} className="px-2 py-1 bg-gray-600 rounded text-white">Next</button>
              {!isAutoPlaying ? (
                <button onClick={() => setIsAutoPlaying(true)} disabled={currentStepIdx === steps.length - 1} className="px-2 py-1 bg-green-600 rounded text-white">Auto</button>
              ) : (
                <button onClick={() => setIsAutoPlaying(false)} className="px-2 py-1 bg-orange-600 rounded text-white">Pause</button>
              )}
            </div>
          )}
        </div>
        <div className="space-y-4">
          {/* Highlight code line and output for each algorithm */}
          {steps.length > 0 ? (
            selectedAlgorithm === 'linear' ? (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  {linearSearchLines.map((line, idx) => (
                    <div key={idx} style={{ background: idx === steps[currentStepIdx].line ? '#fbbf24' : 'transparent', color: idx === steps[currentStepIdx].line ? '#222' : '#fff', fontWeight: idx === steps[currentStepIdx].line ? 'bold' : 'normal', padding: '2px 0' }}>
                      {line}
                    </div>
                  ))}
                </pre>
                <div className="mt-2 text-gray-200 text-xs">{steps[currentStepIdx].desc}</div>
                <div className="mt-2 text-gray-300 text-xs">i: {steps[currentStepIdx].i !== undefined ? steps[currentStepIdx].i : '-'}, target: {steps[currentStepIdx].target}, arr: [{steps[currentStepIdx].arr.join(', ')}]</div>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  {binarySearchLines.map((line, idx) => (
                    <div key={idx} style={{ background: idx === steps[currentStepIdx].line ? '#fbbf24' : 'transparent', color: idx === steps[currentStepIdx].line ? '#222' : '#fff', fontWeight: idx === steps[currentStepIdx].line ? 'bold' : 'normal', padding: '2px 0' }}>
                      {line}
                    </div>
                  ))}
                </pre>
                <div className="mt-2 text-gray-200 text-xs">{steps[currentStepIdx].desc}</div>
                <div className="mt-2 text-gray-300 text-xs">left: {steps[currentStepIdx].left !== undefined ? steps[currentStepIdx].left : '-'}, right: {steps[currentStepIdx].right !== undefined ? steps[currentStepIdx].right : '-'}, mid: {steps[currentStepIdx].mid !== undefined ? steps[currentStepIdx].mid : '-'}, target: {steps[currentStepIdx].target}, arr: [{steps[currentStepIdx].arr.join(', ')}]</div>
              </div>
            )
          ) : (
            <CodeDisplay
              code={getAlgorithmCode()}
              language="javascript"
              title={algorithms.find(a => a.id === selectedAlgorithm)?.name || ''}
            />
          )}
          {/* Output results for searching */}
          <div className="bg-gray-700 rounded-lg p-4 text-gray-100">
            <h3 className="font-bold text-lg mb-2">Searching Output</h3>
            <div className="mb-2">Array: <span className="text-blue-300">[{array.join(', ')}]</span></div>
            <div className="mb-2">Target: <span className="text-yellow-300">{target}</span></div>
            {steps.length > 0 ? (
              <div className="mb-2">Result: <span className="text-green-400 font-semibold">{steps[currentStepIdx].result !== null ? steps[currentStepIdx].result : '-'}</span></div>
            ) : (
              <div className="mb-2">Result: <span className="text-gray-400">-</span></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
