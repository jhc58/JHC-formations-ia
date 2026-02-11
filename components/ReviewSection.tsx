
import React, { useState, useMemo } from 'react';
import { Review } from '../types';

interface ReviewSectionProps {
  aiName: string;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
  onClose: () => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ aiName, reviews, onAddReview, onClose }) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const aiReviews = useMemo(() => reviews.filter(r => r.aiName === aiName), [reviews, aiName]);
  
  const averageRating = useMemo(() => {
    if (aiReviews.length === 0) return 0;
    return aiReviews.reduce((acc, r) => acc + r.rating, 0) / aiReviews.length;
  }, [aiReviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !comment) return;
    onAddReview({ aiName, userName, rating, comment });
    setUserName('');
    setComment('');
    setRating(5);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Avis sur {aiName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < Math.round(averageRating) ? '★' : '☆'}</span>
                ))}
              </div>
              <span className="text-sm font-bold text-slate-500">
                {averageRating > 0 ? `${averageRating.toFixed(1)}/5 (${aiReviews.length} avis)` : 'Aucun avis'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Form */}
          <section>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Laisser un avis</h4>
            <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                <select 
                  value={rating} 
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="5">5 Étoiles</option>
                  <option value="4">4 Étoiles</option>
                  <option value="3">3 Étoiles</option>
                  <option value="2">2 Étoiles</option>
                  <option value="1">1 Étoile</option>
                </select>
              </div>
              <textarea
                placeholder="Votre retour d'expérience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                required
              />
              <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                Publier l'avis
              </button>
            </form>
          </section>

          {/* List */}
          <section>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Avis récents</h4>
            {aiReviews.length === 0 ? (
              <p className="text-slate-400 italic">Soyez le premier à donner votre avis sur {aiName} !</p>
            ) : (
              <div className="space-y-4">
                {aiReviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-slate-800">{review.userName}</span>
                        <div className="flex text-amber-400 text-xs">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">{new Date(review.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
