'use client';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = [
    { id: 'sorting', label: 'Sorting', icon: 'ri-sort-asc' },
    { id: 'searching', label: 'Searching', icon: 'ri-search-line' },
    { id: 'graph', label: 'Graph Traversal', icon: 'ri-node-tree' }
  ];

  return (
    <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all whitespace-nowrap cursor-pointer ${
            activeTab === tab.id
              ? 'bg-purple-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <i className={`${tab.icon} text-lg`}></i>
          <span className="font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}