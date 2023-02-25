import Image from "next/image";
import Link from "next/link";
import MenuLink from "./MenuLink";

import { getUser, User } from "@/lib/api";
import { useEffect, useState } from "react";

import {
  IoBriefcase,
  IoCash,
  IoHammer,
  IoPeople,
  IoPeopleCircle,
  IoTelescope,
  IoTrophy,
  IoSettingsSharp,
  IoExit,
} from "react-icons/io5";
import Router from "next/router";

export default function SideMenu() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(localStorage.getItem("access_token")).then((currentUser: User) =>
      setUser(currentUser)
    );
  });

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
      <div className="flex-grow"></div>
      <section>
        {user?.imageUrl == undefined && (
          <div className="w-1/2 aspect-square bg-slate-500 rounded-full mx-auto"></div>
        )}
        {user?.imageUrl && (
          <img
            className="w-40 mx-auto rounded-full"
            src={user?.imageUrl}
            alt="Profile Picture"
          />
        )}
        <h2 className="font-bold text-lg text-center my-2">{user?.email}</h2>
        <div className="flex flex-row justify-center gap-4 mt-4">
          <IoSettingsSharp className="border-2 border-accent text-4xl p-2 rounded-md"></IoSettingsSharp>
          <button
            type="button"
            onClick={(e) => {
              localStorage.removeItem("access_token");
              Router.push("/login");
            }}
          >
            <IoExit className="border-2 border-accent text-4xl p-2 rounded-md"></IoExit>
          </button>
        </div>
      </section>
    </nav>
  );
}
