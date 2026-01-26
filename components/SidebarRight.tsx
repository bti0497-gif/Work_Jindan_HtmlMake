/**
 * WARNING: DO NOT MODIFY UI/UX WITHOUT EXPLICIT PERMISSION.
 * This UI/UX design and interaction pattern are finalized for the Deojon Environment Technology 
 * Technical Diagnosis Team Collaboration Studio. Any unauthorized changes to layouts, 
 * widget placements, or styling are strictly prohibited.
 */

import React from 'react';
import { Message, Task, Notification } from '../types';

interface SidebarRightProps {
  messages: Message[];
  teamTasks: Task[];
  personalTasks: Task[];
  notifications: Notification[];
}

/**
 * Individual Chat Message Component
 */
const ChatMessage: React.FC<{ msg: Message }> = ({ msg }) => (
  <div className="flex gap-3 group/msg">
    <img src={msg.avatar} alt={msg.sender} className="size-8 rounded-full shrink-0 object-cover border border-slate-200 shadow-sm" />
    <div className="space-y-1 flex-1 min-w-0">
      <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200/60 text-[12px] text-slate-600 shadow-sm leading-relaxed break-words hover:border-blue-200 transition-colors">
        {msg.text}
      </div>
      <p className="text-[10px] font-medium text-slate-400 pl-1">{msg.sender} • {msg.time}</p>
    </div>
  </div>
);

/**
 * Individual Task Item Component
 */
const TaskItem: React.FC<{ task: Task; variant: 'team' | 'personal' }> = ({ task, variant }) => (
  <label className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-slate-200/60 cursor-pointer hover:border-blue-200 shadow-sm transition-all group/task">
    <input 
      type="checkbox" 
      defaultChecked={task.completed}
      className={`rounded border-slate-300 focus:ring-opacity-50 size-4 transition-colors ${
        variant === 'team' ? 'text-indigo-600 focus:ring-indigo-500' : 'text-blue-600 focus:ring-blue-500'
      }`} 
    />
    <div className="flex-1 min-w-0">
      <p className={`text-[12px] font-medium truncate transition-all ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
        {task.text}
      </p>
      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{task.dueDate}</p>
    </div>
  </label>
);

/**
 * Reusable Section for Task Lists
 */
const TaskSection: React.FC<{ title: string; tasks: Task[]; variant: 'team' | 'personal'; badge?: string }> = ({ title, tasks, variant, badge }) => (
  <section className="flex-1 flex flex-col overflow-hidden p-5">
    <div className="flex items-center justify-between mb-3 shrink-0">
      <h2 className="font-bold text-[13px] text-slate-800 flex items-center gap-2">
        <span className={`material-symbols-outlined text-[18px] ${variant === 'team' ? 'text-indigo-600' : 'text-blue-600'}`}>
          {variant === 'team' ? 'group_work' : 'person'}
        </span>
        {title}
      </h2>
      {badge ? (
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
          variant === 'team' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'
        }`}>
          {badge}
        </span>
      ) : (
        <span className="text-[11px] font-bold text-blue-600 cursor-pointer hover:underline">View All</span>
      )}
    </div>
    <div className="overflow-y-auto sidebar-dark-scrollbar pr-1 space-y-2 pb-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} variant={variant} />
      ))}
    </div>
  </section>
);

/**
 * Chat Section Component
 */
const ChatSection: React.FC<{ messages: Message[] }> = ({ messages }) => (
  <section className="flex-1 flex flex-col overflow-hidden bg-white">
    <div className="p-5 flex items-center justify-between shrink-0 border-b border-slate-50">
      <h2 className="font-bold text-[13px] text-slate-800 flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px] text-blue-600">forum</span>
        팀 채팅
      </h2>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Active</span>
        <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>
    
    <div className="flex-1 overflow-y-auto px-5 space-y-5 py-4 sidebar-dark-scrollbar hover:scrollbar-visible bg-slate-50/20">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} msg={msg} />
      ))}
    </div>

    <div className="p-4 shrink-0 bg-white border-t border-slate-100">
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white transition-all">
        <input 
          className="flex-1 border-none focus:ring-0 text-sm p-0 bg-transparent placeholder-slate-400" 
          placeholder="메시지를 입력하세요..." 
          type="text" 
        />
        <button className="text-blue-600 hover:text-blue-700 transition-transform active:scale-95 flex items-center">
          <span className="material-symbols-outlined text-[22px]">send</span>
        </button>
      </div>
    </div>
  </section>
);

const SidebarRight: React.FC<SidebarRightProps> = ({ messages, teamTasks, personalTasks, notifications }) => {
  return (
    <aside className="w-[20%] min-w-[300px] max-w-[360px] bg-slate-50 flex flex-col shrink-0 border-l border-slate-200 hidden lg:flex h-full overflow-hidden">
      
      {/* 0. Right Sidebar Header Section (To align with other panels) */}
      <div className="pt-6 px-5 border-b border-slate-200 shrink-0 h-[88px] flex items-center justify-between bg-white">
        <h2 className="text-slate-900 font-bold text-[14px] flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-600">widgets</span>
          협업 위젯
        </h2>
        <div className="flex gap-2">
          <span className="material-symbols-outlined text-[18px] text-slate-400 cursor-pointer hover:text-blue-600">notifications</span>
          <span className="material-symbols-outlined text-[18px] text-slate-400 cursor-pointer hover:text-blue-600">more_vert</span>
        </div>
      </div>

      {/* Upper Half: Task Management */}
      <div className="flex-1 flex flex-col overflow-hidden border-b border-slate-200 bg-slate-50/50">
        <TaskSection title="전체 할일 목록" tasks={teamTasks} variant="team" badge="TEAM" />
        <div className="h-px bg-slate-100 mx-5 shrink-0" />
        <TaskSection title="나의 할일 목록" tasks={personalTasks} variant="personal" />
      </div>

      {/* Lower Half: Team Chat */}
      <ChatSection messages={messages} />

      {/* Footer: Notifications Badge */}
      <footer className="px-5 py-2 bg-slate-100 border-t border-slate-200 shrink-0 flex items-center justify-between">
         <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Status</span>
         <div className="flex items-center gap-1.5 cursor-pointer group">
           <div className="size-2 bg-red-500 rounded-full group-hover:scale-125 transition-transform"></div>
           <span className="text-[10px] text-red-500 font-bold">Live Updates</span>
         </div>
      </footer>
    </aside>
  );
};

export default SidebarRight;
