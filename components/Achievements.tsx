
import React from 'react';
import { Badge, Course, UserProfile } from '../types';
import { Mascot } from './Mascot';
import { Trophy, Star, Award } from 'lucide-react';

interface AchievementsProps {
  badges: Badge[];
  completedCourses: Course[]; // Historical completed courses
  currentCourse?: Course | null;
  userProfile: UserProfile | null;
  mascotLevel: 1 | 2 | 3;
  streak: number;
}

export const Achievements: React.FC<AchievementsProps> = ({ 
  badges, 
  completedCourses, 
  currentCourse,
  userProfile,
  mascotLevel,
  streak 
}) => {

  // Simulate a "completed course" if the current course is fully finished for display purposes
  const isCurrentCourseFinished = currentCourse && currentCourse.units.length > 0 && currentCourse.units.every(u => u.lessons.every(l => l.isCompleted));
  
  const hasAnyCertificates = completedCourses.length > 0 || isCurrentCourseFinished;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      
      {/* Main Wall */}
      <div className="flex-1 space-y-8">
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Hall of Fame</h1>
          <p className="text-slate-600">Track your milestones and certifications.</p>
        </div>

        {/* Badges Section */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
             <div className="bg-yellow-100 text-yellow-600 p-2 rounded-md">
               <Trophy size={24} />
             </div>
             <h2 className="text-xl font-bold text-slate-800">Earned Badges</h2>
           </div>

           {badges.length === 0 ? (
             <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200">
               <p className="text-slate-500 mb-2">No badges yet.</p>
               <p className="text-sm text-slate-400">Complete lessons to earn your first badge!</p>
             </div>
           ) : (
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
               {badges.map(badge => (
                 <div key={badge.id} className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-brand-light transition-colors">
                    <div className="text-5xl mb-3 drop-shadow-sm">{badge.icon}</div>
                    <h3 className="font-bold text-slate-800 text-sm mb-1">{badge.name}</h3>
                    <p className="text-xs text-slate-500 leading-tight">{badge.description}</p>
                 </div>
               ))}
             </div>
           )}
        </div>

        {/* Certificates / Course Completions */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
             <div className="bg-brand-light text-brand p-2 rounded-md">
               <Award size={24} />
             </div>
             <h2 className="text-xl font-bold text-slate-800">Completed Curriculums</h2>
           </div>

           <div className="space-y-4">
             {/* Render Historical/Mocked Completed Courses */}
             {completedCourses.map(course => (
               <div key={course.id} className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-xl overflow-hidden shadow-md">
                  <div className="relative z-10 flex items-center justify-between">
                     <div>
                       <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                         <Star size={14} fill="currentColor" /> Certificate of Completion
                       </div>
                       <h3 className="text-2xl font-bold mb-1">{course.topic}</h3>
                       <p className="text-slate-300 text-sm mb-4">Completed by {userProfile?.goal || 'Learner'}</p>
                       <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
                         {course.units.length} Units Mastery
                       </span>
                     </div>
                     <div className="shrink-0">
                        <Mascot mood="excited" petType={userProfile?.petPreference} level={mascotLevel} bonesCount={1} className="w-24 h-24" />
                     </div>
                  </div>
                  
                  {/* Decorative background elements */}
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-brand/20 rounded-full blur-3xl"></div>
               </div>
             ))}

             {/* Render Current Course if Finished */}
             {isCurrentCourseFinished && currentCourse && (
                <div className="relative bg-gradient-to-br from-brand-dark to-brand text-white p-6 rounded-xl overflow-hidden shadow-md">
                    <div className="relative z-10 flex items-center justify-between">
                       <div>
                         <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2 flex items-center gap-1">
                           <Star size={14} fill="currentColor" /> Just Completed!
                         </div>
                         <h3 className="text-2xl font-bold mb-1">{currentCourse.topic}</h3>
                         <p className="text-blue-100 text-sm mb-4">Great work, {userProfile?.goal || 'Learner'}!</p>
                         <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
                           Verified
                         </span>
                       </div>
                       <div className="shrink-0">
                          <Mascot mood="excited" petType={userProfile?.petPreference} level={mascotLevel} bonesCount={1} className="w-24 h-24" />
                       </div>
                    </div>
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                 </div>
             )}

             {/* Empty State */}
             {!hasAnyCertificates && (
               <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Award size={32} />
                  </div>
                  <h3 className="text-slate-600 font-semibold mb-1">No Certificates Yet</h3>
                  <p className="text-sm text-slate-400 max-w-xs mx-auto">Complete all units in a course to earn your certificate and see your companion celebrate!</p>
               </div>
             )}
           </div>
        </div>
      </div>

      {/* Side Stats */}
      <div className="w-full md:w-80 space-y-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm text-center">
           <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Current Streak</h3>
           
           <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              {/* Circular progress bg */}
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="60" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle cx="64" cy="64" r="60" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray="377" strokeDashoffset="280" strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold text-slate-900">{streak}</span>
                <span className="text-xs text-slate-500 font-semibold uppercase">Days</span>
              </div>
           </div>
           
           <p className="mt-4 text-sm text-slate-600">
             Great consistency! Keep learning daily to keep your companion happy.
           </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
           <div className="flex flex-col items-center">
             <Mascot mood="happy" petType={userProfile?.petPreference} level={mascotLevel} bonesCount={1} className="w-32 h-32 mb-4" />
             <h3 className="font-bold text-slate-800">Learning Companion</h3>
             <p className="text-slate-500 text-sm">Level {mascotLevel}</p>
           </div>
        </div>
      </div>

    </div>
  );
};
