import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="header-inner">
            <Link href="/" className="logo">
              <span className="logo-icon">✓</span>
              TaskFlow
            </Link>

            <nav className="nav">
              <Link href="/">Dashboard</Link>
              <Link href="/tasks">Tasks</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <p>© 2026 TaskFlow</p>
        </footer>
      </body>
    </html>
  );
}