"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navItems = [
  { id: "hero", label: "홈" },
  { id: "features", label: "광고 효과" },
  { id: "advantages", label: "특장점" },
  { id: "nationwide", label: "전국 노출" },
  { id: "certification", label: "전국 인증" },
  { id: "strategy", label: "마케팅전략" },
  { id: "contact", label: "상담 문의" },
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
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
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:opacity-80 transition"
            >
              <Image
                src="/logo.png"
                alt="동네광고연구소"
                width={300}
                height={80}
                className="h-12 sm:h-16 w-auto"
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? "text-[#ff6f0f] bg-[#fff5ef]"
                      : "text-gray-600 hover:text-[#ff6f0f] hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="https://drive.google.com/file/d/1UY6IySLTkQIyr-J46KyH-_1vZQIWZbqD/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-4 border-2 border-[#ff6f0f] text-[#ff6f0f] rounded-lg font-medium hover:bg-[#fff5ef] transition whitespace-nowrap"
              >
                상품 상세보기
              </a>
              <button onClick={scrollToContact} className="hidden sm:inline-flex btn-primary text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-4 whitespace-nowrap">
                무료 상담
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="메뉴 열기"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <nav className="flex flex-col bg-gray-50 rounded-xl p-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-3 rounded-lg text-left font-medium transition-all ${
                    activeSection === item.id
                      ? "text-[#ff6f0f] bg-[#fff5ef]"
                      : "text-gray-600 hover:text-[#ff6f0f] hover:bg-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex gap-2 mt-2 pt-2 border-t border-gray-200">
                <a
                  href="https://drive.google.com/file/d/1UY6IySLTkQIyr-J46KyH-_1vZQIWZbqD/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-sm py-2.5 border-2 border-[#ff6f0f] text-[#ff6f0f] rounded-lg font-medium hover:bg-[#fff5ef] transition"
                >
                  상품 상세보기
                </a>
                <button
                  onClick={scrollToContact}
                  className="flex-1 text-center text-sm py-2.5 bg-[#ff6f0f] text-white rounded-lg font-medium hover:bg-[#e5630d] transition"
                >
                  무료 상담
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-28 pb-20 px-4 bg-gradient-to-b from-[#fff5ef] to-white">
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
      <section id="features" className="py-20 px-4">
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
      <section id="advantages" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
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
      <section id="nationwide" className="py-16 px-4 bg-gray-900 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          {/* 전국 노출 시각화 */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-10">
            {/* 퍼져나가는 파동 효과 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full border-2 border-[#ff6f0f]/20 animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute w-3/4 h-3/4 rounded-full border-2 border-[#ff6f0f]/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
              <div className="absolute w-1/2 h-1/2 rounded-full border-2 border-[#ff6f0f]/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }}></div>
            </div>

            {/* 중앙 당근 아이콘 */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#ff6f0f] rounded-full flex items-center justify-center shadow-lg shadow-[#ff6f0f]/50">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C15.1 7 16 7.9 16 9V10H17C18.1 10 19 10.9 19 12V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V12C5 10.9 5.9 10 7 10H8V9C8 7.9 8.9 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2M7 12V19H17V12H7M12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14Z"/>
                </svg>
              </div>
            </div>

            {/* 전국 주요 도시 마커 */}
            {/* 서울 */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center animate-pulse">
              <div className="w-3 h-3 bg-[#ff6f0f] rounded-full shadow-lg shadow-[#ff6f0f]/50"></div>
              <span className="text-xs text-white/80 mt-1 font-medium">서울</span>
            </div>
            {/* 부산 */}
            <div className="absolute bottom-4 right-8 md:right-12 flex flex-col items-center animate-pulse" style={{ animationDelay: '0.3s' }}>
              <div className="w-3 h-3 bg-[#ff6f0f] rounded-full shadow-lg shadow-[#ff6f0f]/50"></div>
              <span className="text-xs text-white/80 mt-1 font-medium">부산</span>
            </div>
            {/* 대구 */}
            <div className="absolute bottom-16 right-4 md:right-6 flex flex-col items-center animate-pulse" style={{ animationDelay: '0.6s' }}>
              <div className="w-3 h-3 bg-[#ff6f0f] rounded-full shadow-lg shadow-[#ff6f0f]/50"></div>
              <span className="text-xs text-white/80 mt-1 font-medium">대구</span>
            </div>
            {/* 인천 */}
            <div className="absolute top-12 left-4 md:left-6 flex flex-col items-center animate-pulse" style={{ animationDelay: '0.2s' }}>
              <div className="w-3 h-3 bg-[#ff6f0f] rounded-full shadow-lg shadow-[#ff6f0f]/50"></div>
              <span className="text-xs text-white/80 mt-1 font-medium">인천</span>
            </div>
            {/* 광주 */}
            <div className="absolute bottom-8 left-8 md:left-12 flex flex-col items-center animate-pulse" style={{ animationDelay: '0.5s' }}>
              <div className="w-3 h-3 bg-[#ff6f0f] rounded-full shadow-lg shadow-[#ff6f0f]/50"></div>
              <span className="text-xs text-white/80 mt-1 font-medium">광주</span>
            </div>
            {/* 대전 */}
            <div className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 flex flex-col items-center animate-pulse" style={{ animationDelay: '0.4s' }}>
              <div className="w-3 h-3 bg-[#ff6f0f] rounded-full shadow-lg shadow-[#ff6f0f]/50"></div>
              <span className="text-xs text-white/80 mt-1 font-medium">대전</span>
            </div>
            {/* 울산 */}
            <div className="absolute top-1/3 right-2 md:right-4 flex flex-col items-center animate-pulse" style={{ animationDelay: '0.7s' }}>
              <div className="w-3 h-3 bg-[#ff6f0f] rounded-full shadow-lg shadow-[#ff6f0f]/50"></div>
              <span className="text-xs text-white/80 mt-1 font-medium">울산</span>
            </div>
            {/* 제주 */}
            <div className="absolute bottom-2 left-1/3 flex flex-col items-center animate-pulse" style={{ animationDelay: '0.8s' }}>
              <div className="w-3 h-3 bg-[#ff6f0f] rounded-full shadow-lg shadow-[#ff6f0f]/50"></div>
              <span className="text-xs text-white/80 mt-1 font-medium">제주</span>
            </div>
          </div>

          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed">
            전국 어디든 원하는 지역에<br className="md:hidden" /> 원하는 양만큼<br />
            동시 노출이 가능한 건 오직!{" "}
            <span className="text-[#ff6f0f]">당사뿐입니다!!</span>
          </p>
        </div>
      </section>

      {/* 전국 인증 섹션 */}
      <section id="certification" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            전국 인증을 통한 <span className="text-[#ff6f0f]">전국 통합 관리</span>
          </h3>
          <div className="mb-8 max-w-3xl mx-auto px-4">
            <Image
              src="/certification.jpg"
              alt="전국 인증 이미지"
              width={800}
              height={600}
              className="rounded-2xl shadow-lg w-full h-auto"
            />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            자연스럽게 피드에 <span className="text-[#ff6f0f]">노출</span> 됩니다.
          </p>
          <p className="text-lg md:text-xl text-gray-600 mt-4">
            당사는 가계정, 불법 프로그램이 아닌 <span className="text-[#ff6f0f] font-semibold">100% 실 사용자 활성 아이디</span>로 진행되서 노출이 자연스럽습니다!!
          </p>
        </div>
      </section>

      {/* Marketing Strategy Section */}
      <section id="strategy" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="section-title">마케팅 전략</h3>
          <p className="section-subtitle">당근마켓 광고 상품 안내</p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 상품1 - 비즈프로필 */}
            <div className="bg-gradient-to-br from-[#fff5ef] to-white p-8 rounded-2xl shadow-lg border border-[#ff6f0f]/20">
              <div className="inline-block bg-[#ff6f0f] text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                상품 1
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-6">비즈프로필 홍보</h4>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-20 h-7 bg-[#ff6f0f] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    STEP 01
                  </span>
                  <p className="text-gray-700 pt-0.5">비즈프로필 등록 및 키워드 최적화</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-20 h-7 bg-[#ff6f0f] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    STEP 02
                  </span>
                  <p className="text-gray-700 pt-0.5">동네생활 게시글 작업진행 (질문형 + 후기형 혼합)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-20 h-7 bg-[#ff6f0f] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    STEP 03
                  </span>
                  <p className="text-gray-700 pt-0.5">비즈프로필 후기 업로드로 신뢰 강화</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-20 h-7 bg-[#ff6f0f] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    STEP 04
                  </span>
                  <p className="text-gray-700 pt-0.5">성과 분석 및 주기적 키워드 보완</p>
                </div>
              </div>

              <div className="bg-white/80 p-5 rounded-xl border border-[#ff6f0f]/10">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-[#ff6f0f]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-gray-900">효과</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  업종 검색 시 자동노출 · 검색 노출 강화 · 브랜드 인지도 향상 · 단골 확보 · 광고비 절감
                </p>
              </div>
            </div>

            {/* 상품2 - 동네생활 게시글 홍보 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="inline-block bg-gray-800 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                상품 2
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-6">동네생활 게시글 홍보</h4>

              <div className="mb-8">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 bg-[#fff5ef] text-[#ff6f0f] font-semibold rounded-lg border border-[#ff6f0f]/20">
                    정보형
                  </span>
                  <span className="px-4 py-2 bg-[#fff5ef] text-[#ff6f0f] font-semibold rounded-lg border border-[#ff6f0f]/20">
                    후기형
                  </span>
                  <span className="px-4 py-2 bg-[#fff5ef] text-[#ff6f0f] font-semibold rounded-lg border border-[#ff6f0f]/20">
                    질문형
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  게시글 및 답글을 활용한 <span className="text-[#ff6f0f] font-semibold">자연스러운 노출</span><br />
                  누구나 질문과 답변 참여 가능
                </p>
              </div>

              <div className="bg-gray-100/80 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-[#ff6f0f]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-gray-900">효과</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  신뢰 기반 콘텐츠 형성 · 검색 노출 효과가 매우 큼 · 누적형 자산 콘텐츠 · 타겟 고객 직접 접근 가능
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="section-title">고객 후기</h3>
          <p className="section-subtitle">실제 광고주분들의 생생한 후기입니다</p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 후기 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                &ldquo;동네 카페 운영 중인데 당근 광고 시작하고 단골이 확실히 늘었어요. 특히 동네 주민들이 검색해서 찾아오시는 분들이 많아졌습니다.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#fff5ef] rounded-full flex items-center justify-center">
                  <span className="text-[#ff6f0f] font-bold">김</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">김**</p>
                  <p className="text-sm text-gray-500">카페 운영</p>
                </div>
              </div>
            </div>

            {/* 후기 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                &ldquo;네이버 광고비가 너무 비싸서 고민이었는데, 당근 광고는 가성비가 정말 좋아요. 전환율도 높고 문의도 꾸준히 들어옵니다.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#fff5ef] rounded-full flex items-center justify-center">
                  <span className="text-[#ff6f0f] font-bold">박</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">박**</p>
                  <p className="text-sm text-gray-500">인테리어 업체</p>
                </div>
              </div>
            </div>

            {/* 후기 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                &ldquo;처음엔 반신반의했는데 결과가 너무 좋아서 놀랐습니다. 전국 여러 지역에 동시 노출되니까 확실히 효과가 다르네요!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#fff5ef] rounded-full flex items-center justify-center">
                  <span className="text-[#ff6f0f] font-bold">이</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">이**</p>
                  <p className="text-sm text-gray-500">가공식품 온·오프라인 판매 업체</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
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
          src="/kakao-logo.png"
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
            <Image
              src="/logo.png"
              alt="동네광고연구소"
              width={400}
              height={100}
              className="h-24 w-auto mx-auto mb-2"
            />
            <p className="text-gray-400">당근마켓 시행사</p>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p className="mb-2">상호: 제이코리아 | 대표: 이주영</p>
            <p className="mb-4">사업자등록번호: 278-30-01540</p>
            <p>© {new Date().getFullYear()} 동네광고연구소. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
