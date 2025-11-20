
import React, { useState, useEffect, useMemo } from 'react';
import { Question, QuestionType } from '../types';
import { Button } from './Button';
import { Mascot } from './Mascot';
import { X, Check, Heart, BookOpen, ArrowRight, RefreshCcw, FileText, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonRunnerProps {
  title: string;
  theory: string;
  questions: Question[];
  onComplete: (xp: number) => void;
  onExit: () => void;
}

type Phase = 'theory' | 'quiz';

export const LessonRunner: React.FC<LessonRunnerProps> = ({ title, theory, questions, onComplete, onExit }) => {
  const [phase, setPhase] = useState<Phase>('theory');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [shakePair, setShakePair] = useState<string | null>(null);
  
  // Limit to 2 lives as requested
  const [hearts, setHearts] = useState(2);
  const [progress, setProgress] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'sad' | 'neutral' | 'excited' | 'worried'>('happy');

  const currentQuestion = questions[currentIndex];

  const matchingOptions = useMemo(() => {
    if (currentQuestion.type !== QuestionType.MATCHING) return null;
    
    const pairs = currentQuestion.options.map(opt => {
      const [left, right] = opt.split('::').map(s => s.trim());
      return { left, right, id: opt };
    });

    const leftSide = [...pairs].sort(() => Math.random() - 0.5);
    const rightSide = [...pairs].sort(() => Math.random() - 0.5);

    return { leftSide, rightSide, pairsMap: pairs };
  }, [currentQuestion]);

  useEffect(() => {
    if (phase === 'theory') {
      setProgress(0);
      setMascotMood('happy');
    } else {
      const pct = ((currentIndex) / questions.length) * 100;
      setProgress(pct);
    }
    
    setSelectedOption(null);
    setStatus('idle');
    setMatchedPairs(new Set());
    setSelectedLeft(null);
    setSelectedRight(null);
  }, [currentIndex, questions.length, phase]);

  useEffect(() => {
    if (phase === 'theory') return;
    if (status === 'correct') {
      setMascotMood('excited');
    } else if (status === 'incorrect') {
      // If incorrect, sad if on last life, otherwise worried
      setMascotMood(hearts <= 1 ? 'sad' : 'worried');
    } else {
      // Idle state mood logic for 2 max lives
      if (hearts === 2) setMascotMood('happy');
      else setMascotMood('worried');
    }
  }, [hearts, status, phase]);

  const playSound = (type: 'success' | 'error' | 'start') => {
    // Optional sound logic
  };

  const handleCheck = () => {
    if (!selectedOption && currentQuestion.type !== QuestionType.MATCHING) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      setStatus('correct');
      playSound('success');
    } else {
      setStatus('incorrect');
      setHearts(h => Math.max(0, h - 1));
      playSound('error');
    }
  };

  const handleMatchAttempt = (side: 'left' | 'right', value: string) => {
    if (status !== 'idle') return;

    if (side === 'left') {
      setSelectedLeft(value);
      if (selectedRight) checkMatch(value, selectedRight);
    } else {
      setSelectedRight(value);
      if (selectedLeft) checkMatch(selectedLeft, value);
    }
  };

  const checkMatch = (leftVal: string, rightVal: string) => {
    const pair = matchingOptions?.pairsMap.find(p => p.left === leftVal && p.right === rightVal);
    
    if (pair) {
      playSound('success');
      setMatchedPairs(prev => new Set(prev).add(pair.id));
      setSelectedLeft(null);
      setSelectedRight(null);
      if (matchedPairs.size + 1 === matchingOptions?.pairsMap.length) {
        setStatus('correct'); 
      }
    } else {
      playSound('error');
      setHearts(h => Math.max(0, h - 1));
      setShakePair(`${leftVal}-${rightVal}`);
      setTimeout(() => {
        setShakePair(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 500);
    }
  };

  const handleContinue = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onComplete(0); // Passing 0 since XP is discarded
    }
  };

  const renderQuestionContent = () => {
    switch (currentQuestion.type) {
      case QuestionType.MULTIPLE_CHOICE:
      case QuestionType.TRUE_FALSE:
        return (
          <div className="grid grid-cols-1 gap-3 mt-6">
            {currentQuestion.options.map((opt, idx) => (
              <div 
                key={idx}
                onClick={() => status === 'idle' && setSelectedOption(opt)}
                className={`
                  p-4 rounded-md border cursor-pointer transition-all text-base flex items-center
                  ${selectedOption === opt 
                    ? 'border-brand bg-brand-light text-brand-dark ring-1 ring-brand' 
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'}
                  ${status !== 'idle' && opt === currentQuestion.correctAnswer ? '!border-green-600 !bg-green-50 !text-green-800' : ''}
                  ${status === 'incorrect' && selectedOption === opt && opt !== currentQuestion.correctAnswer ? '!border-red-500 !bg-red-50 !text-red-800' : ''}
                `}
              >
                <div className={`
                  w-5 h-5 border rounded-full mr-4 flex items-center justify-center text-[10px] font-bold shrink-0
                  ${selectedOption === opt ? 'border-brand text-brand' : 'border-slate-300 text-slate-400'}
                  ${status !== 'idle' && opt === currentQuestion.correctAnswer ? '!border-green-600 !text-green-600' : ''}
                `}>
                  {String.fromCharCode(65 + idx)}
                </div>
                {opt}
              </div>
            ))}
          </div>
        );
      
      case QuestionType.FILL_IN_BLANK:
        return (
          <div className="mt-8">
            <div className="text-lg text-slate-800 mb-6 font-serif leading-relaxed bg-slate-50 p-6 rounded-lg border border-slate-200">
              {currentQuestion.prompt.replace('___', '_____')}
            </div>
            <div className="flex flex-wrap gap-2">
               {currentQuestion.options.map((opt, idx) => (
                 <button
                  key={idx}
                  onClick={() => status === 'idle' && setSelectedOption(opt)}
                  className={`
                    px-4 py-2 rounded-full border font-semibold transition-all text-sm
                    ${selectedOption === opt 
                      ? 'bg-brand text-white border-brand' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}
                  `}
                 >
                   {opt}
                 </button>
               ))}
            </div>
          </div>
        );

      case QuestionType.MATCHING:
        if (!matchingOptions) return null;
        return (
          <div className="mt-6 grid grid-cols-2 gap-4 md:gap-8">
             <div className="space-y-3">
               {matchingOptions.leftSide.map((pair, idx) => {
                 const isMatched = matchedPairs.has(pair.id);
                 const isSelected = selectedLeft === pair.left;
                 const isShaking = shakePair?.includes(pair.left);
                 
                 if (isMatched) return <div key={idx} className="h-14 bg-slate-50 rounded border border-slate-100 opacity-50" />;

                 return (
                   <button
                     key={idx}
                     onClick={() => handleMatchAttempt('left', pair.left)}
                     className={`
                       w-full p-3 rounded-md border font-medium text-sm text-left transition-all
                       ${isSelected ? 'bg-brand-light border-brand text-brand-dark' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}
                       ${isShaking ? 'animate-shake bg-red-50 border-red-400 text-red-700' : ''}
                     `}
                   >
                     {pair.left}
                   </button>
                 )
               })}
             </div>
             <div className="space-y-3">
               {matchingOptions.rightSide.map((pair, idx) => {
                 const isMatched = matchedPairs.has(pair.id);
                 const isSelected = selectedRight === pair.right;
                 const isShaking = shakePair?.includes(pair.right);

                 if (isMatched) return <div key={idx} className="h-14 bg-slate-50 rounded border border-slate-100 opacity-50" />;

                 return (
                   <button
                     key={idx}
                     onClick={() => handleMatchAttempt('right', pair.right)}
                     className={`
                       w-full p-3 rounded-md border font-medium text-sm text-left transition-all
                       ${isSelected ? 'bg-brand-light border-brand text-brand-dark' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}
                       ${isShaking ? 'animate-shake bg-red-50 border-red-400 text-red-700' : ''}
                     `}
                   >
                     {pair.right}
                   </button>
                 )
               })}
             </div>
          </div>
        );

      default:
        return <div>Unknown question type</div>;
    }
  };

  // Game Over Trigger - 0 Lives
  if (hearts === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <Heart className="text-red-500" size={32} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Assessment Failed</h2>
          <p className="text-slate-600 mb-6">You ran out of lives. Please review the material and try again.</p>
          <Button fullWidth variant="primary" onClick={onExit}>Return to Course</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#F5F7F8] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4 flex-1">
            <button onClick={onExit} className="text-slate-400 hover:text-slate-700">
                <X size={24} />
            </button>
            <span className="font-semibold text-slate-700">{title}</span>
        </div>
        
        <div className="flex-1 max-w-xl mx-8">
           <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
             <div 
                className="h-full bg-brand transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
             />
           </div>
        </div>

        <div className="flex items-center text-slate-600 font-semibold gap-1 flex-1 justify-end">
          <Heart className="text-red-500 fill-current" size={20} />
          <span>{hearts}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full px-6 py-12 pb-32">
          
          {/* Theory */}
          {phase === 'theory' && (
            <div className="animate-slide-up bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="bg-brand-light p-2 rounded text-brand">
                    <FileText size={24} />
                </div>
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Lecture Note</h2>
                    <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                </div>
              </div>
              
              <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed">
                {theory.split('\n').map((para, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Quiz */}
          {phase === 'quiz' && (
            <div className="animate-slide-up">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                  <div className="flex items-start gap-3 mb-6">
                      <HelpCircle className="text-brand shrink-0 mt-1" size={24} />
                      <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                        {currentQuestion.prompt}
                      </h2>
                  </div>
                  {renderQuestionContent()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-slate-200 p-4 md:px-8 md:py-4 fixed bottom-0 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
          
          {phase === 'quiz' && status === 'correct' && (
            <div className="flex items-center text-green-700 font-bold animate-slide-up">
              <div className="bg-green-100 p-1 rounded-full mr-2">
                <Check size={20} />
              </div>
              <span>Correct</span>
            </div>
          )}
          
          {phase === 'quiz' && status === 'incorrect' && currentQuestion.type !== QuestionType.MATCHING && (
            <div className="flex flex-col text-red-600 animate-slide-up text-sm">
              <span className="font-bold">Correct Answer: {currentQuestion.correctAnswer}</span>
            </div>
          )}

          {/* Button Actions */}
          <div className="ml-auto w-full md:w-auto flex gap-4">
              {phase === 'theory' && (
                <Button onClick={() => setPhase('quiz')} className="flex items-center gap-2">
                  Start Assessment <ArrowRight size={18} />
                </Button>
              )}
              
              {phase === 'quiz' && (
                <>
                  {status === 'idle' && currentQuestion.type !== QuestionType.MATCHING ? (
                    <Button disabled={!selectedOption} onClick={handleCheck}>Submit Answer</Button>
                  ) : status !== 'idle' ? (
                    <Button variant={status === 'correct' ? 'primary' : 'outline'} onClick={handleContinue}>
                       {currentIndex === questions.length - 1 ? "Exit Assessment" : "Next Question"}
                    </Button>
                  ) : null}
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
    