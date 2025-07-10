
'use client';

import { useState, useEffect, useRef } from 'react';
import AlgorithmSelector from '../AlgorithmSelector';
import VisualizationArea from '../VisualizationArea';
import CodeDisplay from '../CodeDisplay';
import ControlPanel from '../ControlPanel';

const bubbleSortLines = [
  'function bubbleSort(arr) {',
  '  const n = arr.length;',
  '  for (let i = 0; i < n - 1; i++) {',
  '    for (let j = 0; j < n - i - 1; j++) {',
  '      if (arr[j] > arr[j + 1]) {',
  '        // Swap elements',
  '        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];',
  '      }',
  '    }',
  '  }',
  '  return arr;',
  '}'
];

const quickSortLines = [
  'function quickSort(arr, low = 0, high = arr.length - 1) {',
  '  if (low < high) {',
  '    const pi = partition(arr, low, high);',
  '    quickSort(arr, low, pi - 1);',
  '    quickSort(arr, pi + 1, high);',
  '  }',
  '}',
  '',
  'function partition(arr, low, high) {',
  '  const pivot = arr[high];',
  '  let i = low - 1;',
  '  for (let j = low; j < high; j++) {',
  '    if (arr[j] < pivot) {',
  '      i++;',
  '      [arr[i], arr[j]] = [arr[j], arr[i]];',
  '    }',
  '  }',
  '  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];',
  '  return i + 1;',
  '}'
];

const mergeSortLines = [
  'function mergeSort(arr) {',
  '  if (arr.length <= 1) return arr;',
  '  const mid = Math.floor(arr.length / 2);',
  '  const left = mergeSort(arr.slice(0, mid));',
  '  const right = mergeSort(arr.slice(mid));',
  '  return merge(left, right);',
  '}',
  '',
  'function merge(left, right) {',
  '  const result = [];',
  '  let i = 0, j = 0;',
  '  while (i < left.length && j < right.length) {',
  '    if (left[i] <= right[j]) {',
  '      result.push(left[i++]);',
  '    } else {',
  '      result.push(right[j++]);',
  '    }',
  '  }',
  '  return result.concat(left.slice(i)).concat(right.slice(j));',
  '}'
];

const insertionSortLines = [
  'function insertionSort(arr) {',
  '  for (let i = 1; i < arr.length; i++) {',
  '    let key = arr[i];',
  '    let j = i - 1;',
  '    while (j >= 0 && arr[j] > key) {',
  '      arr[j + 1] = arr[j];',
  '      j = j - 1;',
  '    }',
  '    arr[j + 1] = key;',
  '  }',
  '  return arr;',
  '}'
];

const selectionSortLines = [
  'function selectionSort(arr) {',
  '  for (let i = 0; i < arr.length - 1; i++) {',
  '    let minIdx = i;',
  '    for (let j = i + 1; j < arr.length; j++) {',
  '      if (arr[j] < arr[minIdx]) {',
  '        minIdx = j;',
  '      }',
  '    }',
  '    if (minIdx !== i) {',
  '      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];',
  '    }',
  '  }',
  '  return arr;',
  '}'
];

const heapSortLines = [
  'function heapSort(arr) {',
  '  let n = arr.length;',
  '  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {',
  '    heapify(arr, n, i);',
  '  }',
  '  for (let i = n - 1; i > 0; i--) {',
  '    [arr[0], arr[i]] = [arr[i], arr[0]];',
  '    heapify(arr, i, 0);',
  '  }',
  '  return arr;',
  '}',
  '',
  'function heapify(arr, n, i) {',
  '  let largest = i;',
  '  let l = 2 * i + 1;',
  '  let r = 2 * i + 2;',
  '  if (l < n && arr[l] > arr[largest]) largest = l;',
  '  if (r < n && arr[r] > arr[largest]) largest = r;',
  '  if (largest !== i) {',
  '    [arr[i], arr[largest]] = [arr[largest], arr[i]];',
  '    heapify(arr, n, largest);',
  '  }',
  '}'
];

