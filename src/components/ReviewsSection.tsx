import React, { useState } from 'react';
import { Star, ExternalLink, CheckCircle2, MessageSquarePlus, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { ReviewItem } from '../types';
import { SALON_INFO } from '../data/salonData';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  onAddReview?: (review: ReviewItem) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [activeReviewIndex, setActiveReviewIndex] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New review form
  const [authorName, setAuthorName] = useState<string>('');
  const [ratingVal, setRatingVal] = useState<number>(5);
  const [reviewBody, setReviewBody] = useState<string>('');
  const [serviceDone, setServiceDone] = useState<string>('');
  const [submittedMessage, setSubmittedMessage] = useState<boolean>(false);

  const handleNextReview = () => {
    setActiveReviewIndex((activeReviewIndex + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIndex((activeReviewIndex - 1 + reviews.length) % reviews.length);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewBody.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: authorName,
      rating: ratingVal,
      timeAgo: 'Just now',
      text: reviewBody,
      serviceMentioned: serviceDone || 'Salon Service',
      verified: true,
    };

    if (onAddReview) {
      onAddReview(newRev);
    }
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowAddModal(false);
      setAuthorName('');
      setReviewBody('');
      setServiceDone('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-24 bg-[#0c0f12] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#2A8C9E]" />
              <span className="text-xs font-semibold tracking-[0.25em] text-[#2A8C9E] uppercase font-sans-custom">
                GOOGLE REVIEWS
              </span>
            </div>
            <h2 className="font-serif-custom text-4xl sm:text-5xl font-light text-[#FAF8F5]">
              Trusted in Koregaon Park, <br className="hidden sm:block" />
              <span className="italic font-normal text-[#E6DFD3]">Loved Across Pune</span>
            </h2>
          </div>

          <div className="glass-panel p-4 rounded-sm border border-white/10 flex items-center gap-4">
            <div className="text-center border-r border-white/10 pr-4">
              <span className="font-serif-custom text-3xl font-bold text-[#FAF8F5]">4.4</span>
              <span className="text-xs text-[#E6DFD3]/60 block">Out of 5.0</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#2A8C9E] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-[#2A8C9E]" />
                ))}
              </div>
              <p className="text-xs text-[#E6DFD3] font-medium">1,100+ Google Reviews</p>
            </div>
          </div>
        </div>

        {/* Reviews Carousel Card */}
        <div className="relative glass-panel border border-white/10 rounded-sm p-8 sm:p-12 mb-10 shadow-2xl">
          <Quote className="w-12 h-12 text-[#2A8C9E]/20 absolute top-6 right-6 pointer-events-none" />

          {reviews[activeReviewIndex] && (
            <div className="max-w-3xl space-y-6">
              {/* Rating & Service */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[#2A8C9E]">
                  {[...Array(reviews[activeReviewIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#2A8C9E]" />
                  ))}
                </div>
                {reviews[activeReviewIndex].serviceMentioned && (
                  <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-white/5 border border-white/10 text-[#2A8C9E] rounded-xs">
                    {reviews[activeReviewIndex].serviceMentioned}
                  </span>
                )}
              </div>

              {/* Review Text */}
              <p className="font-serif-custom text-2xl sm:text-3xl text-[#FAF8F5] leading-relaxed font-light italic">
                "{reviews[activeReviewIndex].text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2A8C9E]/20 text-[#2A8C9E] border border-[#2A8C9E]/40 font-bold flex items-center justify-center font-serif-custom text-lg">
                    {reviews[activeReviewIndex].author[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-sm text-[#FAF8F5]">
                        {reviews[activeReviewIndex].author}
                      </p>
                      {reviews[activeReviewIndex].verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2A8C9E]" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#E6DFD3]/50 font-mono">
                      Google Review · {reviews[activeReviewIndex].timeAgo}
                    </p>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevReview}
                    className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/10"
                    aria-label="Previous Review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextReview}
                    className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/10"
                    aria-label="Next Review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <a
            href={SALON_INFO.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold tracking-wider text-[#2A8C9E] hover:text-[#FAF8F5] transition-colors flex items-center gap-1.5 group"
          >
            <span>READ ALL 1,100+ REVIEWS ON GOOGLE MAPS</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-[#FAF8F5] text-xs font-medium border border-white/15 rounded-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-[#2A8C9E]" />
            <span>WRITE A REVIEW</span>
          </button>
        </div>
      </div>

      {/* WRITE REVIEW MODAL */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-[#0c0f12] border border-white/15 rounded-sm p-6 max-w-md w-full shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif-custom text-2xl text-[#FAF8F5]">Write a Guest Review</h3>
            <p className="text-xs text-[#E6DFD3]/70">
              Share your experience at H2O Salon Koregaon Park.
            </p>

            {submittedMessage ? (
              <div className="p-4 bg-[#2A8C9E]/20 text-[#2A8C9E] border border-[#2A8C9E]/40 rounded-sm text-center text-xs space-y-1">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-1" />
                <p className="font-bold">Thank you for your review!</p>
                <p className="text-[11px] text-[#FAF8F5]">Your review has been saved.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pooja M."
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 text-[#FAF8F5] p-2.5 rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">RATING</label>
                  <select
                    value={ratingVal}
                    onChange={(e) => setRatingVal(Number(e.target.value))}
                    className="w-full bg-[#0c0f12] border border-white/15 text-[#FAF8F5] p-2.5 rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                  >
                    <option value={5}>5 Stars - Outstanding</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Average</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">SERVICE TAKEN</label>
                  <input
                    type="text"
                    placeholder="e.g. Balayage & Hair Spa"
                    value={serviceDone}
                    onChange={(e) => setServiceDone(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 text-[#FAF8F5] p-2.5 rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">YOUR FEEDBACK</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about the atmosphere, staff, and results..."
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 text-[#FAF8F5] p-2.5 rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-2 text-[#E6DFD3]/60 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2A8C9E] text-white font-bold rounded-sm shadow-md"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
