'use client';

interface CodeDisplayProps {
  code: string;
  language: string;
  title: string;
}

export default function CodeDisplay({ code, language, title }: CodeDisplayProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-700 px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-300 font-medium">{title}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-file-copy-line"></i>
          <span className="text-sm">Copy</span>
        </button>
      </div>
      
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-300">
          <code className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
      
      <div className="bg-gray-700 px-4 py-2 text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <span>Language: {language.toUpperCase()}</span>
          <span>Lines: {code.split('\n').length}</span>
        </div>
      </div>
    </div>
  );
}