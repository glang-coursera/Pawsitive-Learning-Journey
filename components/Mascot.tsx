
import React from 'react';

// Using string paths instead of imports to avoid "Failed to resolve module specifier" errors
// in environments that do not support image imports natively.
const IMG_INITIAL = 'https://2025-spark-public.s3.us-east-1.amazonaws.com/withFood.png';
const IMG_NO_FOOD = 'https://2025-spark-public.s3.us-east-1.amazonaws.com/nofood.png';
const IMG_EAT_FOOD = 'https://2025-spark-public.s3.us-east-1.amazonaws.com/eating.png';

interface MascotProps {
  mood: 'happy' | 'sad' | 'neutral' | 'excited' | 'worried' | 'eating';
  petType?: 'dog' | 'cat';
  level?: 1 | 2 | 3; // 1=Baby, 2=Teen, 3=Adult
  bonesCount?: number;
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mood, petType = 'dog', level = 1, bonesCount = 0, className = '' }) => {
  
  // --- LOGIC ---
  // Default to initial
  let imageSrc = IMG_INITIAL;
  let bubbleText = "Ready to learn! 🦴";

  // 1. Eating State (Highest Priority)
  if (mood === 'eating') {
    imageSrc = IMG_EAT_FOOD;
    bubbleText = "Yum! Tastes great! 🍖";
  } 
  // 2. Sad / No Food State
  else if (mood === 'sad' || bonesCount === 0) {
    imageSrc = IMG_NO_FOOD;
    bubbleText = "I'm hungry... earn me some bones? 🥺";
  } 
  // 3. Happy / Excited / Default
  else {
    imageSrc = IMG_INITIAL;
    
    if (mood === 'excited') {
      bubbleText = "Amazing work! Let's keep going! 🎉";
    } else if (mood === 'worried') {
        bubbleText = "Don't give up! You can do this. ❤️";
    } else {
      bubbleText = "Start learning, earn me bones. 🦴";
    }
  }

  // Scale based on Level
  let scale = 1;
  if (level === 2) scale = 1.1;
  if (level === 3) scale = 1.2;

  return (
    <div 
      className={`relative w-48 h-48 transition-transform duration-500 ${className}`} 
      style={{ transform: `scale(${scale})` }}
    >
      {/* Speech Bubble */}
      <div className={`
        absolute -top-16 -left-12 w-64 bg-white border-2 border-slate-200 p-3 rounded-2xl rounded-br-none shadow-xl text-sm font-bold text-slate-700 z-20 text-center
        transition-all duration-500 transform origin-bottom-right
        scale-100 opacity-100 translate-y-0
      `}>
        {bubbleText}
      </div>

      {/* Image Render */}
      <img 
        src={imageSrc} 
        alt={`Mascot state: ${mood}`}
        className="w-full h-full object-contain drop-shadow-xl"
        onError={(e) => {
          console.warn(`Could not load image from path: ${imageSrc}. Ensure the file exists in the 'components' folder relative to index.html.`);
          // Fallback visual if image fails to load
          e.currentTarget.style.display = 'none';
          const parent = e.currentTarget.parentElement;
          if (parent && !parent.querySelector('.fallback-icon')) {
             const fallback = document.createElement('div');
             fallback.className = 'fallback-icon w-full h-full flex items-center justify-center text-6xl';
             fallback.innerHTML = '🐶';
             parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
};
