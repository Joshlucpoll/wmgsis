import { useEffect } from "react";
import Router from "next/router";
import axios from "axios";

export type User = {
  email: string;
  role: string;
  authLevel: string;
  imageUrl: string;
};

function getHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function getUser(token: string | null) {
  if (token) {
    return await axios
      .get("/api/user/get", { headers: getHeaders(token) })
      .then((res) => res.data)
      .catch((error) => {
        Router.push(`/login`);
      });
  }
  Router.push("/login");
}
