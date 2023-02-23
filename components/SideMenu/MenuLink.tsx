import { useRouter } from "next/router";
import Link from "next/link";

interface MenuLinkProps extends React.PropsWithChildren {
  title: string;
}

export default function MenuLink(props: MenuLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={`/${
        props.title == "Dashboard" ? "" : "dashboard/"
      }${props.title.toLowerCase()}`}
      className={`flex flex-row items-center gap-4 py-2 px-4 rounded-lg ${
        router.query.si == `${props.title.toLowerCase()}` ||
        router.pathname == `/${props.title.toLowerCase()}`
          ? "bg-background text-white"
          : ""
      }`}
    >
      {props.children}
      <p className="font-normal">{props.title}</p>
    </Link>
  );
}
