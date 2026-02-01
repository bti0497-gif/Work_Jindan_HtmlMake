
import React, { useState, useRef } from 'react';

interface SignUpProps {
  onSignUp: (data: any) => void;
  onBack: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onBack }) => {
  const [formData, setFormData] = useState({
    id: '', name: '', email: '', phone: '', address: '', detailAddress: '', avatar: 'https://picsum.photos/seed/default/100/100'
  });
  const [idAvailable, setIdAvailable] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAvatarSelect = (url: string) => {
    setFormData(prev => ({ ...prev, avatar: url }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const checkId = () => {
    if (!formData.id || formData.id.length < 4) {
      alert("아이디는 4자 이상 입력해야 합니다.");
      return;
    }
    // Mocking availability
    setIdAvailable(true);
    alert("사용 가능한 아이디입니다.");
  };

  const mockAddressSearch = () => {
    setFormData({ ...formData, address: '경기도 성남시 분당구 판교역로 166' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // [STRICT CHECK] 모든 필드 필수 입력 확인
    const { id, name, email, phone, address, detailAddress } = formData;
    if (!id || !name || !email || !phone || !address || !detailAddress) {
      alert("모든 필수 입력란을 작성해야 회원가입이 가능합니다.");
      return;
    }

    if (!isEmailValid(email)) {
      alert("유효한 이메일 주소를 입력해주세요. (비밀번호 찾기 시 필요)");
      return;
    }

    if (idAvailable === null) {
      alert("아이디 중복 확인이 필요합니다.");
      return;
    }

    onSignUp(formData);
  };

  return (
    <div className="h-full w-full flex flex-col items-center bg-slate-50 overflow-y-auto">
      <div className="flex-1 flex items-center justify-center p-6 w-full py-12">
        <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-slate-900 px-10 py-8 text-white flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">기술진단팀원 신규등록</h2>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-medium">모든 필드를 입력해주세요</p>
            </div>
            <button onClick={onBack} className="size-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="space-y-4">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">프로필 사진</label>
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <img src={formData.avatar} className="size-24 rounded-[32px] object-cover border-4 border-slate-100 shadow-md transition-all group-hover:border-blue-400" alt="Avatar" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 size-8 bg-blue-600 text-white rounded-xl flex items-center justify-center border-2 border-white shadow-lg">
                    <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                </div>
                <div className="flex-1 grid grid-cols-5 gap-3">
                  {['user1','user2','user3','user5','user6'].map(s => (
                    <img key={s} src={`https://picsum.photos/seed/${s}/100/100`} onClick={() => handleAvatarSelect(`https://picsum.photos/seed/${s}/100/100`)}
                      className={`size-12 rounded-2xl cursor-pointer border-2 transition-all ${formData.avatar.includes(s) ? 'border-blue-600 scale-110' : 'border-slate-50 hover:border-slate-200'}`} alt={s}/>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">계정 아이디</label>
                <div className="flex gap-2">
                  <input type="text" value={formData.id} onChange={(e) => { setFormData({...formData, id: e.target.value}); setIdAvailable(null); }} className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none" placeholder="4자 이상"/>
                  <button type="button" onClick={checkId} className="px-4 bg-slate-800 text-white rounded-2xl text-[12px] font-bold hover:bg-slate-700 transition-colors">중복확인</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">성명</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none" placeholder="실명 입력"/>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">이메일 (비밀번호 찾기용)</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none" placeholder="example@deojon.com"/>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">연락처</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none" placeholder="010-0000-0000"/>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">주소</label>
              <div className="flex gap-2 mb-2">
                <input type="text" readOnly value={formData.address} className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 font-bold outline-none cursor-default" placeholder="주소 검색 버튼 클릭"/>
                <button type="button" onClick={mockAddressSearch} className="px-5 bg-blue-600 text-white rounded-2xl text-[12px] font-bold hover:bg-blue-700 transition-colors">주소 검색</button>
              </div>
              <input type="text" value={formData.detailAddress} onChange={(e) => setFormData({...formData, detailAddress: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none" placeholder="상세 주소 입력"/>
            </div>

            <div className="pt-4 flex items-center gap-4">
               <button type="button" onClick={onBack} className="flex-1 py-4 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors">취소</button>
               <button type="submit" className="flex-[2] bg-blue-600 text-white py-4 rounded-[20px] font-bold text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">진단팀원 등록 완료</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
