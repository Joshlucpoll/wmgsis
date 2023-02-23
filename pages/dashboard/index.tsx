import SideMenu from "@/components/SideMenu/SideMenu";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | WMGSIS</title>
      </Head>
      <div className="flex flex-row h-screen">
        <SideMenu></SideMenu>
        <main className="bg-background shadow-2xl shadow-black rounded-l-3xl flex-grow"></main>
      </div>
    </>
  );
}