'use client';

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
  weight?: number;
}

interface GraphVisualizationProps {
  nodes: Node[];
  edges: Edge[];
  highlightPath?: string[];
  showWeights?: boolean;
  highlightEdge?: { from: string; to: string; weight: number };
  distances?: { [key: string]: number };
  currentNode?: string;
  visitedNodes?: string[];
  pq?: any[];
}

export default function GraphVisualization({ 
  nodes, 
  edges, 
  highlightPath = [], 
  showWeights = false,
  highlightEdge,
  distances,
  currentNode,
  visitedNodes = [],
  pq = []
}: GraphVisualizationProps) {
  const getNodeColor = (node: Node) => {
    if (node.current) return '#fbbf24'; // yellow-400
    if (node.visited) return '#10b981'; // emerald-500
    // For Greedy Best-First Search
    if (currentNode && node.id === currentNode) return '#fbbf24'; // yellow-400
    if (visitedNodes && visitedNodes.includes(node.id)) return '#10b981'; // emerald-500
    return '#3b82f6'; // blue-500
  };

  const getNodeById = (id: string) => {
    return nodes.find(node => node.id === id);
  };

  // Helper to check if edge is in highlightPath
  const isEdgeInPath = (from: string, to: string) => {
    for (let i = 0; i < highlightPath.length - 1; i++) {
      if ((highlightPath[i] === from && highlightPath[i + 1] === to) || (highlightPath[i] === to && highlightPath[i + 1] === from)) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Graph Visualization</h3>
      
      <div className="relative bg-gray-900 rounded-lg p-4" style={{ height: '400px' }}>
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Render edges */}
          {edges.map((edge, index) => {
            const fromNode = getNodeById(edge.from);
            const toNode = getNodeById(edge.to);
            
            if (!fromNode || !toNode) return null;
            
            const isActiveEdge = isEdgeInPath(edge.from, edge.to);
            // For Bellman-Ford: highlight edge being relaxed
            const isHighlightEdge = highlightEdge && 
              ((highlightEdge.from === edge.from && highlightEdge.to === edge.to) || 
               (highlightEdge.from === edge.to && highlightEdge.to === edge.from));
            
            return (
              <g key={index}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isActiveEdge ? '#fbbf24' : isHighlightEdge ? '#ef4444' : '#4b5563'}
                  strokeWidth={isActiveEdge ? '4' : isHighlightEdge ? '4' : '2'}
                  className="transition-all duration-300"
                />
                {showWeights && edge.weight !== undefined && (
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 - 8}
                    textAnchor="middle"
                    fill={isHighlightEdge ? '#ef4444' : '#fbbf24'}
                    fontSize="13"
                    fontWeight="bold"
                  >
                    {edge.weight}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* Render nodes */}
          {nodes.map((node) => (
            <g key={node.id} className="transition-all duration-300">
              <circle
                cx={node.x}
                cy={node.y}
                r="20"
                fill={getNodeColor(node)}
                stroke="#1f2937"
                strokeWidth="2"
                className="transition-all duration-300"
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {node.id}
              </text>
              {/* Display distances for Bellman-Ford and Dijkstra */}
              {distances && distances[node.id] !== undefined && (
                <text
                  x={node.x}
                  y={node.y + 35}
                  textAnchor="middle"
                  fill={distances[node.id] === Infinity ? '#ef4444' : '#10b981'}
                  fontSize="12"
                  fontWeight="bold"
                >
                  {distances[node.id] === Infinity ? '∞' : distances[node.id]}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      
      <div className="mt-4 flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-gray-300">Unvisited</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          <span className="text-gray-300">Current</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
          <span className="text-gray-300">Visited</span>
        </div>
        {highlightEdge && (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">Relaxing Edge</span>
          </div>
        )}
        {pq && pq.length > 0 && (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <span className="text-gray-300">In PQ</span>
          </div>
        )}
      </div>
    </div>
  );
}