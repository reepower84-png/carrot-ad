import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "당근마켓광고 | 제이코리아",
  description: "당근마켓 공식 시행사 제이코리아에서 효과적인 지역 광고를 시작하세요. 무료 상담 문의 접수 중!",
  keywords: "당근마켓, 당근마켓광고, 지역광고, 로컬마케팅, 제이코리아",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
