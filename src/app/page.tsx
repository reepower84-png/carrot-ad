"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-base sm:text-xl font-bold text-[#ff6f0f] hover:opacity-80 transition whitespace-nowrap"
            >
              당근마켓광고
            </button>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href="https://drive.google.com/file/d/1UY6IySLTkQIyr-J46KyH-_1vZQIWZbqD/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-4 border-2 border-[#ff6f0f] text-[#ff6f0f] rounded-lg font-medium hover:bg-[#fff5ef] transition whitespace-nowrap"
            >
              <span className="hidden sm:inline">상품 상세보기</span>
              <span className="sm:hidden">상세보기</span>
            </a>
            <button onClick={scrollToContact} className="btn-primary text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-4 whitespace-nowrap">
              <span className="hidden sm:inline">무료 상담</span>
              <span className="sm:hidden">상담</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#fff5ef] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[#ff6f0f] text-white text-sm font-medium px-4 py-1 rounded-full mb-6">
            당근마켓 시행사
          </span>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            우리 동네 고객에게<br />
            <span className="text-[#ff6f0f]">가장 효과적인 광고</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            당근마켓 월간 활성 이용자 약 2,000만명!<br />
            당근 광고는 노출 광고가 아니라 동네 매출 직결 광고입니다.<br />원하는 동네에 노출시켜드리겠습니다.
          </p>
          <button onClick={scrollToContact} className="btn-primary text-lg">
            지금 무료 상담받기
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="section-title">당근마켓 광고, 왜 효과적일까요?</h3>
          <p className="section-subtitle">지역 기반 광고의 새로운 패러다임</p>
          <p className="text-center text-[#ff6f0f] font-semibold text-lg mb-8 -mt-8">광고비 쓰기 전에, 당근부터 하세요</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#fff5ef] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#ff6f0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">정밀한 지역 타겟팅</h4>
              <p className="text-gray-600">
                원하는 동네의 실제 거주자에게만 광고를 노출하여 광고비 낭비를 최소화합니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#fff5ef] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#ff6f0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">높은 신뢰도</h4>
              <p className="text-gray-600">
                동네 이웃 간의 신뢰를 기반으로 한 광고로 브랜드 호감도가 상승합니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#fff5ef] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#ff6f0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">측정 가능한 성과</h4>
              <p className="text-gray-600">
                클릭, 노출, 전환까지 모든 성과를 실시간으로 확인하고 최적화할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-[#ff6f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">2,000만+</div>
              <div className="text-white/80">월간 활성 사용자</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">97%</div>
              <div className="text-white/80">광고주 만족도</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">3배</div>
              <div className="text-white/80">평균 전환율 상승</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-white/80">성공 캠페인</div>
            </div>
          </div>
        </div>
      </section>

      {/* 당사 특장점 핵심 요약 Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="section-title">당사 특장점 핵심 요약</h3>

          {/* 메인 카피 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-100 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-gray-400 font-medium">폐쇄성</span>
              </div>
              <svg className="w-8 h-8 text-[#ff6f0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#fff5ef] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#ff6f0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="text-[#ff6f0f] font-bold">확장성</span>
              </div>
            </div>
            <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              당근마켓의 <span className="text-gray-400 line-through">'폐쇄성'</span>을 <span className="text-[#ff6f0f]">'확장성'</span>으로 바꿉니다.
            </h4>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              지역·계정 제한으로 노출이 막히는 당근마켓 광고,<br />
              다수의 운영 계정과 지역 분산 노출 구조로 해결합니다.
            </p>
          </div>

          {/* 특장점 카드 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#fff5ef] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#ff6f0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h5 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="text-[#ff6f0f]">✔</span> 전국 단위 노출
              </h5>
              <p className="text-gray-600 text-sm">
                한 지역에 갇히지 않는<br />전국 어디든 노출 가능
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#fff5ef] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#ff6f0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h5 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="text-[#ff6f0f]">✔</span> 안정적인 광고 운영
              </h5>
              <p className="text-gray-600 text-sm">
                계정 리스크를 분산한<br />안전한 멀티 계정 구조
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#fff5ef] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#ff6f0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h5 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="text-[#ff6f0f]">✔</span> 지속 가능한 노출
              </h5>
              <p className="text-gray-600 text-sm">
                단발성이 아닌<br />꾸준한 노출 구조 구축
              </p>
            </div>
          </div>

          {/* 마무리 카피 */}
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              보여줄 수 없던 광고를, <span className="text-[#ff6f0f]">보이게 만듭니다.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed">
            전국 어디든 원하는 지역에<br className="md:hidden" /> 원하는 양만큼<br />
            노출이 가능한 건 오직!{" "}
            <span className="text-[#ff6f0f]">당사뿐입니다!!</span>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="section-title">지금 바로 시작하세요</h3>
          <p className="section-subtitle">
            당근마켓 광고 전문가가 무료로 상담해드립니다
          </p>
          <button onClick={scrollToContact} className="btn-primary text-lg">
            무료 상담 신청하기
          </button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h3 className="section-title">상담 문의</h3>
          <p className="section-subtitle">
            아래 양식을 작성해주시면 빠르게 연락드리겠습니다
          </p>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6f0f] focus:border-transparent outline-none transition"
                placeholder="홍길동"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                전화번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6f0f] focus:border-transparent outline-none transition"
                placeholder="010-1234-5678"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                상담 문의
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6f0f] focus:border-transparent outline-none transition resize-none"
                placeholder="문의하실 내용을 입력해주세요"
              />
            </div>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
                문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "접수 중..." : "상담 신청하기"}
            </button>
          </form>
        </div>
      </section>

      {/* Floating KakaoTalk Button */}
      <a
        href="http://pf.kakao.com/_uSEYb/chat"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
      >
        <Image
          src="/카톡_원형_로고.png"
          alt="카카오톡 상담"
          width={56}
          height={56}
          className="rounded-full"
        />
      </a>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-[#ff6f0f] mb-2">당근마켓광고</h4>
            <p className="text-gray-400">당근마켓 시행사</p>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p className="mb-2">상호: 제이코리아 | 대표: 이주영</p>
            <p className="mb-4">사업자등록번호: 278-30-01540</p>
            <p className="mb-4">© {new Date().getFullYear()} 당근마켓광고. All rights reserved.</p>
            <p className="text-gray-500 text-xs">
              사이트명: 당근마켓광고 | 제이코리아
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
