import { useRouter } from "next/router";
import Head from "next/head";
import SideMenu from "@/components/SideMenu/SideMenu";
import Diversity from "@/components/diversity";

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
        <main className="bg-background shadow-2xl shadow-black rounded-l-3xl p-16 flex-grow overflow-y-auto">
          {si != "diversity" && (
            <div className="h-full flex justify-center items-center">
              <h1 className="text-white font-bold text-2xl">
                No Data available
              </h1>
            </div>
          )}
          {si == "diversity" && <Diversity></Diversity>}
        </main>
      </div>
    </>
  );
}
