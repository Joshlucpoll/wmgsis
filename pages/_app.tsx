import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { IBM_Plex_Sans } from "@next/font/google";
import feather from "feather-icons";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
});

export default function App({ Component, pageProps }: AppProps) {
  feather.icons;
  return (
    <main className={`${ibmPlexSans.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
