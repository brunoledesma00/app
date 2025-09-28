
import React from 'react';
import { PROGRAMMING_LANGUAGES, Language } from '../constants';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onReview: () => void;
  isLoading: boolean;
}

const MagicWandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69a.75.75 0 01.981.981A10.501 10.501 0 0118 16.5a10.5 10.5 0 01-10.5-10.5c0-1.77.445-3.442 1.229-4.942a.75.75 0 01.8-.162zM5.25 7.5A2.25 2.25 0 003 9.75v6A2.25 2.25 0 005.25 18h6A2.25 2.25 0 0013.5 15.75v-6A2.25 2.25 0 0011.25 7.5h-6z" clipRule="evenodd" />
    </svg>
);


export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  setCode,
  language,
  setLanguage,
  onReview,
  isLoading,
}) => {
  return (
    <div className="bg-gem-onyx rounded-lg shadow-lg flex flex-col h-full overflow-hidden border border-gem-slate">
      <div className="flex items-center justify-between p-3 bg-gem-slate/50 border-b border-gem-slate">
        <label htmlFor="language-select" className="text-sm font-medium text-gem-mist">
          Language:
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gem-jet border border-gem-slate text-gem-light text-sm rounded-md focus:ring-gem-primary focus:border-gem-primary p-2"
        >
          {PROGRAMMING_LANGUAGES.map((lang: Language) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-grow p-1">
         <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full h-full p-3 bg-transparent text-gem-light font-mono resize-none focus:outline-none placeholder-gem-slate"
            spellCheck="false"
        />
      </div>
      <div className="p-3 bg-gem-onyx border-t border-gem-slate">
        <button
          onClick={onReview}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-gem-primary hover:bg-blue-500 disabled:bg-gem-slate disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
        >
          {isLoading ? (
            'Analyzing...'
          ) : (
            <>
                <MagicWandIcon className="w-5 h-5" />
                Review Code
            </>
          )}
        </button>
      </div>
    </div>
  );
};
