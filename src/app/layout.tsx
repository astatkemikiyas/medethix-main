import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ethiopian Digital Health Codes",
    description:
        "Ethiopia’s official portal where medical services, procedures, and diseases are assigned standardized codes.",
    openGraph: {
        title: "Ethiopian Digital Health Codes",
        description:
            "Ethiopia’s official portal where medical services, procedures, and diseases are assigned standardized codes.",
        url: "https://www.medethix-bo.xyz",
        siteName: "Ethiopian Government Health Portal",
        images: [
            {
                url: "https://www.medethix-bo.xyz/og/og-whatsapp-government-health.png",
                width: 1200,
                height: 630,
                alt: "Ethiopian government medical portal with coded procedures, services and diseases",
            },
        ],
        type: "website",
    },
    metadataBase: new URL("https://www.medethix-bo.xyz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
