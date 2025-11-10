import React, { useState } from 'react';
import type { AspectRatio } from '../types';
import { Spinner } from './Spinner';

interface PromptFormProps {
  onSubmit: (prompt: string, aspectRatio: AspectRatio) => void;
  isLoading: boolean;
}

// Fix: Use React.ReactElement to avoid "Cannot find namespace 'JSX'" error.
const aspectRatios: { value: AspectRatio; label: string; icon: React.ReactElement }[] = [
  { value: '1:1', label: 'Square', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg> },
  { value: '3:4', label: 'Portrait', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect></svg> },
  // Fix: Corrected label for 4:3 from 'Portrait' to 'Landscape'.
  { value: '4:3', label: 'Landscape', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-90"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect></svg> },
  { value: '16:9', label: 'Landscape', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect></svg> },
  { value: '9:16', label: 'Tall', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="10" height="20" rx="2" ry="2"></rect></svg> },
];


export const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState<string>('A majestic glowing deer in an enchanted forest at night');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt, aspectRatio);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the illustration you want to create..."
          className="w-full h-28 p-4 pr-12 text-lg bg-gray-900 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300 resize-none"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-3">Aspect Ratio</label>
        <div className="flex flex-wrap gap-3">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio.value}
              type="button"
              onClick={() => setAspectRatio(ratio.value)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 border-2 ${
                aspectRatio === ratio.value
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600'
              }`}
              disabled={isLoading}
            >
              {ratio.icon}
              {ratio.label} ({ratio.value})
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full flex items-center justify-center gap-2 text-xl font-bold p-4 rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-pink-600/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <Spinner />
            Generating...
          </>
        ) : (
          'Generate Artwork'
        )}
      </button>
    </form>
  );
};
