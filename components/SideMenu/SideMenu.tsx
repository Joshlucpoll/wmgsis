import Image from "next/image";
import Link from "next/link";
import MenuLink from "./MenuLink";

import {
  IoBriefcase,
  IoCash,
  IoHammer,
  IoPeople,
  IoPeopleCircle,
  IoTelescope,
  IoTrophy,
} from "react-icons/io5";

export default function SideMenu() {
  return (
    <nav className="flex flex-col p-8">
      <Link href="/">
        <Image
          className="w-48"
          src="/img/logo.png"
          alt="WMGSIS"
          width={1000}
          height={2200}
        />
      </Link>
      <section className="grid auto-cols-auto gap-2 mt-12">
        <MenuLink title="Dashboard">
          <IoBriefcase></IoBriefcase>
        </MenuLink>
        <MenuLink title="Investments">
          <IoCash></IoCash>
        </MenuLink>
        <MenuLink title="Usage">
          <IoPeople></IoPeople>
        </MenuLink>
        <MenuLink title="Successes">
          <IoTrophy></IoTrophy>
        </MenuLink>
        <MenuLink title="Opportunities">
          <IoTelescope></IoTelescope>
        </MenuLink>
        <MenuLink title="Apprenticeships">
          <IoHammer></IoHammer>
        </MenuLink>
        <MenuLink title="Diversity">
          <IoPeopleCircle></IoPeopleCircle>
        </MenuLink>
      </section>
    </nav>
  );
}
