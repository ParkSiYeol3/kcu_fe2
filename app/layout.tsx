import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Raleway, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
// import { NextThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "next-themes";
import AuthProvider from "@/components/AuthProvider";
import { UserInfoProvider } from "@/contexts/UserInfoContext";

const dmSansHeading = DM_Sans({subsets:['latin'],variable:'--font-heading'});

const raleway = Raleway({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "포켓몬 도감", // 기본 제목
    template: "%s | 포켓몬 도감" // 하위 페이지 템플릿
  },

  // 검색 결과에 나오는 설명 (구글에서 제목 아래 회색 텍스트)
  description: "포켓몬 정보를 확인해 보세요",

  // 상대 경로를 절대 경로로 변환하는 기준 URL (OG 이미지 등에 필수)
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),

  // 검색 엔진 크롤러에게 지시 (index = 검색 결과 등록 허용, follow = 링크 따라가기 허용)
  robots: {
    index: true, // 이 페이지를 검색 결과에 표시
    follow: true, // 이 페이지의 링크를 따라가서 크롤링
  },

  openGraph: {
	    // 1. type - 콘텐츠 유형 (website=일반 사이트, article=블로그 글, video=동영상 등)
	    type: 'website',
	    
	    // 2. locale - 언어/지역 코드 (ko_KR=한국어, en_US=영어 등)
	    locale: 'ko_KR',
	    
	    // 3. url - 현재 페이지 URL (상대경로면 metadataBase와 합쳐짐)
	    url: '/',
	    
	    // 4. siteName - 사이트 전체 이름 (title과 별개로 사이트명 표시)
	    siteName: '물렁이와 함께하는 포켓몬 여행',
	    
	    // 5. title - OG 카드에 표시될 제목 (일반 title과 다르게 설정 가능)
	    title: '포켓몬 도감',
	    
	    // 6. description - OG 카드에 표시될 설명
	    description: '모든 포켓몬 정보',
	    
	    // 7. images - 미리보기 이미지 (배열 = 여러 이미지 가능)
	    images: [
	      {
	        url: '/og-image.png',      // 이미지 경로
	        width: 1200,               // 너비 (px)
	        height: 630,               // 높이 (px)
	        alt: '포켓몬 도감',         // 이미지 설명 (스크린리더용)
	      }
	    ],
	  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", raleway.variable, dmSansHeading.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <UserInfoProvider>
              <Navigation/>
              {children}
            </UserInfoProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}