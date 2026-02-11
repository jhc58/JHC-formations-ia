
import React, { useState, useEffect } from 'react';
import { AI_DATA } from './data';
import { Category, Review } from './types';
import { CategoryTree } from './components/CategoryTree';
import { TaskDetails } from './components/TaskDetails';
import { SearchAndAdvisor } from './components/SearchAndAdvisor';
import { ReviewSection } from './components/ReviewSection';
import { SettingsMenu } from './components/SettingsMenu';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeAIForReview, setActiveAIForReview] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');

  useEffect(() => {
    const saved = localStorage.getItem('ai_reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      const initial: Review[] = [
        { id: '1', aiName: 'Claude', userName: 'Lucie', rating: 5, comment: 'Incroyable pour coder et résumer des PDFs.', date: new Date().toISOString() },
        { id: '2', aiName: 'ChatGPT', userName: 'Marc', rating: 4, comment: 'Très polyvalent mais parfois un peu trop bavard.', date: new Date().toISOString() },
        { id: '3', aiName: 'Perplexity', userName: 'Jean', rating: 5, comment: 'Ma page d\'accueil par défaut pour toute recherche.', date: new Date().toISOString() },
      ];
      setReviews(initial);
      localStorage.setItem('ai_reviews', JSON.stringify(initial));
    }
  }, []);

  const handleAddReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const review: Review = {
      ...newReview,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem('ai_reviews', JSON.stringify(updated));
  };

  const handleUpdateApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  return (
    <div className="min-h-screen pb-40 overflow-x-hidden">
      <SettingsMenu 
        reviews={reviews} 
        onImportReviews={(imp) => {
          setReviews(imp);
          localStorage.setItem('ai_reviews', JSON.stringify(imp));
        }}
        apiKey={apiKey}
        onUpdateApiKey={handleUpdateApiKey}
      />

      {/* Header Lumineux */}
      <header className="pt-16 pb-12 px-4 relative z-20">
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-emerald-900 text-xs font-black tracking-widest uppercase shadow-sm">
            Nature Digitale 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-serif tracking-tighter mb-4 text-emerald-950 drop-shadow-md">
            L'Arbre des <span className="italic text-emerald-700">IA</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-900/60 max-w-xl mx-auto font-medium leading-relaxed italic">
            Naviguez dans le feuillage fertile des intelligences gratuites.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20">
        <SearchAndAdvisor userApiKey={apiKey} />

        <div className="max-w-7xl mx-auto px-4">
          {!selectedCategory ? (
            <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <CategoryTree 
                categories={AI_DATA} 
                onSelect={(cat) => {
                  setSelectedCategory(cat);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
              />
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-700 bg-white/95 backdrop-blur-2xl rounded-[3.5rem] p-10 md:p-16 border border-emerald-100 shadow-2xl mb-40">
              <TaskDetails 
                category={selectedCategory} 
                reviews={reviews}
                onBack={() => setSelectedCategory(null)} 
                onOpenReviews={(ai) => setActiveAIForReview(ai)}
              />
            </div>
          )}
        </div>
      </main>

      {/* Review Modal */}
      {activeAIForReview && (
        <ReviewSection 
          aiName={activeAIForReview}
          reviews={reviews}
          onAddReview={handleAddReview}
          onClose={() => setActiveAIForReview(null)}
        />
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 w-full py-6 text-center bg-transparent pointer-events-none">
        <p className="text-emerald-900/30 text-[9px] font-bold uppercase tracking-[0.6em] drop-shadow-sm">
          Cultivé avec soin par l'intelligence universelle
        </p>
      </footer>
    </div>
  );
};

export default App;
