
import React from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ReviewDisplayProps {
  review: string | null;
  isLoading: boolean;
  error: string | null;
}

const Loader: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-gem-mist">
         <svg className="animate-spin h-10 w-10 text-gem-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg">Gemini is analyzing your code...</p>
        <p className="text-sm text-gem-slate">This may take a moment.</p>
    </div>
);

const InitialState: React.FC = () => (
     <div className="flex flex-col items-center justify-center h-full text-center text-gem-mist p-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gem-slate mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.5 21.75l-.398-1.188a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.188-.398a2.25 2.25 0 001.423-1.423L16.5 15.75l.398 1.188a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.188.398a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
        <h2 className="text-2xl font-semibold mb-2">Code Review Awaits</h2>
        <p className="max-w-md text-gem-slate">
            Paste your code in the editor, select the language, and click "Review Code" to get instant, AI-powered feedback.
        </p>
    </div>
);

export const ReviewDisplay: React.FC<ReviewDisplayProps> = ({ review, isLoading, error }) => {
  return (
    <div className="bg-gem-onyx rounded-lg shadow-lg flex flex-col h-full overflow-y-auto border border-gem-slate">
      <div className="p-3 bg-gem-slate/50 border-b border-gem-slate">
        <h2 className="text-lg font-semibold text-gem-mist">Review Feedback</h2>
      </div>
      <div className="flex-grow p-4">
        {isLoading && <Loader />}
        {error && <div className="text-red-400 bg-red-900/20 p-4 rounded-md border border-red-700">{error}</div>}
        {!isLoading && !error && review && <MarkdownRenderer content={review} />}
        {!isLoading && !error && !review && <InitialState />}
      </div>
    </div>
  );
};
