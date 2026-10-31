import Header from "@/components/Header";
import "@/styles/globals.css";

import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <main className={`${poppins.className} min-h-screen w-full`}>
        <Header />
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
}
