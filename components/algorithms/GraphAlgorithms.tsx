
'use client';

import { useState, useEffect, useRef } from 'react';
import AlgorithmSelector from '../AlgorithmSelector';
import GraphVisualization from '../GraphVisualization';
import CodeDisplay from '../CodeDisplay';
import ControlPanel from '../ControlPanel';

interface Node {
  id: string;
  x: number;
  y: number;
  visited: boolean;
  current: boolean;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

export default function GraphAlgorithms() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dfs');
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'A', x: 150, y: 100, visited: false, current: false },
    { id: 'B', x: 100, y: 200, visited: false, current: false },
    { id: 'C', x: 200, y: 200, visited: false, current: false },
    { id: 'D', x: 50, y: 300, visited: false, current: false },
    { id: 'E', x: 150, y: 300, visited: false, current: false },
    { id: 'F', x: 250, y: 300, visited: false, current: false }
  ]);
  const nodeIds = nodes.map(n => n.id);
  const [startNode, setStartNode] = useState('A');
  const [endNode, setEndNode] = useState('F');
  const [shortestPath, setShortestPath] = useState<string[]>([]);
  const [distances, setDistances] = useState<{[key:string]: number}>({});
  const [traversalOrder, setTraversalOrder] = useState<string[]>([]);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const [edges] = useState<Edge[]>([
    { from: 'A', to: 'B', weight: 2 },
    { from: 'A', to: 'C', weight: 1 },
    { from: 'B', to: 'D', weight: 3 },
    { from: 'B', to: 'E', weight: 1 },
    { from: 'C', to: 'E', weight: 4 },
    { from: 'C', to: 'F', weight: 8 },
    { from: 'E', to: 'F', weight: 2 }
  ]);

  const algorithms = [
    { id: 'dfs', name: 'Depth-First Search', complexity: 'O(V + E)' },
    { id: 'bfs', name: 'Breadth-First Search', complexity: 'O(V + E)' },
    { id: 'dijkstra', name: "Dijkstra's Algorithm", complexity: 'O((V + E) log V)' }
  ];

  const dfsCode = `function dfs(graph, startNode, visited = new Set()) {
  console.log(startNode); // Process current node
  visited.add(startNode);
  
  // Visit all unvisited neighbors
  for (const neighbor of graph[startNode]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}

// Usage
const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'E', 'F'],
  'D': ['B'],
  'E': ['B', 'C', 'F'],
  'F': ['C', 'E']
};

dfs(graph, 'A');`;

  const bfsCode = `function bfs(graph, startNode) {
  const visited = new Set();
  const queue = [startNode];
  
  visited.add(startNode);
  
  while (queue.length > 0) {
    const currentNode = queue.shift();
    console.log(currentNode); // Process current node
    
    // Add all unvisited neighbors to queue
    for (const neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

// Usage
const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'E', 'F'],
  'D': ['B'],
  'E': ['B', 'C', 'F'],
  'F': ['C', 'E']
};

bfs(graph, 'A');`;

  const dijkstraCode = `function dijkstra(graph, start) {
  const distances = {};
  const prev = {};
  const pq = [];
  for (const node in graph) {
    distances[node] = Infinity;
    prev[node] = null;
  }
  distances[start] = 0;
  pq.push({ node: start, dist: 0 });
  while (pq.length > 0) {
    pq.sort((a, b) => a.dist - b.dist);
    const { node: current } = pq.shift();
    for (const neighbor of graph[current]) {
      const { to, weight } = neighbor;
      if (distances[current] + weight < distances[to]) {
        distances[to] = distances[current] + weight;
        prev[to] = current;
        pq.push({ node: to, dist: distances[to] });
      }
    }
  }
  return { distances, prev };
}
// Usage
const graph = {
  'A': [{ to: 'B', weight: 2 }, { to: 'C', weight: 1 }],
  'B': [{ to: 'A', weight: 2 }, { to: 'D', weight: 3 }, { to: 'E', weight: 1 }],
  'C': [{ to: 'A', weight: 1 }, { to: 'E', weight: 4 }, { to: 'F', weight: 8 }],
  'D': [{ to: 'B', weight: 3 }],
  'E': [{ to: 'B', weight: 1 }, { to: 'C', weight: 4 }, { to: 'F', weight: 2 }],
  'F': [{ to: 'C', weight: 8 }, { to: 'E', weight: 2 }]
};
dijkstra(graph, 'A');`;

  const getAlgorithmCode = () => {
    switch (selectedAlgorithm) {
      case 'dfs':
        return dfsCode;
      case 'bfs':
        return bfsCode;
      case 'dijkstra':
        return dijkstraCode;
      default:
        return dfsCode;
    }
  };

  const getAdjacencyList = () => {
    const adjacencyList: { [key: string]: { to: string; weight: number }[] } = {};
    
    nodes.forEach(node => {
      adjacencyList[node.id] = [];
    });
    
    edges.forEach(edge => {
      adjacencyList[edge.from].push({ to: edge.to, weight: edge.weight });
      adjacencyList[edge.to].push({ to: edge.from, weight: edge.weight });
    });
    
    return adjacencyList;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const dfsLines = [
    'function dfs(graph, startNode, visited = new Set()) {',
    '  console.log(startNode); // Process current node',
    '  visited.add(startNode);',
    '  ',
    '  // Visit all unvisited neighbors',
    '  for (const neighbor of graph[startNode]) {',
    '    if (!visited.has(neighbor)) {',
    '      dfs(graph, neighbor, visited);',
    '    }',
    '  }',
    '}'
  ];

  const bfsLines = [
    'function bfs(graph, startNode) {',
    '  const visited = new Set();',
    '  const queue = [startNode];',
    '  ',
    '  visited.add(startNode);',
    '  ',
    '  while (queue.length > 0) {',
    '    const currentNode = queue.shift();',
    '    console.log(currentNode); // Process current node',
    '    ',
    '    // Add all unvisited neighbors to queue',
    '    for (const neighbor of graph[currentNode]) {',
    '      if (!visited.has(neighbor)) {',
    '        visited.add(neighbor);',
    '        queue.push(neighbor);',
    '      }',
    '    }',
    '  }',
    '}'
  ];

  const dijkstraLines = [
    'function dijkstra(graph, start) {',
    '  const distances = {};',
    '  const prev = {};',
    '  const pq = [];',
    '  for (const node in graph) {',
    '    distances[node] = Infinity;',
    '    prev[node] = null;',
    '  }',
    '  distances[start] = 0;',
    '  pq.push({ node: start, dist: 0 });',
    '  ',
    '  while (pq.length > 0) {',
    '    pq.sort((a, b) => a.dist - b.dist);',
    '    const { node: current } = pq.shift();',
    '    ',
    '    for (const neighbor of graph[current]) {',
    '      const { to, weight } = neighbor;',
    '      if (distances[current] + weight < distances[to]) {',
    '        distances[to] = distances[current] + weight;',
    '        prev[to] = current;',
    '        pq.push({ node: to, dist: distances[to] });',
    '      }',
    '    }',
    '  }',
    '  return { distances, prev };',
    '}'
  ];

  const generateDFSSteps = (startNode: string) => {
    const adjacencyList = getAdjacencyList();
    const steps: any[] = [];
    const visited = new Set<string>();
    const order: string[] = [];
    
    function dfs(nodeId: string, depth: number = 0) {
      if (visited.has(nodeId)) return;
      
      visited.add(nodeId);
      order.push(nodeId);
      
      steps.push({
        line: 1,
        nodeId,
        visited: [...visited],
        order: [...order],
        depth,
        desc: `Visit node ${nodeId}`,
        current: nodeId,
        neighbors: adjacencyList[nodeId]?.map(n => n.to) || []
      });
      
      steps.push({
        line: 2,
        nodeId,
        visited: [...visited],
        order: [...order],
        depth,
        desc: `Add ${nodeId} to visited set`,
        current: nodeId,
        neighbors: adjacencyList[nodeId]?.map(n => n.to) || []
      });
      
      for (const neighbor of adjacencyList[nodeId] || []) {
        if (!visited.has(neighbor.to)) {
          steps.push({
            line: 6,
            nodeId,
            visited: [...visited],
            order: [...order],
            depth,
            desc: `Check neighbor ${neighbor.to} of ${nodeId}`,
            current: nodeId,
            neighbors: adjacencyList[nodeId]?.map(n => n.to) || [],
            checking: neighbor.to
          });
          
          steps.push({
            line: 7,
            nodeId,
            visited: [...visited],
            order: [...order],
            depth,
            desc: `Recursively visit ${neighbor.to}`,
            current: nodeId,
            neighbors: adjacencyList[nodeId]?.map(n => n.to) || [],
            checking: neighbor.to
          });
          
          dfs(neighbor.to, depth + 1);
        }
      }
    }
    
    dfs(startNode);
    return steps;
  };

  const generateBFSSteps = (startNode: string) => {
    const adjacencyList = getAdjacencyList();
    const steps: any[] = [];
    const visited = new Set<string>();
    const queue: string[] = [];
    const order: string[] = [];
    
    visited.add(startNode);
    queue.push(startNode);
    
    steps.push({
      line: 2,
      visited: [...visited],
      queue: [...queue],
      order: [...order],
      desc: `Initialize: visited = [${startNode}], queue = [${startNode}]`,
      current: null
    });
    
    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      order.push(currentNode);
      
      steps.push({
        line: 7,
        visited: [...visited],
        queue: [...queue],
        order: [...order],
        desc: `Dequeue and process ${currentNode}`,
        current: currentNode
      });
      
      steps.push({
        line: 8,
        visited: [...visited],
        queue: [...queue],
        order: [...order],
        desc: `Add ${currentNode} to traversal order`,
        current: currentNode
      });
      
      for (const neighbor of adjacencyList[currentNode] || []) {
        if (!visited.has(neighbor.to)) {
          visited.add(neighbor.to);
          queue.push(neighbor.to);
          
          steps.push({
            line: 12,
            visited: [...visited],
            queue: [...queue],
            order: [...order],
            desc: `Add unvisited neighbor ${neighbor.to} to queue`,
            current: currentNode,
            checking: neighbor.to
          });
        }
      }
    }
    
    return steps;
  };

  const generateDijkstraSteps = (startNode: string, endNode: string) => {
    const adjacencyList = getAdjacencyList();
    const steps: any[] = [];
    const distances: {[key:string]: number} = {};
    const prev: {[key:string]: string|null} = {};
    const visited = new Set<string>();
    const pq: {node: string, dist: number}[] = [];
    
    // Initialize
    nodes.forEach(node => {
      distances[node.id] = Infinity;
      prev[node.id] = null;
    });
    distances[startNode] = 0;
    pq.push({ node: startNode, dist: 0 });
    
    steps.push({
      line: 3,
      distances: {...distances},
      prev: {...prev},
      pq: [...pq],
      visited: [...visited],
      desc: `Initialize distances and priority queue`,
      current: null
    });
    
    steps.push({
      line: 8,
      distances: {...distances},
      prev: {...prev},
      pq: [...pq],
      visited: [...visited],
      desc: `Set distance[${startNode}] = 0`,
      current: null
    });
    
    steps.push({
      line: 9,
      distances: {...distances},
      prev: {...prev},
      pq: [...pq],
      visited: [...visited],
      desc: `Add ${startNode} to priority queue`,
      current: null
    });
    
    while (pq.length > 0) {
      pq.sort((a, b) => a.dist - b.dist);
      const next = pq.shift();
      if (!next) break;
      const { node: current } = next;
      
      if (visited.has(current)) continue;
      visited.add(current);
      
      steps.push({
        line: 12,
        distances: {...distances},
        prev: {...prev},
        pq: [...pq],
        visited: [...visited],
        desc: `Sort priority queue and select ${current}`,
        current
      });
      
      steps.push({
        line: 13,
        distances: {...distances},
        prev: {...prev},
        pq: [...pq],
        visited: [...visited],
        desc: `Mark ${current} as visited`,
        current
      });
      
      for (const neighbor of adjacencyList[current] || []) {
        const to = neighbor.to;
        const weight = neighbor.weight;
        const newDist = distances[current] + weight;
        
        steps.push({
          line: 15,
          distances: {...distances},
          prev: {...prev},
          pq: [...pq],
          visited: [...visited],
          desc: `Check neighbor ${to} (weight: ${weight})`,
          current,
          checking: to,
          newDist
        });
        
        if (newDist < distances[to]) {
          distances[to] = newDist;
          prev[to] = current;
          pq.push({ node: to, dist: newDist });
          
          steps.push({
            line: 16,
            distances: {...distances},
            prev: {...prev},
            pq: [...pq],
            visited: [...visited],
            desc: `Update distance[${to}] = ${newDist}, prev[${to}] = ${current}`,
            current,
            checking: to
          });
        }
      }
    }
    
    // Build shortest path
    let path: string[] = [];
    let curr = endNode;
    if (distances[endNode] !== Infinity) {
      while (curr && prev[curr]) {
        path.unshift(curr);
        curr = prev[curr]!;
      }
      if (curr === startNode) path.unshift(startNode);
    }
    
    steps.push({
      line: 22,
      distances: {...distances},
      prev: {...prev},
      pq: [...pq],
      visited: [...visited],
      desc: `Build shortest path: ${path.join(' → ')}`,
      current: null,
      path
    });
    
    return steps;
  };

  const reset = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setNodes(nodes.map(node => ({ 
      ...node, 
      visited: false, 
      current: false 
    })));
    setShortestPath([]);
    setDistances({});
    setTraversalOrder([]);
    setSteps([]);
    setCurrentStepIdx(0);
    setIsAutoPlaying(false);
  };

  // DFS Traversal with output
  const dfsTraversal = async (nodeId: string, visited: Set<string>, adjacencyList: { [key: string]: { to: string; weight: number }[] }, order: string[] = []) => {
    if (!isPlayingRef.current || visited.has(nodeId)) return;
    visited.add(nodeId);
    order.push(nodeId);
    setNodes(prev => prev.map(node => ({
      ...node,
      current: node.id === nodeId,
      visited: visited.has(node.id)
    })));
    setTraversalOrder([...order]);
    await sleep(1200);
    if (!isPlayingRef.current) return;
    for (const neighbor of adjacencyList[nodeId]) {
      if (!visited.has(neighbor.to) && isPlayingRef.current) {
        await dfsTraversal(neighbor.to, visited, adjacencyList, order);
      }
    }
    if (isPlayingRef.current) {
      setNodes(prev => prev.map(node => ({
        ...node,
        current: false
      })));
    }
  };

  // BFS Traversal with output
  const bfsTraversal = async () => {
    const adjacencyList = getAdjacencyList();
    const visited = new Set<string>();
    const queue = [startNode];
    const order: string[] = [];
    visited.add(startNode);
    while (queue.length > 0 && isPlayingRef.current) {
      const currentNode = queue.shift()!;
      order.push(currentNode);
      setNodes(prev => prev.map(node => ({
        ...node,
        current: node.id === currentNode,
        visited: visited.has(node.id)
      })));
      setTraversalOrder([...order]);
      await sleep(1200);
      for (const neighbor of adjacencyList[currentNode]) {
        if (!visited.has(neighbor.to)) {
          visited.add(neighbor.to);
          queue.push(neighbor.to);
        }
      }
    }
    setNodes(prev => prev.map(node => ({
      ...node,
      current: false
    })));
    setIsPlaying(false);
    isPlayingRef.current = false;
  };

  // Dijkstra visualization logic
  const dijkstraTraversal = async () => {
    const adjacencyList = getAdjacencyList();
    const distances: {[key:string]: number} = {};
    const prev: {[key:string]: string|null} = {};
    const visited = new Set<string>();
    const pq: { node: string; dist: number }[] = [];
    nodes.forEach(node => {
      distances[node.id] = Infinity;
      prev[node.id] = null;
    });
    distances[startNode] = 0;
    pq.push({ node: startNode, dist: 0 });
    while (pq.length > 0 && isPlayingRef.current) {
      pq.sort((a, b) => a.dist - b.dist);
      const next = pq.shift();
      if (!next) break;
      const { node: current } = next;
      if (visited.has(current)) continue;
      visited.add(current);
      setNodes(prevNodes => prevNodes.map(n => ({
        ...n,
        current: n.id === current,
        visited: visited.has(n.id)
      })));
      await sleep(1200);
      for (const neighbor of adjacencyList[current] as { to: string; weight: number }[]) {
        const { to, weight } = neighbor;
        if (distances[current] + weight < distances[to]) {
          distances[to] = distances[current] + weight;
          prev[to] = current;
          pq.push({ node: to, dist: distances[to] });
        }
      }
    }
    // Build shortest path from startNode to endNode
    let path: string[] = [];
    let curr = endNode;
    if (distances[endNode] !== Infinity) {
      while (curr && prev[curr]) {
        path.unshift(curr);
        curr = prev[curr]!;
      }
      if (curr === startNode) path.unshift(startNode);
    }
    setShortestPath(path);
    setDistances({...distances});
    setNodes(prevNodes => prevNodes.map(n => ({
      ...n,
      current: false,
      visited: visited.has(n.id) || path.includes(n.id)
    })));
    setIsPlaying(false);
    isPlayingRef.current = false;
  };

  const play = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    isPlayingRef.current = true;
    reset();
    await sleep(100);
    isPlayingRef.current = true;
    let steps = [];
    if (selectedAlgorithm === 'dfs') {
      steps = generateDFSSteps(startNode);
    } else if (selectedAlgorithm === 'bfs') {
      steps = generateBFSSteps(startNode);
    } else if (selectedAlgorithm === 'dijkstra') {
      steps = generateDijkstraSteps(startNode, endNode);
    }
    setSteps(steps);
    setCurrentStepIdx(0);
    setIsAutoPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
  };

  useEffect(() => {
    reset();
  }, [selectedAlgorithm]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Stepper controls for Graph Algorithms
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
    }, 1200);
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentStepIdx, steps.length]);

  // Đồng bộ output với bước stepper
  useEffect(() => {
    if (steps.length === 0) return;
    if (selectedAlgorithm === 'dfs' || selectedAlgorithm === 'bfs') {
      setTraversalOrder(steps[currentStepIdx]?.order || []);
    } else if (selectedAlgorithm === 'dijkstra') {
      setDistances(steps[currentStepIdx]?.distances || {});
      // Tính shortestPath tại mỗi bước nếu có prev
      const prev = steps[currentStepIdx]?.prev;
      if (prev) {
        let path: string[] = [];
        let curr = endNode;
        while (curr && prev[curr]) {
          path.unshift(curr);
          curr = prev[curr];
        }
        if (curr === startNode) path.unshift(startNode);
        setShortestPath(path);
      } else {
        setShortestPath([]);
      }
    }
  }, [currentStepIdx, steps, selectedAlgorithm, startNode, endNode]);

  return (
    <div className="space-y-6">
      <AlgorithmSelector
        algorithms={algorithms}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
      />
      {/* Input selectors for start and end node for Dijkstra, start node for BFS/DFS */}
      {(selectedAlgorithm === 'dijkstra' || selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs') && (
        <div className="flex flex-wrap gap-4 items-center bg-gray-700 p-4 rounded-lg">
          <div>
            <label className="text-gray-200 mr-2">Start Node:</label>
            <select
              title="Start Node"
              className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-600 focus:border-purple-500 outline-none"
              value={startNode}
              onChange={e => setStartNode(e.target.value)}
            >
              {nodeIds.map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          </div>
          {selectedAlgorithm === 'dijkstra' && (
            <div>
              <label className="text-gray-200 mr-2">End Node:</label>
              <select
                title="End Node"
                className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-600 focus:border-purple-500 outline-none"
                value={endNode}
                onChange={e => setEndNode(e.target.value)}
              >
                {nodeIds.map(id => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <GraphVisualization
            nodes={steps.length > 0 ? nodes.map(node => ({
              ...node,
              visited: steps[currentStepIdx]?.visited?.includes(node.id) || false,
              current: node.id === steps[currentStepIdx]?.current
            })) : nodes}
            edges={edges}
            highlightPath={selectedAlgorithm === 'dijkstra' ? shortestPath : traversalOrder}
            showWeights={true}
          />
          <ControlPanel
            isPlaying={isPlaying}
            onPlay={play}
            onPause={pause}
            onReset={reset}
            hideGenerateArray={true}
          />
          {/* Stepper controls for Graph Algorithms */}
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
            selectedAlgorithm === 'dfs' ? (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  {dfsLines.map((line, idx) => (
                    <div key={idx} style={{ background: idx === steps[currentStepIdx].line ? '#fbbf24' : 'transparent', color: idx === steps[currentStepIdx].line ? '#222' : '#fff', fontWeight: idx === steps[currentStepIdx].line ? 'bold' : 'normal', padding: '2px 0' }}>
                      {line}
                    </div>
                  ))}
                </pre>
                <div className="mt-2 text-gray-200 text-xs">{steps[currentStepIdx].desc}</div>
                <div className="mt-2 text-gray-300 text-xs">Current: {steps[currentStepIdx].current || '-'}, Visited: [{steps[currentStepIdx].visited?.join(', ') || ''}], Order: [{steps[currentStepIdx].order?.join(', ') || ''}]</div>
              </div>
            ) : selectedAlgorithm === 'bfs' ? (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  {bfsLines.map((line, idx) => (
                    <div key={idx} style={{ background: idx === steps[currentStepIdx].line ? '#fbbf24' : 'transparent', color: idx === steps[currentStepIdx].line ? '#222' : '#fff', fontWeight: idx === steps[currentStepIdx].line ? 'bold' : 'normal', padding: '2px 0' }}>
                      {line}
                    </div>
                  ))}
                </pre>
                <div className="mt-2 text-gray-200 text-xs">{steps[currentStepIdx].desc}</div>
                <div className="mt-2 text-gray-300 text-xs">Current: {steps[currentStepIdx].current || '-'}, Queue: [{steps[currentStepIdx].queue?.join(', ') || ''}], Visited: [{steps[currentStepIdx].visited?.join(', ') || ''}], Order: [{steps[currentStepIdx].order?.join(', ') || ''}]</div>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  {dijkstraLines.map((line, idx) => (
                    <div key={idx} style={{ background: idx === steps[currentStepIdx].line ? '#fbbf24' : 'transparent', color: idx === steps[currentStepIdx].line ? '#222' : '#fff', fontWeight: idx === steps[currentStepIdx].line ? 'bold' : 'normal', padding: '2px 0' }}>
                      {line}
                    </div>
                  ))}
                </pre>
                <div className="mt-2 text-gray-200 text-xs">{steps[currentStepIdx].desc}</div>
                <div className="mt-2 text-gray-300 text-xs">Current: {steps[currentStepIdx].current || '-'}, Checking: {steps[currentStepIdx].checking || '-'}, PQ: [{steps[currentStepIdx].pq?.map((p: any) => `${p.node}(${p.dist})`).join(', ') || ''}]</div>
              </div>
            )
          ) : (
            <CodeDisplay
              code={getAlgorithmCode()}
              language="javascript"
              title={algorithms.find(a => a.id === selectedAlgorithm)?.name || ''}
            />
          )}
          {/* Output results for Dijkstra */}
          {selectedAlgorithm === 'dijkstra' && (
            <div className="bg-gray-700 rounded-lg p-4 text-gray-100">
              <h3 className="font-bold text-lg mb-2">Dijkstra Output</h3>
              <div className="mb-2">Shortest path from <b>{startNode}</b> to <b>{endNode}</b>:</div>
              {shortestPath.length === 0 ? (
                <div className="mb-2 text-yellow-400">Finding path...</div>
              ) : shortestPath.length > 1 && distances[endNode] !== undefined && distances[endNode] !== Infinity ? (
                <div className="mb-2 text-green-400 font-semibold">{shortestPath.join(' → ')}</div>
              ) : (
                <div className="mb-2 text-red-400">No path found.</div>
              )}
              <div className="mb-2">Distance from <b>{startNode}</b> to <b>{endNode}</b>: <span className="font-semibold">{distances[endNode] !== undefined && distances[endNode] !== Infinity ? distances[endNode] : shortestPath.length === 0 ? '...' : '∞'}</span></div>
              <div className="mt-2">
                <b>All distances from {startNode}:</b>
                <ul className="list-disc ml-6">
                  {Object.entries(distances).map(([k, v]) => (
                    <li key={k}>{k}: {v !== Infinity ? v : '∞'}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {/* Output results for BFS/DFS */}
          {(selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs') && (
            <div className="bg-gray-700 rounded-lg p-4 text-gray-100">
              <h3 className="font-bold text-lg mb-2">{selectedAlgorithm === 'bfs' ? 'BFS' : 'DFS'} Output</h3>
              <div className="mb-2">Traversal order starting from <b>{startNode}</b>:</div>
              {traversalOrder.length > 0 ? (
                <div className="mb-2 text-green-400 font-semibold">{traversalOrder.join(' → ')}</div>
              ) : (
                <div className="mb-2 text-red-400">No traversal yet.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
