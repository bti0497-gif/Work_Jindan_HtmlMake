
import React, { useState } from 'react';

interface ProjectFormProps {
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onCancel }) => {
  const [today] = useState(new Date().toISOString().split('T')[0]);
  const [regDate, setRegDate] = useState(today);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState('');

  // Function to trigger native date picker on field click
  const handleDateClick = (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      (e.currentTarget as any).showPicker();
    } catch (err) {
      // Fallback for older browsers
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Form Header */}
      <div className="bg-slate-900 px-8 py-6 text-white flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">신규 프로젝트 등록</h2>
          <p className="text-slate-400 text-xs mt-1">기술진단팀의 새로운 협업 프로젝트를 시작합니다.</p>
        </div>
        <div className="size-12 bg-white/10 rounded-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-3xl opacity-80">edit_note</span>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Row 1: Date and Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-600">calendar_today</span>
              등록 일자
            </label>
            <input 
              type="date" 
              value={regDate}
              onChange={(e) => setRegDate(e.target.value)}
              onClick={handleDateClick}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none cursor-pointer"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-600">person</span>
              작성자
            </label>
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
              <img src="https://picsum.photos/seed/master/40/40" className="size-8 rounded-full border border-white shadow-sm" alt="Author" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-800">김진단 팀장</span>
                <span className="text-[9px] text-blue-600 font-extrabold uppercase px-1.5 py-0.5 bg-blue-50 border border-blue-100 rounded">MASTER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Title */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-blue-600">label</span>
            프로젝트 명칭
          </label>
          <input 
            type="text" 
            placeholder="수질 및 대기 환경 진단 프로젝트명을 입력하세요"
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-bold placeholder:text-slate-300 placeholder:font-normal focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
          />
        </div>

        {/* Project Period (Start and End Date) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-600">event_available</span>
              프로젝트 시작일
            </label>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onClick={handleDateClick}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-600">event_busy</span>
              프로젝트 종료일
            </label>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              onClick={handleDateClick}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-blue-600">description</span>
            상세 프로젝트 내용
          </label>
          <textarea 
            rows={6}
            placeholder="프로젝트의 목적, 범위 및 기대 효과를 기술해 주세요."
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 leading-relaxed placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none resize-none"
          />
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-blue-600">attach_file</span>
            참조 파일 첨부
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-white hover:border-blue-300 transition-all cursor-pointer group">
            <div className="size-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-500">cloud_upload</span>
            </div>
            <p className="text-sm font-bold text-slate-600">파일을 드래그하여 업로드하거나 클릭하세요</p>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tight">PDF, XLSX, DOCX, ZIP • Max 50MB</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex items-center justify-end gap-3 border-t border-slate-100">
          <button 
            onClick={onCancel}
            className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors"
          >
            작성 취소
          </button>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">send</span>
            신규 프로젝트 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
