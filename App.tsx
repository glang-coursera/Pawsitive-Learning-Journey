
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { LessonRunner } from './components/LessonRunner';
import { Mascot } from './components/Mascot';
import { OnboardingModal } from './components/OnboardingModal';
import { Achievements } from './components/Achievements';
import { generateLessonContent, generateCourseOutline } from './services/geminiService';
import { Course, UserProgress, Lesson, Badge, UserProfile } from './types';
import { Star, Zap, Crown, Lock, CheckCircle2, PlayCircle, Loader2, BookOpen, ArrowUpCircle, Utensils, Sparkles, Search, Bone } from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_BADGES: Badge[] = [
  { id: 'newbie', name: 'Fast Starter', icon: '🚀', description: 'Complete your first lesson', unlockedAt: 0 },
  { id: 'scholar', name: 'Scholar', icon: '🎓', description: 'Complete 3 lessons', unlockedAt: 0 },
  { id: 'master', name: 'Course Master', icon: '🏆', description: 'Finish an entire unit', unlockedAt: 0 }
];

// Mock Data for Completed Course
const COMPLETED_HISTORY: Course[] = [
  {
    id: 'cert-101',
    topic: 'Digital Marketing Fundamentals',
    units: [
      {
        id: 'u1', title: 'Market Research', description: 'Analyzing audience needs', color: 'bg-blue-500',
        lessons: [
           { id: 'l1', title: 'Intro', description: '', isCompleted: true, isLocked: false },
           { id: 'l2', title: 'Data', description: '', isCompleted: true, isLocked: false }
        ]
      },
      {
        id: 'u2', title: 'SEO Basics', description: 'Optimizing for search', color: 'bg-green-500',
        lessons: [
           { id: 'l3', title: 'Keywords', description: '', isCompleted: true, isLocked: false }
        ]
      },
      {
        id: 'u3', title: 'Social Media Strategy', description: 'Content planning', color: 'bg-purple-500',
        lessons: [
           { id: 'l4', title: 'Platforms', description: '', isCompleted: true, isLocked: false }
        ]
      }
    ]
  }
];

const MOCK_PROGRESS: UserProgress = {
  xp: 0,
  streak: 2, // Default to 2 days as requested
  hearts: 5,
  gems: 0,
  food: 0,
  foodEatenProgress: 0,
  mascotLevel: 1,
  completedLessonIds: [],
  currentCourseId: undefined,
  badges: []
};

