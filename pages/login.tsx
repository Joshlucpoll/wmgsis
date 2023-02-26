import Head from "next/head";
import Image from "next/image";
import Nav from "@/components/Nav";
import axios from "axios";
import { useState } from "react";
import Router from "next/router";

export default function LoginPage() {
  const [message, setMessage] = useState("");

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
      <form
        className="flex-grow mb-36 flex flex-col gap-8 items-center justify-center w-1/2 max-w-lg mx-auto"
        onSubmit={async (event) => {
          event.preventDefault();

          const target = event.target as HTMLFormElement;
          const email = target.email.value;
          const password = target.password.value;

          axios
            .post("/api/auth/login", { email, password })
            .then((res) => {
              localStorage.setItem("access_token", res.data.access_token);
              Router.push("/dashboard");
            })
            .catch((error) => {
              if (error.response.status == 400) {
                setMessage("Wrong credentials");
              }
            });
        }}
      >
        <div className="outline outline-black bg-white rounded-md flex flex-row items-center justify-between w-full">
          <input
            className="flex-grow p-4"
            type="text"
            name="email"
            id="email"
            placeholder="email"
            required
          />
        </div>
        <div className="outline outline-black bg-white rounded-md flex flex-row items-center justify-between w-full">
          <input
            className="flex-grow p-4"
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </div>
        <p className="text-red-500 font-semibold">{message}</p>
        <button className="font-semibold text-slate-100 bg-slate-900 py-2 px-6 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
}
