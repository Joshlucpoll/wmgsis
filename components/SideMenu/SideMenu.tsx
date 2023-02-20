import Image from "next/image";
import Link from "next/link";
import MenuLink from "./MenuLink";

export default function SideMenu() {
  return (
    <nav className="flex flex-col  p-12">
      <Link href="/">
        <Image
          className="w-64"
          src="/img/logo.png"
          alt="WMGSIS"
          width={1000}
          height={2200}
        />
      </Link>
      <section className="flex flex-col gap-4 items-center">
        <MenuLink icon="briefcase" title="Dashboard"></MenuLink>
      </section>
    </nav>
  );
}
