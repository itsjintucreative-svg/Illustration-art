
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ImageDisplay } from './components/ImageDisplay';
import { Footer } from './components/Footer';
import { generateIllustration } from './services/geminiService';
import type { AspectRatio } from './types';

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (prompt: string, aspectRatio: AspectRatio) => {
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const url = await generateIllustration(prompt, aspectRatio);
      setImageUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black text-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col gap-8 md:gap-12">
          <PromptForm onSubmit={handleGenerate} isLoading={isLoading} />
          <ImageDisplay imageUrl={imageUrl} isLoading={isLoading} error={error} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
