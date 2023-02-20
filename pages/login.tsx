import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Login | WMGSIS</title>
      </Head>
      <Image
        className="w-full h-screen absolute top-0 left-0 -z-10 object-cover"
        src="/img/background_logo.png"
        alt="Background"
        height={1024}
        width={1440}
      ></Image>
      <Nav></Nav>
      <section className="flex-grow mb-36 flex flex-col gap-8 items-center justify-center">
        <div className="outline outline-black bg-white rounded-md flex flex-row items-center justify-between w-1/3">
          <input
            className="flex-grow p-4"
            type="text"
            name="username"
            id="username"
            placeholder="username"
          />
          <p className="p-4 font-semibold">@warwick.ac.uk</p>
        </div>
        <div className="outline outline-black bg-white rounded-md flex flex-row items-center justify-between w-1/3">
          <input
            className="flex-grow p-4"
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </div>
        <Link
          href="/dashboard"
          className="font-semibold text-slate-100 bg-slate-900 py-2 px-6 rounded-md"
        >
          Login
        </Link>
      </section>
    </div>
  );
}
