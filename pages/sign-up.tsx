import Head from "next/head";
import Image from "next/image";
import Nav from "@/components/Nav";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Sign Up | WMGSIS</title>
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
          if (loading) return;
          event.preventDefault();
          setLoading(true);

          const target = event.target as HTMLFormElement;

          if (target.password.value != target.password2.value) {
            setMessage("Passwords do not match");
          }

          const email = target.email.value;
          const password = target.password.value;
          axios
            .post("/api/auth/create-user", {
              email,
              password,
            })
            .then((res) => {
              setLoading(false);
              localStorage.setItem("access_token", res.data.access_token);
            })
            .catch((error) => {
              if (error.response.status == 409) {
                setLoading(false);
                setMessage("User already exists");
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
        <div className="outline outline-black bg-white rounded-md flex flex-row items-center justify-between w-full">
          <input
            className="flex-grow p-4"
            type="password"
            name="password2"
            id="password2"
            placeholder="password"
            required
          />
        </div>
        <p className="text-red-500 font-semibold">{message}</p>
        <button className="font-semibold text-slate-100 bg-slate-900 py-2 px-6 rounded-md">
          {!loading && "Sign up"}
          {loading && (
            <img
              className="inline w-8 mb-1"
              src="/img/loading.gif"
              alt="loading"
            />
          )}
        </button>
      </form>
    </div>
  );
}
