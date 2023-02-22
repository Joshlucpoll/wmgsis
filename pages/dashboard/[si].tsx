import { useRouter } from "next/router";
import Head from "next/head";
import SideMenu from "@/components/SideMenu/SideMenu";

export default function Si() {
  const router = useRouter();
  const { si } = router.query;

  return (
    <>
      <Head>
        <title>{si} | WMGSIS</title>
      </Head>
      <div className="flex flex-row h-screen">
        <SideMenu></SideMenu>
        <main className="bg-background shadow-2xl shadow-black rounded-l-3xl flex-grow"></main>
      </div>
    </>
  );
}
