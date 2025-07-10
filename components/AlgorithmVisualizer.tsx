'use client';

import { useState } from 'react';
import Header from './Header';
import TabNavigation from './TabNavigation';
import SortingAlgorithms from './algorithms/SortingAlgorithms';
import SearchingAlgorithms from './algorithms/SearchingAlgorithms';
import GraphAlgorithms from './algorithms/GraphAlgorithms';

export default function AlgorithmVisualizer() {
  const [activeTab, setActiveTab] = useState('sorting');

  const renderContent = () => {
    switch (activeTab) {
      case 'sorting':
        return <SortingAlgorithms />;
      case 'searching':
        return <SearchingAlgorithms />;
      case 'graph':
        return <GraphAlgorithms />;
      default:
        return <SortingAlgorithms />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}