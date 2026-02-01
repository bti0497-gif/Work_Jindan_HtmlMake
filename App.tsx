
/**
 * FINALIZED UI STANDARD - DEOJON TECH STUDIO
 * PROTECTED: Real-time Chat, Midnight Reset & Sync Implementation
 */

import React, { useState, useEffect, useRef } from 'react';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import MainContent from './components/MainContent';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import ProcessManagement from './components/ProcessManagement';
import FileManagement from './components/FileManagement';
import TaskManager from './components/TaskManager';
import GeneralBoard from './components/GeneralBoard';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ProfileEdit from './components/ProfileEdit';
import ProjectDetail from './components/ProjectDetail';
import { INITIAL_PROJECTS, INITIAL_PROCESSES, INITIAL_TASKS, INITIAL_BOARD_POSTS } from './services/mockData';
import { useTaskViewModel } from './hooks/useTaskViewModel';
import { useProjectViewModel } from './hooks/useProjectViewModel';
import { useAuthViewModel } from './hooks/useAuthViewModel';
import { SyncService } from './services/syncService';
import { Project, Message } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<Project | null>(null);

  // 실시간 데이터 상태
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const lastDateRef = useRef(new Date().toDateString());

  const authVM = useAuthViewModel();
  const taskVM = useTaskViewModel(INITIAL_TASKS, authVM.currentUser || { id: '', name: '', avatar: '' });
  const projectVM = useProjectViewModel(INITIAL_PROJECTS, INITIAL_PROCESSES);
  const [boardPosts, setBoardPosts] = useState(INITIAL_BOARD_POSTS);

  // [REAL-TIME POLL] 채팅 및 자정 초기화 감지
  useEffect(() => {
    if (!authVM.currentUser) return;

    SyncService.sendHeartbeat(authVM.currentUser.id, authVM.currentUser.name);

    const interval = setInterval(() => {
      // 1. 자정 초기화 체크
      const today = new Date().toDateString();
      if (today !== lastDateRef.current) {
        setChatMessages([]); // 채팅 내역 초기화
        lastDateRef.current = today;
        console.log("[System] Midnight detected. Chat cleared.");
      }

      // 2. 하트비트 및 데이터 폴링
      SyncService.sendHeartbeat(authVM.currentUser!.id, authVM.currentUser!.name);
      pollUpdates();
    }, 10000); 

    return () => {
      clearInterval(interval);
      // 로그아웃 시나리오 등에서 마지막 하트비트 발송 (비주얼 처리)
    };
  }, [authVM.currentUser]);

  const pollUpdates = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    
    try {
      const newChatMsgs = await SyncService.fetchNewUpdates('CHAT');
      if (newChatMsgs.length > 0) {
        const formatted = newChatMsgs.map(m => m.payload as Message);
        setChatMessages(prev => [...prev, ...formatted]);
      }
    } catch (e) {
      console.error("Polling failed", e);
    }
    
    setTimeout(() => setIsSyncing(false), 500);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim() || !authVM.currentUser) return;
    
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: authVM.currentUser.name,
      avatar: authVM.currentUser.avatar,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    SyncService.broadcastChange('CHAT', 'CREATE', newMsg.id, newMsg, authVM.currentUser.id, authVM.currentUser.name);
  };

  const triggerCloudSync = async () => {
    setIsSyncing(true);
    await SyncService.fetchNewUpdates('PROJECT');
    setTimeout(() => setIsSyncing(false), 800);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedProjectForDetail(null);
    switch (tab) {
      case 'Projects': setCurrentView('projects'); break;
      case 'Files': setCurrentView('files'); break;
      case 'Schedule': setCurrentView('tasks'); break;
      case 'Board': setCurrentView('board'); break;
      default: setCurrentView('dashboard'); break;
    }
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedProjectForDetail(null);
    if (view === 'projects' || view === 'process') setActiveTab('Projects');
    else if (view === 'files') setActiveTab('Files');
    else if (view === 'tasks') setActiveTab('Schedule');
    else if (view === 'board') setActiveTab('Board');
    else setActiveTab('Dashboard');
  };

  if (!authVM.isInitialized) return <div className="bg-slate-900 h-full w-full" />;

  if (!authVM.currentUser) {
    if (authVM.authMode === 'signup') {
      return <SignUp onSignUp={authVM.actions.signup} onBack={() => authVM.actions.setMode('login')} />;
    }
    return <Login 
      onLogin={(id, rem) => authVM.actions.login({ id, rememberId: rem })} 
      onGoSignUp={() => authVM.actions.setMode('signup')}
      onGoForgot={() => authVM.actions.setMode('forgot')}
    />;
  }

  const { title, icon } = {
    dashboard: { title: 'Dash Board', icon: 'dashboard' },
    projects: { title: '프로젝트 관리', icon: 'assignment' },
    process: { title: '공정 관리', icon: 'account_tree' },
    files: { title: '파일 관리', icon: 'cloud_queue' },
    tasks: { title: '할일 관리', icon: 'checklist' },
    board: { title: '전체 게시판', icon: 'forum' },
  }[currentView as keyof typeof INITIAL_PROJECTS] || { title: '협업 스튜디오', icon: 'biotech' };

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-50 font-['Inter']">
      <SidebarLeft 
        currentView={currentView} 
        onViewChange={handleViewChange} 
        onEditProfile={() => setIsProfileEditing(true)}
        onLogout={authVM.actions.logout}
        user={authVM.currentUser}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-white border-x border-slate-200">
        <Header 
          title={title} 
          icon={icon}
          showSearch={currentView !== 'dashboard'} 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          isSyncingExternal={isSyncing}
          onManualSync={triggerCloudSync}
        />
        
        <div className="flex-1 overflow-hidden relative bg-slate-50/20">
          <div className="h-full overflow-y-auto main-content-area">
            {selectedProjectForDetail ? (
               <div className="p-8 max-w-5xl mx-auto">
                 <button onClick={() => setSelectedProjectForDetail(null)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm">
                   <span className="material-symbols-outlined">arrow_back</span>목록으로 돌아가기
                 </button>
                 <ProjectDetail project={selectedProjectForDetail} currentUser={authVM.currentUser} onBack={() => setSelectedProjectForDetail(null)} />
               </div>
            ) : currentView === 'dashboard' ? (
              <Dashboard recentProjects={projectVM.projects} />
            ) : currentView === 'projects' ? (
              <MainContent projects={projectVM.projects} onSelectProject={(p) => setSelectedProjectForDetail(p)} />
            ) : currentView === 'process' ? (
              <ProcessManagement 
                projects={projectVM.projects} 
                processes={projectVM.processes}
                currentUser={authVM.currentUser}
                onToggleProcess={(id) => projectVM.actions.toggleProcess(id)}
                onAddProcess={(p) => projectVM.actions.addProcess({ ...p, id: `pr-${Date.now()}`, isCompleted: false, authorId: authVM.currentUser!.id })}
                onUpdateProcess={(p) => projectVM.actions.updateProcess(p)}
              />
            ) : currentView === 'files' ? (
              <FileManagement />
            ) : currentView === 'tasks' ? (
              <TaskManager tasks={taskVM.tasks} currentUser={authVM.currentUser} onAddTask={taskVM.actions.addTask} onUpdateTask={taskVM.actions.updateTask} onDeleteTask={taskVM.actions.deleteTask} />
            ) : currentView === 'board' ? (
              <GeneralBoard 
                posts={boardPosts}
                currentUser={authVM.currentUser}
                onAddPost={(p) => setBoardPosts(prev => [p, ...prev])}
                onUpdatePost={(p) => setBoardPosts(prev => prev.map(item => item.id === p.id ? p : item))}
                onDeletePost={(id) => setBoardPosts(prev => prev.filter(item => item.id !== id))}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">
                <p>페이지 준비 중</p>
              </div>
            )}
          </div>

          {isProfileEditing && (
            <ProfileEdit 
              user={authVM.currentUser} 
              onClose={() => setIsProfileEditing(false)} 
              onSave={authVM.actions.updateProfile} 
            />
          )}
        </div>
      </div>

      <SidebarRight 
        messages={chatMessages} 
        teamTasks={taskVM.tasks.filter(t => !t.completed).slice(0, 5)}
        personalTasks={taskVM.tasks.filter(t => t.authorId === authVM.currentUser.id && !t.completed)}
        notifications={[]} 
        onViewTask={() => handleViewChange('tasks')}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default App;
