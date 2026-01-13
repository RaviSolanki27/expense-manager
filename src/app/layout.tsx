import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";
import { ThemeProvider } from "@/context/theme-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses and income",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen bg-background">
            <ReduxProvider>
              <main className="flex-1 overflow-auto">{children}</main>
            </ReduxProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
