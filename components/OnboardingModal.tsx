import React, { useState } from 'react';
import { Button } from './Button';
import { UserProfile } from '../types';
import { Target, Briefcase, ArrowRight } from 'lucide-react';

interface OnboardingModalProps {
  onComplete: (profile: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [background, setBackground] = useState('');
  const [pet, setPet] = useState<'dog' | 'cat'>('dog');

  const handleNext = () => {
    if (step === 1 && goal && background) {
      setStep(2);
    } else if (step === 2) {
      onComplete({
        goal,
        background,
        petPreference: pet
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full shadow-2xl animate-slide-up relative overflow-hidden">
        
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
           <span className="text-brand font-bold text-lg">coursera</span>
           <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Step {step} of 2</span>
        </div>

        <div className="p-8">
            <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
                {step === 1 ? "Build Your Profile" : "Select Learning Companion"}
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
                {step === 1 ? "We use this information to tailor the course curriculum to your professional needs." : "Choose a companion to track your progress and keep you motivated."}
            </p>
            </div>

            {step === 1 ? (
            <div className="space-y-6">
                <div>
                <label className="block text-slate-700 font-semibold mb-2 text-sm">
                    Primary Career Goal
                </label>
                <div className="relative">
                    <div className="absolute top-3 left-3 text-slate-400">
                        <Target size={18} />
                    </div>
                    <textarea 
                        className="w-full bg-white border border-slate-300 rounded-md pl-10 p-3 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-all h-20 text-sm resize-none"
                        placeholder="e.g. Become a Data Scientist, Learn Digital Marketing..."
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                    />
                </div>
                </div>
                
                <div>
                <label className="block text-slate-700 font-semibold mb-2 text-sm">
                    Professional Background
                </label>
                <div className="relative">
                    <div className="absolute top-3 left-3 text-slate-400">
                        <Briefcase size={18} />
                    </div>
                    <textarea 
                        className="w-full bg-white border border-slate-300 rounded-md pl-10 p-3 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-all h-20 text-sm resize-none"
                        placeholder="e.g. I am a graphic designer looking to learn coding..."
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                    />
                </div>
                </div>
            </div>
            ) : (
            <div className="grid grid-cols-2 gap-4 mb-4">
                <button 
                onClick={() => setPet('dog')}
                className={`p-6 rounded-lg border flex flex-col items-center gap-3 transition-all ${pet === 'dog' ? 'border-brand bg-brand-light ring-1 ring-brand' : 'border-slate-200 hover:bg-slate-50'}`}
                >
                <div className="text-4xl">🐶</div>
                <span className={`font-semibold text-sm ${pet === 'dog' ? 'text-brand-dark' : 'text-slate-600'}`}>Dog</span>
                </button>

                <button 
                onClick={() => setPet('cat')}
                className={`p-6 rounded-lg border flex flex-col items-center gap-3 transition-all ${pet === 'cat' ? 'border-brand bg-brand-light ring-1 ring-brand' : 'border-slate-200 hover:bg-slate-50'}`}
                >
                <div className="text-4xl">🐱</div>
                <span className={`font-semibold text-sm ${pet === 'cat' ? 'text-brand-dark' : 'text-slate-600'}`}>Cat</span>
                </button>
            </div>
            )}
        </div>

        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <Button 
            onClick={handleNext}
            disabled={step === 1 && (!goal || !background)}
            className="flex items-center gap-2"
          >
            {step === 1 ? "Continue" : "Start Learning"} <ArrowRight size={16} />
          </Button>
        </div>

      </div>
    </div>
  );
};