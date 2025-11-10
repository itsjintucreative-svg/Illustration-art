
import React, { useState, useEffect } from 'react';
import { Spinner } from './Spinner';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const WelcomePlaceholder: React.FC = () => (
    <div className="text-center p-8 border-2 border-dashed border-gray-700 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-4 text-xl font-semibold text-gray-300">Your artwork will appear here</h3>
        <p className="mt-1 text-gray-500">Enter a prompt and click "Generate" to start creating.</p>
    </div>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        if(imageUrl) {
            setIsImageLoaded(false);
        }
    }, [imageUrl]);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    return (
        <div className="w-full min-h-[300px] md:min-h-[500px] bg-black/30 rounded-xl flex items-center justify-center p-4 transition-all duration-300">
            {isLoading && (
                <div className="text-center space-y-4">
                    <Spinner className="w-16 h-16 text-purple-500" />
                    <p className="text-lg text-gray-400 animate-pulse">Conjuring your masterpiece...</p>
                </div>
            )}
            {error && !isLoading && (
                <div className="text-center text-red-400 p-4 bg-red-900/30 rounded-lg">
                    <p className="font-bold">An error occurred</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}
            {!isLoading && !error && !imageUrl && <WelcomePlaceholder />}
            {imageUrl && (
                <div className="relative w-full h-full group">
                    {!isImageLoaded && <div className="absolute inset-0 flex items-center justify-center"><Spinner className="w-12 h-12 text-purple-500" /></div>}
                    <img 
                        src={imageUrl} 
                        alt="Generated illustration" 
                        className={`max-w-full max-h-[80vh] rounded-lg shadow-2xl shadow-black transition-opacity duration-1000 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={handleImageLoad}
                    />
                    {isImageLoaded && (
                         <a
                            href={imageUrl}
                            download="illustration.jpg"
                            className="absolute bottom-4 right-4 bg-black/50 text-white py-2 px-4 rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Download
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};
