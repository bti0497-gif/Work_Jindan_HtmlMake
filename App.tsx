
import React, { useState } from 'react';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import MainContent from './components/MainContent';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { Project, Message, Task, Notification } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('Projects');

  // Mock Data
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: '영흥도 수질 진단 컨설팅',
      description: '대부도 일대 수질 환경 기초 데이터 수집 및 정밀 진단 분석.',
      progress: 75,
      status: 'In Progress',
      dueDate: '11월 15일',
      members: [
        'https://picsum.photos/seed/user1/100/100',
        'https://picsum.photos/seed/user2/100/100',
        'https://picsum.photos/seed/user3/100/100'
      ]
    },
    {
      id: '2',
      title: '공장 폐수 정화 모니터링',
      description: '스마트 센싱 기술을 이용한 폐수 농도 실시간 측정 시스템 구축.',
      progress: 42,
      status: 'Delayed',
      dueDate: '10월 30일',
      members: [
        'https://picsum.photos/seed/user4/100/100',
        'https://picsum.photos/seed/user5/100/100'
      ]
    },
    {
      id: '3',
      title: '지하수 오염 확산 방지 프로젝트',
      description: '산업 단지 인근 지하수 오염 추적 및 차단 벽 설계 가이드라인.',
      progress: 90,
      status: 'In Progress',
      dueDate: '12월 20일',
      members: [
        'https://picsum.photos/seed/user6/100/100',
        'https://picsum.photos/seed/user7/100/100',
        'https://picsum.photos/seed/user8/100/100',
        'https://picsum.photos/seed/user9/100/100'
      ]
    }
  ]);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: '이영희 과장',
      avatar: 'https://picsum.photos/seed/user2/100/100',
      text: '수질 진단 보고서 데이터 업데이트 하셨나요?',
      time: '10:24'
    },
    {
      id: '2',
      sender: '박철수 대리',
      avatar: 'https://picsum.photos/seed/user3/100/100',
      text: '네, 현재 영흥도 샘플 데이터 분석 완료했습니다.',
      time: '10:45'
    },
    {
      id: '3',
      sender: '최지민 주임',
      avatar: 'https://picsum.photos/seed/user5/100/100',
      text: '현장 실사 사진 클라우드에 올렸습니다.',
      time: '11:12'
    }
  ]);

  const [teamTasks] = useState<Task[]>([
    { id: 't1', text: '전체 공정 로드맵 확정', dueDate: '11/10', completed: false },
    { id: 't2', text: '대부도 현장 안전 점검', dueDate: '11/12', completed: true },
    { id: 't3', text: '기술 진단 표준 매뉴얼 배포', dueDate: '11/15', completed: false }
  ]);

  const [personalTasks] = useState<Task[]>([
    { id: 'p1', text: '현장 진단 로그 분석', dueDate: 'Today', completed: false },
    { id: 'p2', text: 'API 문서 최종 검토', dueDate: 'Tomorrow', completed: true },
    { id: 'p3', text: '주간 회의 자료 준비', dueDate: 'Friday', completed: false }
  ]);

  const [notifications] = useState<Notification[]>([
    { id: '1', text: '새로운 업무가 할당되었습니다.', time: '5m ago', type: 'info' },
    { id: '2', text: '프로젝트 마감이 3일 남았습니다.', time: '1h ago', type: 'alert' }
  ]);

  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dash Board';
      case 'projects': return '프로젝트 관리';
      case 'process': return '공정 관리';
      case 'files': return '파일 관리';
      case 'tasks': return '할일 관리';
      case 'board': return '전체 게시판';
      default: return '협업 스튜디오';
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 fixed inset-0">
      <SidebarLeft currentView={currentView} onViewChange={setCurrentView} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-[500px] bg-white">
        <Header 
          title={getViewTitle()} 
          showSearch={currentView !== 'dashboard'} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        {currentView === 'dashboard' ? (
          <Dashboard recentProjects={projects} />
        ) : currentView === 'projects' ? (
          <MainContent projects={projects} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-slate-50/30 text-slate-400">
            <div className="text-center">
              <span className="material-symbols-outlined text-6xl mb-4">construction</span>
              <p className="font-bold text-lg">{getViewTitle()} 페이지 준비 중</p>
            </div>
          </div>
        )}
      </div>

      <SidebarRight 
        messages={messages} 
        teamTasks={teamTasks}
        personalTasks={personalTasks}
        notifications={notifications} 
      />
    </div>
  );
};

export default App;
