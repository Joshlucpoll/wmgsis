import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex flex-row justify-between items-center p-12">
      <Link href="/">
        <Image
          className="w-64"
          src="/img/logo.png"
          alt="WMGSIS"
          width={1000}
          height={2200}
        />
      </Link>
      <section className="flex flex-row gap-8 items-center">
        <Link href="/login" className="font-semibold">
          Login
        </Link>
        <Link
          href="/sign-up"
          className="font-semibold text-slate-100 bg-slate-900 py-2 px-6 rounded-md"
        >
          Sign up
        </Link>
      </section>
    </nav>
  );
}
