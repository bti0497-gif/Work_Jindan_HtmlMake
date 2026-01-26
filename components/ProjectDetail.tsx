
import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for editing fields
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    startDate: new Date().toISOString().split('T')[0], // Mock start date
    endDate: project.dueDate,
    regDate: new Date().toISOString().split('T')[0],
  });

  const handleDateClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!isEditing) return;
    try {
      (e.currentTarget as any).showPicker();
    } catch (err) {}
  };

  const handleSave = () => {
    // Save logic would go here
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Detail Header */}
      <div className={`px-8 py-6 text-white flex items-center justify-between transition-colors duration-500 ${isEditing ? 'bg-indigo-900' : 'bg-slate-900'}`}>
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            {isEditing ? '프로젝트 정보 수정' : '프로젝트 상세 정보'}
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            {isEditing ? '필요한 정보를 수정한 후 저장 버튼을 눌러주세요.' : '프로젝트의 상세 내용 및 진행 현황을 확인합니다.'}
          </p>
        </div>
        {/* Eye icon removed as per user request. Show edit icon only when editing. */}
        {isEditing && (
          <div className="size-12 bg-white/20 rounded-xl flex items-center justify-center scale-110 transition-all">
            <span className="material-symbols-outlined text-white text-3xl opacity-80">edit</span>
          </div>
        )}
      </div>

      <div className="p-8 space-y-8">
        {/* Row 1: Date and Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className={`material-symbols-outlined text-[16px] ${isEditing ? 'text-indigo-600' : 'text-blue-600'}`}>calendar_today</span>
              등록 일자
            </label>
            <input 
              type="date" 
              value={formData.regDate}
              readOnly={!isEditing}
              onChange={(e) => setFormData({...formData, regDate: e.target.value})}
              onClick={handleDateClick}
              className={`w-full border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium transition-all outline-none ${
                isEditing ? 'bg-white border focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 cursor-pointer' : 'bg-slate-50 border-none cursor-default'
              }`}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className={`material-symbols-outlined text-[16px] ${isEditing ? 'text-indigo-600' : 'text-blue-600'}`}>person</span>
              작성자
            </label>
            <div className={`flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-2.5 ${isEditing ? 'bg-slate-50/50' : 'bg-slate-50 border-none'}`}>
              <img src="https://picsum.photos/seed/master/40/40" className="size-8 rounded-full border border-white shadow-sm" alt="Author" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-800">김진단 팀장</span>
                <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${isEditing ? 'text-indigo-600 bg-indigo-50 border-indigo-100' : 'text-blue-600 bg-blue-50 border-blue-100'}`}>MASTER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Title */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <span className={`material-symbols-outlined text-[16px] ${isEditing ? 'text-indigo-600' : 'text-blue-600'}`}>label</span>
            프로젝트 명칭
          </label>
          <input 
            type="text" 
            value={formData.title}
            readOnly={!isEditing}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className={`w-full border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-bold transition-all outline-none ${
                isEditing ? 'bg-white border focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400' : 'bg-slate-50 border-none cursor-default'
            }`}
          />
        </div>

        {/* Project Period */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className={`material-symbols-outlined text-[16px] ${isEditing ? 'text-indigo-600' : 'text-blue-600'}`}>event_available</span>
              프로젝트 시작일
            </label>
            <input 
              type="date" 
              value={formData.startDate}
              readOnly={!isEditing}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              onClick={handleDateClick}
              className={`w-full border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium transition-all outline-none ${
                isEditing ? 'bg-white border focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 cursor-pointer' : 'bg-slate-50 border-none cursor-default'
              }`}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className={`material-symbols-outlined text-[16px] ${isEditing ? 'text-indigo-600' : 'text-blue-600'}`}>event_busy</span>
              프로젝트 종료일
            </label>
            <input 
              type="date" 
              value={formData.endDate}
              readOnly={!isEditing}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              onClick={handleDateClick}
              className={`w-full border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium transition-all outline-none ${
                isEditing ? 'bg-white border focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 cursor-pointer' : 'bg-slate-50 border-none cursor-default'
              }`}
            />
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <span className={`material-symbols-outlined text-[16px] ${isEditing ? 'text-indigo-600' : 'text-blue-600'}`}>description</span>
            상세 프로젝트 내용
          </label>
          <textarea 
            rows={6}
            value={formData.description}
            readOnly={!isEditing}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className={`w-full border-slate-200 rounded-xl px-4 py-3 text-slate-700 leading-relaxed transition-all outline-none resize-none ${
                isEditing ? 'bg-white border focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400' : 'bg-slate-50 border-none cursor-default'
            }`}
          />
        </div>

        {/* File Section */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <span className={`material-symbols-outlined text-[16px] ${isEditing ? 'text-indigo-600' : 'text-blue-600'}`}>attach_file</span>
            참조 파일
          </label>
          {isEditing ? (
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer group">
                <div className="size-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-indigo-500">cloud_upload</span>
                </div>
                <p className="text-sm font-bold text-slate-600">파일을 드래그하여 업로드하거나 클릭하세요</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tight">PDF, XLSX, DOCX, ZIP • Max 50MB</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
               {['현장사진_영흥도.pdf', '데이터_정리_2411.xlsx'].map(f => (
                 <div key={f} className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-white hover:text-blue-600 transition-all cursor-pointer group">
                    <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-blue-500 transition-colors">description</span>
                    {f}
                 </div>
               ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex items-center justify-end gap-3 border-t border-slate-100">
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">edit</span>
              정보 수정하기
            </button>
          ) : (
            <>
                <button 
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors"
                >
                수정 취소
                </button>
                <button 
                onClick={handleSave}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95 transition-all flex items-center gap-2"
                >
                <span className="material-symbols-outlined text-[20px]">save</span>
                변경사항 저장
                </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
