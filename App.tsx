
import React, { useState, useCallback } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { ReviewDisplay } from './components/ReviewDisplay';
import { reviewCode } from './services/geminiService';
import { PROGRAMMING_LANGUAGES } from './constants';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(PROGRAMMING_LANGUAGES[0].value);
  const [review, setReview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setReview(null);

    try {
      const result = await reviewCode(code, language);
      setReview(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to get review. ${errorMessage}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-gem-jet text-gem-light font-sans flex flex-col">
      <header className="p-4 border-b border-gem-onyx shadow-md bg-gem-slate/30">
        <h1 className="text-2xl font-bold text-center text-gem-mist">
          <span className="text-gem-primary">Gemini</span> Code Reviewer
        </h1>
      </header>
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-[calc(100vh-65px)]">
        <CodeEditor
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          onReview={handleReview}
          isLoading={isLoading}
        />
        <ReviewDisplay
          review={review}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;
