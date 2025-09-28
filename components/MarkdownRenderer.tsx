
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderContent = () => {
    // Split content by code blocks, keeping the delimiters
    const parts = content.split(/(\`\`\`[\s\S]*?\`\`\`)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const codeBlock = part.slice(3, -3);
        const languageMatch = codeBlock.match(/^[a-zA-Z]+\n/);
        const language = languageMatch ? languageMatch[0].trim() : '';
        const code = languageMatch ? codeBlock.substring(languageMatch[0].length) : codeBlock;

        return (
          <div key={index} className="bg-gem-jet rounded-md my-4 overflow-hidden border border-gem-slate">
            {language && (
              <div className="text-xs text-gem-mist bg-gem-slate/50 px-4 py-1 font-sans">
                {language}
              </div>
            )}
            <pre className="p-4 text-sm text-gem-light whitespace-pre-wrap overflow-x-auto">
              <code>{code.trim()}</code>
            </pre>
          </div>
        );
      }

      // Process non-code parts
      return part.split('\n').map((line, lineIndex) => {
        if (line.startsWith('#### ')) {
          return <h4 key={`${index}-${lineIndex}`} className="text-lg font-semibold mt-4 mb-2">{line.substring(5)}</h4>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={`${index}-${lineIndex}`} className="text-xl font-semibold mt-5 mb-2 border-b border-gem-slate pb-1">{line.substring(4)}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={`${index}-${lineIndex}`} className="text-2xl font-bold mt-6 mb-3 border-b-2 border-gem-slate pb-2">{line.substring(3)}</h2>;
        }
        if (line.startsWith('# ')) {
          return <h1 key={`${index}-${lineIndex}`} className="text-3xl font-bold mt-8 mb-4 border-b-2 border-gem-primary pb-2">{line.substring(2)}</h1>;
        }
        if (line.startsWith('* ')) {
          return <li key={`${index}-${lineIndex}`} className="ml-6 my-1 list-disc text-gem-mist">{line.substring(2)}</li>;
        }
        if (line.trim().startsWith('1. ')) {
            return <li key={`${index}-${lineIndex}`} className="ml-6 my-1 list-decimal text-gem-mist">{line.substring(line.indexOf('.') + 1).trim()}</li>;
        }
        if (line.trim() === '---') {
            return <hr key={`${index}-${lineIndex}`} className="my-6 border-gem-slate" />;
        }
        
        // Bold text with **text**
        const boldedLine = line.split(/(\*\*[\s\S]*?\*\*)/g).map((textPart, i) => {
            if (textPart.startsWith('**') && textPart.endsWith('**')) {
                return <strong key={i} className="font-bold text-gem-light">{textPart.slice(2, -2)}</strong>;
            }
            return textPart;
        });

        return <p key={`${index}-${lineIndex}`} className="my-2 text-gem-mist leading-relaxed">{boldedLine}</p>;
      });
    });
  };

  return <div className="prose prose-invert max-w-none font-sans">{renderContent()}</div>;
};
