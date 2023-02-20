import Head from "next/head";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | WMGSIS</title>
      </Head>
      <div className="min-h-screen">
        <Nav></Nav>
        <main className="h-full w-full ">
          <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center">
            <h1 className="font-bold text-6xl leading-tight mb-8">
              Warwick Manufacturing Group
              <br /> Statistical Information System
            </h1>
            <Link
              href="/sign-up"
              className="font-semibold text-slate-100 bg-slate-900 py-2 px-6 rounded-md"
            >
              Learn more
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
