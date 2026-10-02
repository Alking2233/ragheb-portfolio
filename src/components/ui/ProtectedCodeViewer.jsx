import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { HiLockClosed } from 'react-icons/hi';

export default function ProtectedCodeViewer({ snippets }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!snippets || snippets.length === 0) {
    return (
      <div className="rounded-2xl border border-white/5 bg-coal p-8 text-center text-mist">
        <p>No code snippets available for this project yet.</p>
      </div>
    );
  }

  const currentSnippet = snippets[activeTab];

  // منع النقر بزر الماوس الأيمن على منطقة الكود
  const handleContextMenu = (e) => {
    e.preventDefault();
    alert('🔒 Code is protected for portfolio viewing only. Unauthorized copying is prohibited.');
  };

  // منع اختصارات لوحة المفاتيح للنسخ (Ctrl+C, Cmd+C)
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      e.preventDefault();
      alert('🔒 Copying is disabled for this protected code snippet.');
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] shadow-2xl">
      {/* رأس العارض (Tabs + Lock Icon) */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-4 py-2">
        <div className="flex gap-1 overflow-x-auto">
          {snippets.map((snippet, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === idx
                  ? 'bg-white/10 text-gold'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {snippet.filename}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <HiLockClosed className="h-4 w-4 text-gold" />
          <span className="hidden sm:inline font-semibold">PROTECTED VIEW</span>
        </div>
      </div>

      {/* منطقة الكود مع الحماية القصوى */}
      <div 
        className="relative max-h-500px overflow-auto"
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
        tabIndex={0} // لجعل div قابلاً لاستقبال أحداث لوحة المفاتيح
        style={{ 
          userSelect: 'none', 
          WebkitUserSelect: 'none', 
          MozUserSelect: 'none', 
          msUserSelect: 'none',
          outline: 'none'
        }}
      >
        {/* طبقة مائية خفيفة (Watermark Overlay) */}
        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center opacity-[0.04]">
          <span className="rotate-[-30deg] font-display text-5xl font-bold text-white whitespace-nowrap tracking-widest">
            RAGHEB YOSSOF • PORTFOLIO
          </span>
        </div>

        <SyntaxHighlighter
          language={currentSnippet.language}
          style={vscDarkPlus}
          showLineNumbers
          wrapLines
          customStyle={{
            margin: 0,
            background: 'transparent',
            fontSize: '0.9rem',
            lineHeight: '1.6',
          }}
          lineNumberStyle={{
            minWidth: '3em',
            paddingRight: '1em',
            color: '#6e7681',
            userSelect: 'none',
          }}
        >
          {currentSnippet.code}
        </SyntaxHighlighter>
      </div>

      {/* تذييل العارض - رسالة حماية صارمة */}
      <div className="border-t border-white/10 bg-[#252526] px-4 py-3 text-center">
        <p className="text-[11px] font-medium text-gray-400">
          🔒 This code snippet is part of Ragheb Yossof's professional portfolio. 
        </p>
        <p className="mt-1 text-[10px] text-gray-600">
          Viewing only — copying, reproduction, or distribution is strictly prohibited without written permission.
        </p>
      </div>
    </div>
  );
}