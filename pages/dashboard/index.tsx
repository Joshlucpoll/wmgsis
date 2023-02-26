import SideMenu from "@/components/SideMenu/SideMenu";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | WMGSIS</title>
      </Head>
      <div className="flex flex-row h-screen">
        <SideMenu></SideMenu>
        <main className="bg-background shadow-2xl shadow-black rounded-l-3xl flex-grow overflow-y-auto p-16 text-white">
          <h1 className="font-bold text-3xl">Statistical Dashboard</h1>
          <p className="opacity-40 mt-2">Welcome!</p>
          <section className="flex flex-row relative gap-[3%] mt-12">
            <Link className="w-[18.88%]" href="/dashboard/diversity">
              <img
                src="/img/student_satisfaction.png"
                alt="student satisfaction"
              />
            </Link>
            <Link className="w-[34.15%]" href="/dashboard/diversity">
              <img src="/img/investments.png" alt="investments" />
            </Link>
            <Link className="w-[41.1%]" href="/dashboard/diversity">
              <img src="/img/messages.png" alt="investments" />
            </Link>
          </section>
          <h1 className="font-semibold text-2xl my-8">
            Course Grade Distribution
          </h1>
          <section className="relative">
            <Link href="/dashboard/diversity">
              <img
                src="/img/course_distribution.png"
                alt="course distribution"
              />
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
