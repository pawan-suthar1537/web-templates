import Header from "@/components/Header";
import "@/styles/globals.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={`${poppins.className} max-w-[1080px] mx-auto`}>
        <Header/>
        <Component {...pageProps} />
      </main>
    </>
  );
}
