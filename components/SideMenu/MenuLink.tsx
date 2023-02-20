interface MenuLinkProps {
  title: string;
  icon: string;
}

export default function MenuLink(props: MenuLinkProps) {
  return (
    <div>
      <ion-icon name={props.icon}></ion-icon>
      <p>{props.title}</p>
    </div>
  );
}