function App() {
  // State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<UserProgress>(MOCK_PROGRESS);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [lessonContent, setLessonContent] = useState<{theory: string, questions: any[]} | null>(null);
  const [activeTab, setActiveTab] = useState<string>('learn');
  
  // UI State
  const [loadingLesson, setLoadingLesson] = useState(false);
  const [generatingCourse, setGeneratingCourse] = useState(false);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const [showLevelUpModal, setShowLevelUpModal] = useState<boolean>(false);
  
  // Mascot State - Start happy
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const [mascotMood, setMascotMood] = useState<'happy'|'sad'|'neutral'|'excited'|'worried'|'eating'>('happy');

  // Activity Tracker for Mascot (Only on Dashboard)
  useEffect(() => {
    if (activeLesson) return; // Don't track idle time while in lesson
    if (mascotMood === 'eating') return; 

    const handleActivity = () => setLastActiveTime(Date.now());
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    
    const interval = setInterval(() => {
      const idleTime = Date.now() - lastActiveTime;
      if (idleTime > 60000 && mascotMood !== 'sad') {
        setMascotMood('sad'); // Get bored/dehydrated if ignored
      } else if (idleTime < 60000 && mascotMood === 'sad') {
        setMascotMood('happy'); // Perk up when active
      }
    }, 5000);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      clearInterval(interval);
    }
  }, [lastActiveTime, mascotMood, activeLesson]);

  const calculateProgress = () => {
    if (!course) return 0;
    let total = 0;
    let completed = 0;
    course.units.forEach(u => {
      u.lessons.forEach(l => {
        total++;
        if (l.isCompleted || progress.completedLessonIds.includes(l.id)) completed++;
      });
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const courseProgress = calculateProgress();

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleFindCourse = async () => {
    if (!userProfile?.goal) return;

    setGeneratingCourse(true);
    
    try {
      // Dynamic Generation Logic
      const generatedCourse = await generateCourseOutline(userProfile);
      
      if (generatedCourse) {
        setCourse(generatedCourse);
        // Default 3 bones/food when course is created
        setProgress(p => ({ ...p, completedLessonIds: [], mascotLevel: 1, food: 3, foodEatenProgress: 0 })); 
        setMascotMood('excited');
        setTimeout(() => setMascotMood('happy'), 5000);
      } else {
        alert("We couldn't generate a course for that goal. Please try being more specific.");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong connecting to the AI tutor.");
    } finally {
      setGeneratingCourse(false);
    }
  };

  const handleStartLesson = async (lesson: Lesson) => {
    if (lesson.isLocked) return;
    setLoadingLesson(true);
    try {
      const content = await generateLessonContent(
        course?.topic || "General Knowledge", 
        lesson, // Pass the full lesson object to access static content
        userProfile || undefined
      );
      setLessonContent(content);
      setActiveLesson(lesson);
      setMascotMood('happy'); 
    } catch (e) {
      alert("Could not load lesson content.");
    } finally {
      setLoadingLesson(false);
    }
  };

  const handleFeedMascot = () => {
    if (progress.food <= 0) return;
    if (mascotMood === 'eating') return;

    const nextProgress = progress.foodEatenProgress + 1;
    const shouldLevelUp = nextProgress >= 5;

    if (shouldLevelUp) {
      const nextLevel = progress.mascotLevel < 3 ? progress.mascotLevel + 1 : 3;
      
      // Trigger Level Up
      if (nextLevel > progress.mascotLevel) {
        setShowLevelUpModal(true);
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#fbbf24', '#38bdf8', '#ffffff']
        });
      }

      setProgress(p => ({ 
        ...p, 
        food: p.food - 1,
        foodEatenProgress: 0, // Reset progress bar
        mascotLevel: nextLevel as 1 | 2 | 3
      }));
    } else {
      // Normal Feed
      setProgress(p => ({ 
        ...p, 
        food: p.food - 1,
        foodEatenProgress: nextProgress
      }));
    }

    setMascotMood('eating');
    setLastActiveTime(Date.now()); 

    setTimeout(() => {
      setMascotMood(shouldLevelUp ? 'excited' : 'happy');
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8, x: 0.2 },
        colors: ['#f472b6', '#fbbf24'] 
      });
    }, 2000);
  };

  const checkForBadges = (completedCount: number, unitCompleted: boolean) => {
    const currentBadgeIds = progress.badges.map(b => b.id);
    let awarded: Badge | null = null;

    if (completedCount >= 1 && !currentBadgeIds.includes('newbie')) {
      awarded = INITIAL_BADGES.find(b => b.id === 'newbie')!;
    } else if (completedCount >= 3 && !currentBadgeIds.includes('scholar')) {
      awarded = INITIAL_BADGES.find(b => b.id === 'scholar')!;
    } else if (unitCompleted && !currentBadgeIds.includes('master')) {
      awarded = INITIAL_BADGES.find(b => b.id === 'master')!;
    }

    if (awarded) {
      setNewBadge(awarded);
      setProgress(p => ({
        ...p,
        badges: [...p.badges, { ...awarded!, unlockedAt: Date.now() }]
      }));
      setTimeout(() => setNewBadge(null), 4000);
    }
  };

  const handleLessonComplete = (earnedXp: number) => {
    if (!activeLesson || !course) return;

    const newCompletedIds = [...progress.completedLessonIds, activeLesson.id];
    const completedCount = new Set(newCompletedIds).size;

    let unitJustFinished = false;

    // Determine the Next Lesson to unlock (Cross-Unit Logic)
    const allLessons = course.units.flatMap(u => u.lessons);
    const currentLessonIndex = allLessons.findIndex(l => l.id === activeLesson.id);
    const nextLesson = allLessons[currentLessonIndex + 1];

    const updatedUnits = course.units.map(unit => {
      // Check if this unit was fully completed *before* this lesson update to detect unit completion event
      const wasUnitComplete = unit.lessons.every(l => l.isCompleted || progress.completedLessonIds.includes(l.id));
      
      const unitLessons = unit.lessons.map(l => {
        // Mark current as complete
        if (l.id === activeLesson.id) {
          return { ...l, isCompleted: true };
        }
        // Unlock next lesson if it exists
        if (nextLesson && l.id === nextLesson.id) {
          return { ...l, isLocked: false };
        }
        return l;
      });

      // Check if unit is NOW complete
      const isUnitNowComplete = unitLessons.every(l => l.isCompleted);
      if (isUnitNowComplete && !wasUnitComplete) unitJustFinished = true;

      return { ...unit, lessons: unitLessons };
    });

    setCourse({ ...course, units: updatedUnits });

    setProgress(p => ({
      ...p,
      xp: p.xp + earnedXp,
      food: p.food + 2, // Award 2 bones per lesson completion
      completedLessonIds: newCompletedIds,
    }));

    checkForBadges(completedCount, unitJustFinished);
    setActiveLesson(null);
    setLessonContent(null);
    
    setMascotMood('excited');
    setTimeout(() => setMascotMood('happy'), 8000);
  };

  const resetCourse = () => {
    if (confirm("This will clear your current course view to start a new one. Your XP and badges will be saved. Continue?")) {
        setCourse(null);
    }
  };

  // --- RENDER ---

  // 1. Onboarding
  if (!userProfile) {
    return <OnboardingModal onComplete={handleOnboardingComplete} />;
  }

  // 2. Active Lesson
  if (activeLesson && lessonContent) {
    return (
      <>
        <LessonRunner 
          title={activeLesson.title}
          theory={lessonContent.theory}
          questions={lessonContent.questions}
          onComplete={handleLessonComplete}
          onExit={() => setActiveLesson(null)}
        />
      </>
    );
  }

  // 3. Main Dashboard
  return (
    <>
      {/* Loading Overlay */}
      {loadingLesson && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex flex-col items-center justify-center text-white backdrop-blur-sm">
          <Loader2 size={48} className="animate-spin mb-4 text-brand-light" />
          <p className="text-xl font-semibold">Preparing your learning environment...</p>
          <p className="text-sm opacity-80 mt-2">Generating interactive materials...</p>
        </div>
      )}

      {/* New Badge Modal */}
      {newBadge && (
        <div className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center">
          <div className="bg-white border border-slate-200 p-10 rounded-lg shadow-2xl animate-slide-up flex flex-col items-center text-center max-w-md">
             <div className="text-6xl mb-6">{newBadge.icon}</div>
             <h3 className="text-2xl font-bold text-brand mb-2">Badge Unlocked</h3>
             <p className="text-lg font-semibold text-slate-800">{newBadge.name}</p>
             <p className="text-slate-500 mt-1">{newBadge.description}</p>
          </div>
        </div>
      )}

      {/* Level Up Modal */}
      {showLevelUpModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl animate-slide-up flex flex-col items-center">
             <h3 className="text-2xl font-bold text-brand mb-6">Companion Evolution</h3>
             
             <div className="w-48 h-48 flex items-center justify-center mb-6 bg-slate-50 rounded-full">
                <Mascot 
                  mood="excited" 
                  petType={userProfile.petPreference} 
                  level={progress.mascotLevel} 
                  bonesCount={progress.food}
                  className="scale-125"
                />
             </div>

             <p className="text-center text-slate-600 text-lg mb-8">
               Congratulations! Your consistent care has helped your companion grow to <strong>Level {progress.mascotLevel}</strong>.
             </p>

             <Button fullWidth onClick={() => setShowLevelUpModal(false)}>
               Continue Learning
             </Button>
          </div>
        </div>
      )}

      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === 'leaderboard' ? (
          // ACHIEVEMENTS TAB
          <Achievements 
            badges={progress.badges}
            completedCourses={COMPLETED_HISTORY}
            currentCourse={course}
            userProfile={userProfile}
            mascotLevel={progress.mascotLevel}
            streak={progress.streak}
          />
        ) : (
          // LEARNING DASHBOARD TAB
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Main Syllabus Path */}
            <div className="flex-1">
              <div className="mb-8">
                 <h1 className="text-3xl font-bold text-slate-900 mb-2">
                   {course ? course.topic : "Welcome, Learner"}
                 </h1>
                 <p className="text-slate-600">
                   {course ? "Professional Certificate - 3 Units" : "Start your journey by creating a curriculum."}
                 </p>
              </div>

              {!course && (
                 <div className="bg-white border border-slate-200 rounded-lg p-10 shadow-sm">
                   <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="w-20 h-20 bg-brand-light text-brand rounded-full flex items-center justify-center shrink-0">
                         <Sparkles size={40} />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                          <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to Start?</h2>
                          <p className="text-slate-600 mb-6 leading-relaxed">
                              We have analyzed your profile. Click below to generate a comprehensive, professional curriculum tailored to your goal:
                              <br/>
                              <strong className="text-slate-800 block mt-2">"{userProfile?.goal}"</strong>
                          </p>
                          
                          <Button 
                              size="lg" 
                              onClick={handleFindCourse} 
                              disabled={generatingCourse}
                              className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2"
                          >
                              {generatingCourse ? <><Loader2 className="animate-spin" size={20}/> Designing Course...</> : <><Search size={20}/> Generate Curriculum</>}
                          </Button>
                      </div>
                   </div>
                 </div>
              )}

              {course?.units.map((unit, uIdx) => (
                <div key={unit.id} className="bg-white border border-slate-200 rounded-lg shadow-sm mb-6 overflow-hidden">
                  {/* Unit Header */}
                  <div className="p-6 border-b border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-3 mb-1">
                       <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Unit {uIdx + 1}</span>
                       {unit.lessons.every(l => l.isCompleted || progress.completedLessonIds.includes(l.id)) && (
                          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">COMPLETED</span>
                       )}
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{unit.title}</h2>
                    <p className="text-slate-500 text-sm mt-1">{unit.description}</p>
                  </div>

                  {/* Lesson List */}
                  <div className="divide-y divide-slate-100">
                    {unit.lessons.map((lesson, lIdx) => {
                      const isCompleted = lesson.isCompleted || progress.completedLessonIds.includes(lesson.id);
                      const isLocked = lesson.isLocked;

                      return (
                        <div 
                          key={lesson.id}
                          className={`p-5 flex items-center justify-between transition-colors ${!isLocked ? 'hover:bg-slate-50' : 'opacity-60'}`}
                        >
                          <div className="flex items-start gap-4">
                             <div className={`
                               mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0
                               ${isCompleted ? 'bg-green-600 text-white' : isLocked ? 'bg-slate-200 text-slate-400' : 'bg-brand text-white'}
                             `}>
                                {isCompleted ? <CheckCircle2 size={16} /> : isLocked ? <Lock size={14} /> : <PlayCircle size={16} />}
                             </div>
                             <div>
                                <h3 className={`font-semibold ${isCompleted ? 'text-slate-900' : isLocked ? 'text-slate-400' : 'text-brand'}`}>
                                  {lesson.title}
                                </h3>
                                <p className="text-sm text-slate-500 line-clamp-1">{lesson.description}</p>
                             </div>
                          </div>

                          <div>
                            {!isLocked ? (
                               <Button 
                                 size="sm" 
                                 variant={isCompleted ? 'secondary' : 'primary'} 
                                 onClick={() => handleStartLesson(lesson)}
                               >
                                 {isCompleted ? 'Review' : 'Start'}
                               </Button>
                            ) : (
                               <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3">Locked</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Sidebar Widget Area */}
            <div className="hidden lg:block w-80 space-y-6 h-fit sticky top-6">
              
              {/* Goal Context */}
              {userProfile && (
                 <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Current Goal</h3>
                   <div className="flex gap-3 items-start">
                      <div className="p-2 bg-brand-light rounded text-brand">
                         <Crown size={20} />
                      </div>
                      <div>
                         <p className="text-sm font-semibold text-slate-800 line-clamp-3">{userProfile.goal}</p>
                      </div>
                   </div>
                 </div>
              )}

              {/* Progress Widget */}
               <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">Overall Progress</h3>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                   <div className="h-full bg-green-600 transition-all duration-1000" style={{ width: `${courseProgress}%`}}></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{progress.completedLessonIds.length} Lessons Completed</span>
                  <span>{courseProgress}%</span>
                </div>
              </div>

              {/* Learning Companion Widget */}
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-slate-800">Companion</h3>
                   <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-semibold">Lvl {progress.mascotLevel}</span>
                </div>
                
                <div className="flex items-center justify-center mb-4 bg-slate-50 rounded-lg p-4">
                   <Mascot 
                     mood={mascotMood} 
                     petType={userProfile?.petPreference} 
                     level={progress.mascotLevel} 
                     bonesCount={progress.food}
                     className="w-24 h-24" 
                   />
                </div>

                {/* Level Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Level Progress</span>
                    <span>{progress.foodEatenProgress} / 5 bones</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand transition-all duration-500" 
                      style={{ width: `${(progress.foodEatenProgress / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                     {userProfile?.petPreference === 'dog' ? (
                       <Bone size={20} className="text-slate-600" fill="#cbd5e1" />
                     ) : (
                       <span className="text-lg">🐟</span>
                     )}
                     <span className="font-bold text-slate-800">{progress.food}</span>
                  </div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Supplies</span>
                </div>
                
                <Button 
                  fullWidth 
                  variant={progress.food > 0 ? 'primary' : 'outline'}
                  size="sm"
                  onClick={handleFeedMascot}
                  disabled={progress.food <= 0 || mascotMood === 'eating'}
                  className="flex items-center justify-center gap-2"
                >
                  <Utensils size={16} /> 
                  {progress.food > 0 ? "Feed" : "Earn Bones in Lessons"}
                </Button>
              </div>

              {/* Stats & Badges (XP Removed) */}
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-4 mb-6">
                   <div className="text-center p-3 bg-slate-50 rounded-md">
                      <div className="w-5 h-5 text-red-500 mx-auto mb-1 font-bold">🔥</div>
                      <div className="font-bold text-lg text-slate-800">{progress.streak}</div>
                      <div className="text-xs text-slate-500 uppercase">Day Streak</div>
                   </div>
                </div>

                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Recent Badges</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {INITIAL_BADGES.map(badge => {
                    const isUnlocked = progress.badges.some(b => b.id === badge.id);
                    return (
                      <div key={badge.id} className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-xl border ${isUnlocked ? 'bg-yellow-50 border-yellow-200 grayscale-0' : 'bg-slate-50 border-slate-100 grayscale opacity-40'}`} title={badge.name}>
                        {badge.icon}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Reset Widget */}
              {course && (
                  <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                      <h3 className="font-bold text-slate-700 mb-2">Change Goals?</h3>
                      <p className="text-slate-500 text-sm mb-4">Find a new curriculum.</p>
                      <Button variant="outline" fullWidth onClick={resetCourse}>
                          Restart Course
                      </Button>
                  </div>
              )}
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}

export default App;
