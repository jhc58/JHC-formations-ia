
import React from 'react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat)}
          className="group relative flex flex-col items-start p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-400 transition-all text-left overflow-hidden"
        >
          <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10 rounded-full ${cat.color} transition-transform group-hover:scale-125`}></div>
          <span className="text-4xl mb-4" role="img" aria-label={cat.name}>{cat.icon}</span>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{cat.name}</h3>
          <p className="text-slate-500 text-sm">{cat.description}</p>
          <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm">
            Voir les {cat.tasks.length} tâches
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
};