export default function SortingAlgorithms() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [finalSorted, setFinalSorted] = useState<number[] | null>(null);
  const [numComparisons, setNumComparisons] = useState(0);
  const [numSwaps, setNumSwaps] = useState(0);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const algorithms = [
    { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n^2)' },
    { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)' },
    { id: 'merge', name: 'Merge Sort', complexity: 'O(n log n)' },
    { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n^2)' },
    { id: 'selection', name: 'Selection Sort', complexity: 'O(n^2)' },
    { id: 'heap', name: 'Heap Sort', complexity: 'O(n log n)' }
  ];

  const bubbleSortCode = `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`;

  const quickSortCode = `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`;

  const mergeSortCode = `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`;

  const getAlgorithmCode = () => {
    switch (selectedAlgorithm) {
      case 'bubble':
        return bubbleSortLines.join('\n');
      case 'quick':
        return quickSortLines.join('\n');
      case 'merge':
        return mergeSortLines.join('\n');
      case 'insertion':
        return insertionSortLines.join('\n');
      case 'selection':
        return selectionSortLines.join('\n');
      case 'heap':
        return heapSortLines.join('\n');
      default:
        return bubbleSortLines.join('\n');
    }
  };

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    reset();
  };

  // Remove extra Play button, integrate with ControlPanel
  // When Play is pressed in ControlPanel, always start step-by-step visualization for Bubble Sort
  const play = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    isPlayingRef.current = true;
    reset();
    await sleep(100);
    isPlayingRef.current = true;
    let steps = [];
    if (selectedAlgorithm === 'bubble') {
      steps = generateBubbleSortSteps(array);
    } else if (selectedAlgorithm === 'quick') {
      steps = generateQuickSortSteps(array);
    } else if (selectedAlgorithm === 'merge') {
      steps = generateMergeSortSteps(array);
    } else if (selectedAlgorithm === 'insertion') {
      steps = generateInsertionSortSteps(array);
    } else if (selectedAlgorithm === 'selection') {
      steps = generateSelectionSortSteps(array);
    } else if (selectedAlgorithm === 'heap') {
      steps = generateHeapSortSteps(array);
    }
    setSteps(steps);
    setCurrentStepIdx(0);
    setIsAutoPlaying(true);
  };

  // Reset also resets step-by-step state
  const reset = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentStep(0);
    setComparingIndices([]);
    setSortedIndices([]);
    setFinalSorted(null);
    setNumComparisons(0);
    setNumSwaps(0);
    setSteps([]);
    setCurrentStepIdx(0);
    setIsAutoPlaying(false);
  };

  const pause = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    for (let i = 0; i < n - 1 && isPlayingRef.current; i++) {
      for (let j = 0; j < n - i - 1 && isPlayingRef.current; j++) {
        setComparingIndices([j, j + 1]);
        comparisons++;
        await sleep(800);
        if (!isPlayingRef.current) return;
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          swaps++;
        }
      }
      setSortedIndices(prev => [...prev, n - 1 - i]);
    }
    if (isPlayingRef.current) {
      setSortedIndices(Array.from({ length: n }, (_, i) => i));
      setComparingIndices([]);
      setFinalSorted([...arr]);
      setNumComparisons(comparisons);
      setNumSwaps(swaps);
      setIsPlaying(false);
      isPlayingRef.current = false;
    }
  };

  const quickSort = async (arr: number[], low: number = 0, high: number = arr.length - 1, indices: number[] = Array.from({length: arr.length}, (_, i) => i)) => {
    if (low < high && isPlayingRef.current) {
      const pi = await partition(arr, low, high, indices);
      if (isPlayingRef.current) {
        await quickSort(arr, low, pi - 1, indices);
        await quickSort(arr, pi + 1, high, indices);
      }
    }
  };

  const partition = async (arr: number[], low: number, high: number, indices: number[]) => {
    const pivot = arr[high];
    let i = low - 1;
    
    setComparingIndices([high]);
    await sleep(600);
    
    for (let j = low; j < high && isPlayingRef.current; j++) {
      setComparingIndices([j, high]);
      await sleep(600);
      
      if (!isPlayingRef.current) return i + 1;
      
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(400);
      }
    }
    
    if (isPlayingRef.current) {
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);
      setSortedIndices(prev => [...prev, i + 1]);
      await sleep(600);
    }
    
    return i + 1;
  };

  const mergeSort = async (startArr: number[] = [...array], start: number = 0, end: number = array.length - 1) => {
    if (start >= end || !isPlayingRef.current) return;
    
    const mid = Math.floor((start + end) / 2);
    
    setComparingIndices([start, mid, end]);
    await sleep(800);
    
    if (!isPlayingRef.current) return;
    
    await mergeSort(startArr, start, mid);
    await mergeSort(startArr, mid + 1, end);
    
    if (isPlayingRef.current) {
      await merge(startArr, start, mid, end);
    }
  };

  const merge = async (arr: number[], start: number, mid: number, end: number) => {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    
    let i = 0, j = 0, k = start;
    
    while (i < left.length && j < right.length && isPlayingRef.current) {
      setComparingIndices([start + i, mid + 1 + j]);
      await sleep(600);
      
      if (!isPlayingRef.current) return;
      
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      k++;
      setArray([...arr]);
    }
    
    while (i < left.length && isPlayingRef.current) {
      arr[k] = left[i];
      i++;
      k++;
      setArray([...arr]);
      await sleep(400);
    }
    
    while (j < right.length && isPlayingRef.current) {
      arr[k] = right[j];
      j++;
      k++;
      setArray([...arr]);
      await sleep(400);
    }
    
    if (isPlayingRef.current && start === 0 && end === array.length - 1) {
      setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
    }
  };

  // Generate steps for Bubble Sort
  const generateBubbleSortSteps = (inputArr: number[]) => {
    const arr = [...inputArr];
    const n = arr.length;
    const steps = [];
    let comparisons = 0;
    let swaps = 0;
    steps.push({
      line: 0, arr: [...arr], i: undefined, j: undefined, comparing: [], sorted: [], desc: 'Start', comparisons, swaps
    });
    for (let i = 0; i < n - 1; i++) {
      steps.push({ line: 2, arr: [...arr], i, j: undefined, comparing: [], sorted: [], desc: `i=${i}`, comparisons, swaps });
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        steps.push({ line: 3, arr: [...arr], i, j, comparing: [j, j+1], sorted: [], desc: `Compare arr[${j}] and arr[${j+1}]`, comparisons, swaps });
        if (arr[j] > arr[j + 1]) {
          steps.push({ line: 4, arr: [...arr], i, j, comparing: [j, j+1], sorted: [], desc: `arr[${j}] > arr[${j+1}], swap`, comparisons, swaps });
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swaps++;
          steps.push({ line: 6, arr: [...arr], i, j, comparing: [j, j+1], sorted: [], desc: `Swapped arr[${j}] and arr[${j+1}]`, comparisons, swaps });
        }
      }
      steps.push({ line: 8, arr: [...arr], i, j: undefined, comparing: [], sorted: Array.from({length: i+1}, (_, k) => n-1-k), desc: `Mark sorted: ${n-1-i}`, comparisons, swaps });
    }
    steps.push({ line: 10, arr: [...arr], i: undefined, j: undefined, comparing: [], sorted: Array.from({length: n}, (_, k) => k), desc: 'Done', comparisons, swaps });
    return steps;
  };

  // Generate steps for Quick Sort
  const generateQuickSortSteps = (inputArr: number[]) => {
    const arr = [...inputArr];
    const steps: any[] = [];
    let comparisons = 0;
    let swaps = 0;
    const sortedSet = new Set<number>();
    function record(line: number, vars: any, desc: string, comparing: number[] = [], sorted: number[] = []) {
      steps.push({
        line,
        arr: [...arr],
        ...vars,
        comparisons,
        swaps,
        desc,
        comparing,
        sorted: [...sortedSet, ...sorted]
      });
    }
    function partition(low: number, high: number) {
      record(9, { low, high }, `partition(${low}, ${high})`, [high], []);
      const pivot = arr[high];
      let i = low - 1;
      record(10, { low, high, i, pivot }, `pivot = arr[${high}] = ${pivot}`, [high], []);
      for (let j = low; j < high; j++) {
        comparisons++;
        record(12, { low, high, i, j, pivot }, `Compare arr[${j}] < pivot (${arr[j]} < ${pivot})`, [j, high], []);
        if (arr[j] < pivot) {
          i++;
          record(13, { low, high, i, j, pivot }, `arr[${j}] < pivot, i++`, [i, j], []);
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
          record(14, { low, high, i, j, pivot }, `Swapped arr[${i}] and arr[${j}]`, [i, j], []);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      swaps++;
      record(17, { low, high, i, pivot }, `Swapped arr[${i + 1}] and arr[${high}]`, [i + 1, high], []);
      record(18, { low, high, i, pivot }, `Return ${i + 1}`, [], []);
      return i + 1;
    }
    function quickSort(low: number, high: number) {
      record(0, { low, high }, `quickSort(${low}, ${high})`, [], Array.from(sortedSet));
      if (low < high) {
        record(1, { low, high }, `low < high (${low} < ${high})`, [], Array.from(sortedSet));
        const pi = partition(low, high);
        sortedSet.add(pi);
        record(3, { low, high, pi }, `quickSort(${low}, ${pi - 1})`, [], Array.from(sortedSet));
        quickSort(low, pi - 1);
        record(4, { low, high, pi }, `quickSort(${pi + 1}, ${high})`, [], Array.from(sortedSet));
        quickSort(pi + 1, high);
      } else if (low === high) {
        sortedSet.add(low);
        record(7, { low, high }, `Mark sorted: ${low}`, [], Array.from(sortedSet));
      }
    }
    quickSort(0, arr.length - 1);
    return steps;
  };

  // Generate steps for Merge Sort
  const generateMergeSortSteps = (inputArr: number[]) => {
    const arr = [...inputArr];
    const steps: any[] = [];
    let comparisons = 0;
    function record(line: number, vars: any, desc: string, comparing: number[] = [], sorted: number[] = []) {
      steps.push({
        line,
        arr: [...arr],
        ...vars,
        comparisons,
        desc,
        comparing,
        sorted
      });
    }
    function mergeSort(start: number, end: number) {
      record(0, { start, end }, `mergeSort(${start}, ${end})`, [], []);
      if (start >= end) return;
      const mid = Math.floor((start + end) / 2);
      record(2, { start, end, mid }, `mid = ${mid}`, [], []);
      mergeSort(start, mid);
      mergeSort(mid + 1, end);
      merge(start, mid, end);
    }
    function merge(start: number, mid: number, end: number) {
      let left = arr.slice(start, mid + 1);
      let right = arr.slice(mid + 1, end + 1);
      let i = 0, j = 0, k = start;
      record(8, { start, mid, end, left: [...left], right: [...right], k }, `merge left [${left}] and right [${right}]`, [], []);
      while (i < left.length && j < right.length) {
        comparisons++;
        record(11, { start, mid, end, i, j, k, left: [...left], right: [...right] }, `Compare left[${i}] <= right[${j}] (${left[i]} <= ${right[j]})`, [k], []);
        if (left[i] <= right[j]) {
          arr[k] = left[i];
          i++;
          record(12, { k, i, j, arr: [...arr] }, `left[${i - 1}] <= right[${j}], arr[${k}] = ${arr[k]}`, [k], []);
        } else {
          arr[k] = right[j];
          j++;
          record(14, { k, i, j, arr: [...arr] }, `left[${i}] > right[${j - 1}], arr[${k}] = ${arr[k]}`, [k], []);
        }
        k++;
      }
      while (i < left.length) {
        arr[k] = left[i];
        i++;
        k++;
        record(17, { k, i, j, arr: [...arr] }, `Copy remaining left`, [k - 1], []);
      }
      while (j < right.length) {
        arr[k] = right[j];
        j++;
        k++;
        record(19, { k, i, j, arr: [...arr] }, `Copy remaining right`, [k - 1], []);
      }
      // Optionally, mark sorted indices for this merge
      record(20, { start, end }, `Merged [${start}, ${end}]`, [], Array.from({length: end - start + 1}, (_, idx) => start + idx));
    }
    mergeSort(0, arr.length - 1);
    return steps;
  };

  const generateSelectionSortSteps = (inputArr: number[]) => {
    const arr = [...inputArr];
    const steps: any[] = [];
    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;
    let sorted = [] as number[];
    steps.push({ line: 0, arr: [...arr], i: undefined, j: undefined, minIdx: undefined, comparing: [], sorted: [], desc: 'Start', comparisons, swaps });
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      steps.push({ line: 1, arr: [...arr], i, minIdx, comparing: [i], sorted: [...sorted], desc: `Start i=${i}`, comparisons, swaps });
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        steps.push({ line: 3, arr: [...arr], i, j, minIdx, comparing: [j, minIdx], sorted: [...sorted], desc: `Compare arr[${j}] < arr[${minIdx}] (${arr[j]} < ${arr[minIdx]})`, comparisons, swaps });
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          steps.push({ line: 5, arr: [...arr], i, j, minIdx, comparing: [j, minIdx], sorted: [...sorted], desc: `Update minIdx = ${minIdx}`, comparisons, swaps });
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swaps++;
        steps.push({ line: 9, arr: [...arr], i, minIdx, comparing: [i, minIdx], sorted: [...sorted, i], desc: `Swap arr[${i}] and arr[${minIdx}]`, comparisons, swaps });
      }
      sorted.push(i);
      steps.push({ line: 11, arr: [...arr], i, minIdx, comparing: [], sorted: [...sorted], desc: `Mark sorted: ${i}`, comparisons, swaps });
    }
    sorted = Array.from({length: n}, (_, k) => k);
    steps.push({ line: 12, arr: [...arr], i: undefined, minIdx: undefined, comparing: [], sorted: [...sorted], desc: 'Done', comparisons, swaps });
    return steps;
  };

  const generateInsertionSortSteps = (inputArr: number[]) => {
    const arr = [...inputArr];
    const steps: any[] = [];
    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;
    let sorted = [0];
    steps.push({ line: 0, arr: [...arr], i: undefined, j: undefined, key: undefined, comparing: [], sorted: [], desc: 'Start', comparisons, swaps });
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      steps.push({ line: 2, arr: [...arr], i, j, key, comparing: [i], sorted: [...sorted], desc: `Select key = arr[${i}] = ${key}`, comparisons, swaps });
      while (j >= 0 && arr[j] > key) {
        comparisons++;
        steps.push({ line: 4, arr: [...arr], i, j, key, comparing: [j, j+1], sorted: [...sorted], desc: `Compare arr[${j}] > key (${arr[j]} > ${key})`, comparisons, swaps });
        arr[j + 1] = arr[j];
        swaps++;
        steps.push({ line: 5, arr: [...arr], i, j, key, comparing: [j, j+1], sorted: [...sorted], desc: `Move arr[${j}] to arr[${j+1}]`, comparisons, swaps });
        j = j - 1;
        steps.push({ line: 6, arr: [...arr], i, j, key, comparing: [j], sorted: [...sorted], desc: `j--`, comparisons, swaps });
      }
      steps.push({ line: 8, arr: [...arr], i, j, key, comparing: [j+1], sorted: [...sorted], desc: `Insert key at arr[${j+1}]`, comparisons, swaps });
      arr[j + 1] = key;
      sorted = Array.from({length: i+1}, (_, k) => k);
      steps.push({ line: 9, arr: [...arr], i, j, key, comparing: [], sorted: [...sorted], desc: `Mark sorted: 0..${i}`, comparisons, swaps });
    }
    sorted = Array.from({length: n}, (_, k) => k);
    steps.push({ line: 10, arr: [...arr], i: undefined, j: undefined, key: undefined, comparing: [], sorted: [...sorted], desc: 'Done', comparisons, swaps });
    return steps;
  };

  const generateHeapSortSteps = (inputArr: number[]) => {
    const arr = [...inputArr];
    const steps: any[] = [];
    let comparisons = 0;
    let swaps = 0;
    let n = arr.length;
    function heapify(n: number, i: number) {
      let largest = i;
      let l = 2 * i + 1;
      let r = 2 * i + 2;
      if (l < n) {
        comparisons++;
        steps.push({ line: 15, arr: [...arr], n, i, l, r, largest, comparing: [l, largest], sorted: [], desc: `Compare arr[${l}] > arr[${largest}] (${arr[l]} > ${arr[largest]})`, comparisons, swaps });
        if (arr[l] > arr[largest]) largest = l;
      }
      if (r < n) {
        comparisons++;
        steps.push({ line: 16, arr: [...arr], n, i, l, r, largest, comparing: [r, largest], sorted: [], desc: `Compare arr[${r}] > arr[${largest}] (${arr[r]} > ${arr[largest]})`, comparisons, swaps });
        if (arr[r] > arr[largest]) largest = r;
      }
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        swaps++;
        steps.push({ line: 19, arr: [...arr], n, i, l, r, largest, comparing: [i, largest], sorted: [], desc: `Swap arr[${i}] and arr[${largest}]`, comparisons, swaps });
        heapify(n, largest);
      }
    }
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      steps.push({ line: 3, arr: [...arr], n, i, comparing: [i], sorted: [], desc: `Heapify at i=${i}`, comparisons, swaps });
      heapify(n, i);
    }
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      swaps++;
      steps.push({ line: 7, arr: [...arr], n, i, comparing: [0, i], sorted: Array.from({length: n-i}, (_, k) => n-1-k), desc: `Swap arr[0] and arr[${i}]`, comparisons, swaps });
      heapify(i, 0);
    }
    steps.push({ line: 10, arr: [...arr], n, i: undefined, comparing: [], sorted: Array.from({length: arr.length}, (_, k) => k), desc: 'Done', comparisons, swaps });
    return steps;
  };

  // Stepper controls for Bubble Sort
  const handleStepNext = () => {
    if (currentStepIdx < steps.length - 1) setCurrentStepIdx(currentStepIdx + 1);
  };
  const handleStepPrev = () => {
    if (currentStepIdx > 0) setCurrentStepIdx(currentStepIdx - 1);
  };
  useEffect(() => {
    let timer: any;
    if (isAutoPlaying && steps.length > 0 && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => setCurrentStepIdx(idx => idx + 1), 1000);
    }
    if (currentStepIdx === steps.length - 1) setIsAutoPlaying(false);
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentStepIdx, steps.length]);
  const handleAutoPlay = () => setIsAutoPlaying(true);
  const handlePause = () => setIsAutoPlaying(false);

  useEffect(() => {
    reset();
  }, [selectedAlgorithm]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  return (
    <div className="space-y-6">
      <AlgorithmSelector
        algorithms={algorithms}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
      />
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <VisualizationArea
            array={steps.length > 0 ? steps[currentStepIdx].arr : array}
            comparingIndices={steps.length > 0 ? steps[currentStepIdx].comparing : comparingIndices}
            sortedIndices={steps.length > 0 ? steps[currentStepIdx].sorted : sortedIndices}
            type="sorting"
          />
          <div className="flex flex-col items-center space-y-2">
            <ControlPanel
              isPlaying={isPlaying}
              onPlay={play}
              onPause={handlePause}
              onReset={reset}
              onGenerateArray={generateRandomArray}
            />
            {/* Stepper controls for Bubble Sort, next to ControlPanel */}
            {steps.length > 0 && (
              <div className="flex items-center space-x-2 mt-2">
                <button onClick={handleStepPrev} disabled={currentStepIdx === 0} className="px-2 py-1 bg-gray-600 rounded text-white">Prev</button>
                <span className="text-gray-200">Step {currentStepIdx + 1} / {steps.length}</span>
                <button onClick={handleStepNext} disabled={currentStepIdx === steps.length - 1} className="px-2 py-1 bg-gray-600 rounded text-white">Next</button>
                {!isAutoPlaying ? (
                  <button onClick={handleAutoPlay} disabled={currentStepIdx === steps.length - 1} className="px-2 py-1 bg-green-600 rounded text-white">Auto</button>
                ) : (
                  <button onClick={handlePause} className="px-2 py-1 bg-orange-600 rounded text-white">Pause</button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          {/* Highlight code line and output for each algorithm */}
          {steps.length > 0 ? (
            selectedAlgorithm === 'bubble' ? (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  {bubbleSortLines.map((line, idx) => (
                    <div key={idx} style={{ background: idx === steps[currentStepIdx].line ? '#fbbf24' : 'transparent', color: idx === steps[currentStepIdx].line ? '#222' : '#fff', fontWeight: idx === steps[currentStepIdx].line ? 'bold' : 'normal', padding: '2px 0' }}>
                      {line}
                    </div>
                  ))}
                </pre>
                <div className="mt-2 text-gray-200 text-xs">{steps[currentStepIdx].desc}</div>
                <div className="mt-2 text-gray-300 text-xs">i: {steps[currentStepIdx].i !== undefined ? steps[currentStepIdx].i : '-'}, j: {steps[currentStepIdx].j !== undefined ? steps[currentStepIdx].j : '-'}, arr: [{steps[currentStepIdx].arr.join(', ')}]</div>
              </div>
            ) : selectedAlgorithm === 'quick' ? (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  {quickSortLines.map((line, idx) => (
                    <div key={idx} style={{ background: idx === steps[currentStepIdx].line ? '#fbbf24' : 'transparent', color: idx === steps[currentStepIdx].line ? '#222' : '#fff', fontWeight: idx === steps[currentStepIdx].line ? 'bold' : 'normal', padding: '2px 0' }}>
                      {line}
                    </div>
                  ))}
                </pre>
                <div className="mt-2 text-gray-200 text-xs">{steps[currentStepIdx].desc}</div>
                <div className="mt-2 text-gray-300 text-xs">low: {steps[currentStepIdx].low !== undefined ? steps[currentStepIdx].low : '-'}, high: {steps[currentStepIdx].high !== undefined ? steps[currentStepIdx].high : '-'}, i: {steps[currentStepIdx].i !== undefined ? steps[currentStepIdx].i : '-'}, j: {steps[currentStepIdx].j !== undefined ? steps[currentStepIdx].j : '-'}, pivot: {steps[currentStepIdx].pivot !== undefined ? steps[currentStepIdx].pivot : '-'}, arr: [{steps[currentStepIdx].arr.join(', ')}]</div>
              </div>
            ) : selectedAlgorithm === 'merge' ? (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  {mergeSortLines.map((line, idx) => (
                    <div key={idx} style={{ background: idx === steps[currentStepIdx].line ? '#fbbf24' : 'transparent', color: idx === steps[currentStepIdx].line ? '#222' : '#fff', fontWeight: idx === steps[currentStepIdx].line ? 'bold' : 'normal', padding: '2px 0' }}>
                      {line}
                    </div>
                  ))}
                </pre>
                <div className="mt-2 text-gray-200 text-xs">{steps[currentStepIdx].desc}</div>
                <div className="mt-2 text-gray-300 text-xs">start: {steps[currentStepIdx].start !== undefined ? steps[currentStepIdx].start : '-'}, end: {steps[currentStepIdx].end !== undefined ? steps[currentStepIdx].end : '-'}, mid: {steps[currentStepIdx].mid !== undefined ? steps[currentStepIdx].mid : '-'}, arr: [{steps[currentStepIdx].arr.join(', ')}]</div>
              </div>
            ) : selectedAlgorithm === 'insertion' ? (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  {insertionSortLines.map((line, idx) => (
                    <div key={idx} style={{ background: idx === steps[currentStepIdx].line ? '#fbbf24' : 'transparent', color: idx === steps[currentStepIdx].line ? '#222' : '#fff', fontWeight: idx === steps[currentStepIdx].line ? 'bold' : 'normal', padding: '2px 0' }}>
                      {line}
                    </div>
                  ))}
                </pre>
                <div className="mt-2 text-gray-200 text-xs">{steps[currentStepIdx].desc}</div>
                <div className="mt-2 text-gray-300 text-xs">i: {steps[currentStepIdx].i !== undefined ? steps[currentStepIdx].i : '-'}, j: {steps[currentStepIdx].j !== undefined ? steps[currentStepIdx].j : '-'}, key: {steps[currentStepIdx].key !== undefined ? steps[currentStepIdx].key : '-'}, arr: [{steps[currentStepIdx].arr.join(', ')}]</div>
              </div>
            ) : selectedAlgorithm === 'selection' ? (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  {selectionSortLines.map((line, idx) => (
                    <div key={idx} style={{ background: idx === steps[currentStepIdx].line ? '#fbbf24' : 'transparent', color: idx === steps[currentStepIdx].line ? '#222' : '#fff', fontWeight: idx === steps[currentStepIdx].line ? 'bold' : 'normal', padding: '2px 0' }}>
                      {line}
                    </div>
                  ))}
                </pre>
                <div className="mt-2 text-gray-200 text-xs">{steps[currentStepIdx].desc}</div>
                <div className="mt-2 text-gray-300 text-xs">i: {steps[currentStepIdx].i !== undefined ? steps[currentStepIdx].i : '-'}, j: {steps[currentStepIdx].j !== undefined ? steps[currentStepIdx].j : '-'}, minIdx: {steps[currentStepIdx].minIdx !== undefined ? steps[currentStepIdx].minIdx : '-'}, arr: [{steps[currentStepIdx].arr.join(', ')}]</div>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  {heapSortLines.map((line, idx) => (
                    <div key={idx} style={{ background: idx === steps[currentStepIdx].line ? '#fbbf24' : 'transparent', color: idx === steps[currentStepIdx].line ? '#222' : '#fff', fontWeight: idx === steps[currentStepIdx].line ? 'bold' : 'normal', padding: '2px 0' }}>
                      {line}
                    </div>
                  ))}
                </pre>
                <div className="mt-2 text-gray-200 text-xs">{steps[currentStepIdx].desc}</div>
                <div className="mt-2 text-gray-300 text-xs">i: {steps[currentStepIdx].i !== undefined ? steps[currentStepIdx].i : '-'}, n: {steps[currentStepIdx].n !== undefined ? steps[currentStepIdx].n : '-'}, largest: {steps[currentStepIdx].largest !== undefined ? steps[currentStepIdx].largest : '-'}, arr: [{steps[currentStepIdx].arr.join(', ')}]</div>
              </div>
            )
          ) : (
            <CodeDisplay
              code={getAlgorithmCode()}
              language="javascript"
              title={algorithms.find(a => a.id === selectedAlgorithm)?.name || ''}
            />
          )}
          {/* Output results for sorting */}
          <div className="bg-gray-700 rounded-lg p-4 text-gray-100">
            <h3 className="font-bold text-lg mb-2">Sorting Output</h3>
            <div className="mb-2">Original array: <span className="text-blue-300">[{array.join(', ')}]</span></div>
            <div className="mb-2">Sorted array: {steps.length > 0 ? (
              <span className="text-green-400 font-semibold">[{steps[currentStepIdx].arr.join(', ')}]</span>
            ) : finalSorted ? (
              <span className="text-green-400 font-semibold">[{finalSorted.join(', ')}]</span>
            ) : (
              <span className="text-gray-400">Not sorted yet.</span>
            )}</div>
            {steps.length > 0 ? (
              <>
                <div className="mb-2">Comparisons: <span className="text-yellow-300">{steps[currentStepIdx].comparisons !== undefined ? steps[currentStepIdx].comparisons : '-'}</span></div>
                <div className="mb-2">Swaps: <span className="text-yellow-300">{steps[currentStepIdx].swaps !== undefined ? steps[currentStepIdx].swaps : '-'}</span></div>
              </>
            ) : (
              <>
                <div className="mb-2">Comparisons: <span className="text-yellow-300">{numComparisons}</span></div>
                <div className="mb-2">Swaps: <span className="text-yellow-300">{numSwaps}</span></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
