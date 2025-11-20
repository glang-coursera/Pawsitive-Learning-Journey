import React from 'react';
import { Home, Trophy, User, BookOpen, MoreHorizontal } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-md w-full transition-all ${
      active 
        ? 'bg-brand-light text-brand border-l-4 border-brand' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <Icon size={20} strokeWidth={2} />
    <span className="font-semibold text-sm">{label}</span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, activeTab = 'learn', onTabChange }) => {
  return (
    <div className="flex min-h-screen bg-[#F5F7F8] max-w-[1600px] mx-auto">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white fixed h-full left-0 top-0 z-10 shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-brand font-bold text-2xl tracking-tight">coursera</h1>
        </div>
        
        <nav className="space-y-1 p-4 flex-1">
          <SidebarItem 
            icon={Home} 
            label="Dashboard" 
            active={activeTab === 'learn'} 
            onClick={() => onTabChange?.('learn')}
          />
          <SidebarItem 
            icon={Trophy} 
            label="Achievements" 
            active={activeTab === 'leaderboard'} 
            onClick={() => onTabChange?.('leaderboard')}
          />
          <SidebarItem 
            icon={User} 
            label="Profile" 
            active={activeTab === 'profile'} 
            onClick={() => onTabChange?.('profile')}
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
           <button className="flex items-center gap-3 text-slate-500 hover:text-slate-800 p-2 text-sm">
             <MoreHorizontal size={20} />
             <span>More</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 pb-24 md:pb-10">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 flex justify-around z-50 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)]">
        <button onClick={() => onTabChange?.('learn')} className={`p-2 rounded-lg ${activeTab === 'learn' ? 'text-brand' : 'text-slate-400'}`}>
          <Home size={24} />
        </button>
        <button onClick={() => onTabChange?.('leaderboard')} className={`p-2 rounded-lg ${activeTab === 'leaderboard' ? 'text-brand' : 'text-slate-400'}`}>
          <Trophy size={24} />
        </button>
        <button onClick={() => onTabChange?.('profile')} className={`p-2 rounded-lg ${activeTab === 'profile' ? 'text-brand' : 'text-slate-400'}`}>
          <User size={24} />
        </button>
      </div>
    </div>
  );
};