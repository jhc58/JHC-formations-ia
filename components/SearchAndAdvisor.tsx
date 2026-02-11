
import React, { useState } from 'react';
import { getAIAssistantAdvice } from '../services/geminiService';

interface SearchAndAdvisorProps {
  userApiKey?: string;
}

export const SearchAndAdvisor: React.FC<SearchAndAdvisorProps> = ({ userApiKey }) => {
  const [query, setQuery] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    // On passe la clé utilisateur si elle existe, sinon le service utilisera process.env.API_KEY
    const result = await getAIAssistantAdvice(query, userApiKey);
    setAdvice(result || null);
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mb-16 px-4 relative z-50">
      <div className="relative group">
        <form onSubmit={handleSearch} className="relative z-10 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Que voulez-vous cultiver aujourd'hui ?"
              className="w-full pl-14 pr-6 py-5 bg-white/80 backdrop-blur-2xl border-2 border-emerald-100 rounded-[2rem] shadow-2xl focus:border-emerald-400 focus:ring-8 focus:ring-emerald-400/5 outline-none transition-all text-xl text-emerald-950 placeholder:text-emerald-200 font-medium"
            />
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="px-10 py-5 bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-100 text-white font-black rounded-[2rem] shadow-xl hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest text-xs"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : 'Inspirer'}
          </button>
        </form>
      </div>

      {advice && (
        <div className="mt-6 animate-in slide-in-from-top-4 fade-in duration-700">
          <div className="bg-white/90 backdrop-blur-3xl border-l-8 border-emerald-500 p-8 rounded-r-[2rem] shadow-2xl border border-emerald-50">
            <div className="flex items-start gap-5">
              <div className="bg-emerald-700 text-white px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase shrink-0">
                Oracle
              </div>
              <p className="text-emerald-950 text-xl italic leading-relaxed font-medium">
                "{advice}"
              </p>
            </div>
            <button 
              onClick={() => setAdvice(null)}
              className="mt-4 text-[10px] text-emerald-300 hover:text-emerald-500 font-black uppercase tracking-[0.3em] transition-colors"
            >
              Cacher la vision
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
