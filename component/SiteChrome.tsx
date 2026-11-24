"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

// Wraps pages in the site navbar/footer, except the embedded Sanity Studio
// at /studio, which needs the full viewport.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
