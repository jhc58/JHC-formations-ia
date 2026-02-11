
import React from 'react';
import { Category, Task, Review } from '../types';

interface TaskDetailsProps {
  category: Category;
  reviews: Review[];
  onBack: () => void;
  onOpenReviews: (aiName: string) => void;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ category, reviews, onBack, onOpenReviews }) => {
  const getAverageRating = (aiName: string) => {
    const aiReviews = reviews.filter(r => r.aiName.includes(aiName) || aiName.includes(r.aiName));
    if (aiReviews.length === 0) return null;
    return aiReviews.reduce((acc, r) => acc + r.rating, 0) / aiReviews.length;
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
      <button 
        onClick={onBack}
        className="mb-12 flex items-center text-emerald-800 hover:text-emerald-600 font-black text-xs uppercase tracking-widest transition-all group"
      >
        <svg className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
        Quitter le feuillage
      </button>

      <div className="flex flex-col items-center text-center mb-20">
        <div className={`w-24 h-24 rounded-full ${category.color} flex items-center justify-center text-5xl shadow-xl mb-6 border-4 border-white`}>
          {category.icon}
        </div>
        <h2 className="text-5xl md:text-6xl font-serif text-emerald-950 mb-4">{category.name}</h2>
        <p className="text-lg text-emerald-800/60 max-w-xl italic font-medium leading-relaxed">
          "{category.description}"
        </p>
      </div>

      <div className="relative pl-6 md:pl-16 space-y-10 border-l-4 border-emerald-100 ml-2 md:ml-10">
        {category.tasks.map((task, idx) => {
          const avg = getAverageRating(task.recommendedIA);
          return (
            <div 
              key={task.id} 
              className="relative bg-white p-8 rounded-[2.5rem] shadow-xl border border-emerald-50 hover:border-emerald-200 hover:-translate-y-1 transition-all group"
            >
              {/* Le petit pétiole */}
              <div className="absolute -left-10 md:-left-20 top-12 w-10 md:w-16 h-1 bg-emerald-100 group-hover:bg-emerald-300 transition-colors"></div>
              <div className="absolute -left-[44px] md:-left-[88px] top-10 w-4 h-4 rounded-full border-4 border-white bg-emerald-400 shadow-md"></div>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                      Savoir #{task.id}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-emerald-900 leading-tight group-hover:text-emerald-600 transition-colors">{task.task}</h4>
                </div>
                
                <div className="md:w-5/12 flex flex-col justify-start bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-100/50">
                  <button 
                    onClick={() => onOpenReviews(task.recommendedIA)}
                    className="text-left group/btn"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${category.color} animate-pulse`}></div>
                      <span className="font-bold text-emerald-800 text-lg border-b-2 border-emerald-200 group-hover/btn:border-emerald-500 transition-all">{task.recommendedIA}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-500 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < (avg || 0) ? '★' : '☆'}</span>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-emerald-300">{avg ? avg.toFixed(1) : '—'}</span>
                    </div>
                  </button>
                  <p className="text-emerald-700/70 text-sm leading-relaxed mt-4 italic">
                    {task.why}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
