
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (id: string, remember: boolean) => void;
  onGoSignUp: () => void;
  onGoForgot: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onGoSignUp, onGoForgot }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState(''); 
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!id.trim()) {
      setError('아이디를 입력해주세요.');
      return;
    }
    if (!password.trim()) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    onLogin(id, remember);
  };

  return (
    <div className="h-full w-full flex flex-col items-center bg-slate-900 relative overflow-y-auto">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600 rounded-full blur-[140px]"></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 w-full min-h-fit py-12">
        <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 relative z-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-10">
            {/* 고도화된 앱 아이콘: 이미지 느낌을 살린 그라데이션 및 쉐도우 */}
            <div className="size-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30 transform hover:scale-105 transition-transform duration-500">
              <span className="material-symbols-outlined text-white text-5xl">microscope</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">협업스튜디오 로그인</h1>
            <p className="text-slate-400 text-sm mt-2 font-bold tracking-tight">더죤환경기술(주)</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">User ID</label>
              <div className="relative group">
                <input 
                  type="text" 
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                    if(error) setError(null);
                  }}
                  placeholder="아이디를 입력하세요"
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl text-slate-800 font-bold focus:bg-white focus:ring-4 transition-all outline-none ${
                    error && !id ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-100 focus:ring-blue-50 focus:border-blue-400'
                  }`}
                />
                <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  error && !id ? 'text-red-400' : 'text-slate-300 group-focus-within:text-blue-500'
                }`}>person</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Password</label>
              <div className="relative group">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if(error) setError(null);
                  }}
                  placeholder="비밀번호를 입력하세요"
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl text-slate-800 font-bold focus:bg-white focus:ring-4 transition-all outline-none ${
                    error && !password ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-100 focus:ring-blue-50 focus:border-blue-400'
                  }`}
                />
                <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  error && !password ? 'text-red-400' : 'text-slate-300 group-focus-within:text-blue-500'
                }`}>lock</span>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-1 text-red-500 animate-in fade-in slide-in-from-top-1">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span className="text-[12px] font-bold">{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-100 transition-all" 
                />
                <span className="text-[12px] font-bold text-slate-500 group-hover:text-slate-700 transition-colors">아이디 저장</span>
              </label>
              <button type="button" onClick={onGoForgot} className="text-[12px] font-bold text-slate-400 hover:text-blue-600 transition-colors">비밀번호 찾기</button>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all mt-4"
            >
              스튜디오 입장하기
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <p className="text-[12px] text-slate-400 font-medium mb-4">아직 계정이 없으신가요?</p>
            <button 
              onClick={onGoSignUp}
              className="text-[13px] font-black text-blue-600 hover:underline underline-offset-4"
            >
              진단팀원 신규등록 (회원가입)
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-8 shrink-0">
        <p className="text-[11px] text-slate-600 font-bold tracking-widest uppercase">Developed by BTI0497</p>
      </div>
    </div>
  );
};

export default Login;
