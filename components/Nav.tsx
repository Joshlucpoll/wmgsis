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
      <section className="flex flex-row gap-8 items-center"></section>
    </nav>
  );
}
