import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { AccessibilityProvider } from "@/hooks/useAccessibility";
import { LanguageProvider } from "@/hooks/useLanguage";

export const metadata: Metadata = {
  title: "JanMitra AI — Your Civic Companion",
  description:
    "JanMitra AI helps citizens access government services, report public issues, and receive personalized AI-powered civic assistance in 22+ Indian languages.",
  keywords: [
    "government services",
    "civic platform",
    "India",
    "AI assistant",
    "citizen services",
    "DigiSeva",
  ],
  authors: [{ name: "JanMitra AI" }],
  robots: "index, follow",
  openGraph: {
    title: "JanMitra AI — Your Civic Companion",
    description: "AI-first civic companion for Indian citizens.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6B3FFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AccessibilityProvider>
          <LanguageProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#6B3FFF] focus:text-white focus:rounded-xl focus:text-sm focus:font-medium"
            >
              Skip to main content
            </a>
            <div
              className="flex h-screen overflow-hidden"
              style={{ background: "#F8F7FF" }}
            >
              <Sidebar />
              <div
                className="flex flex-col flex-1 min-w-0"
                style={{ marginLeft: "240px" }}
              >
                <TopBar />
                <div
                  className="flex-1 overflow-y-auto"
                  style={{ marginTop: "76px" }}
                >
                  {children}
                </div>
              </div>
            </div>
          </LanguageProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
