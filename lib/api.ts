import { useEffect } from "react";
import Router from "next/router";
import axios from "axios";

export type User = {
  email: string;
  role: string;
  authLevel: string;
  imageUrl: string;
};

export type DiversityOptions = {
  attributes: string[];
  groups: string[];
};

function getHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

async function get(url: string, token: string | null) {
  if (token) {
    return await axios
      .get(url, { headers: getHeaders(token) })
      .then((res) => res.data)
      .catch((error) => {
        Router.push(`/login`);
      });
  }
  Router.push("/login");
}

async function post(url: string, token: string | null, body: object = {}) {
  if (token) {
    return await axios
      .post(url, body, { headers: getHeaders(token) })
      .then((res) => res.data)
      .catch((error) => {
        Router.push(`/login`);
      });
  }
  Router.push("/login");
}

export async function getUser(token: string | null) {
  return await get("/api/user/get", token);
}

export async function getDiversityOptions(token: string | null) {
  return await get("/api/diversity/get-options", token);
}

export async function getDiversityData(
  attribute: string,
  group: string,
  token: string | null
) {
  return await post("/api/diversity/get-data", token, { attribute, group });
}

export async function getPersonalDiversityData(token: string | null) {
  return await get("/api/diversity/get-personal", token);
}

export async function setPersonalDiversityData(
  token: string | null,
  data: any
) {
  return await post("/api/diversity/set-personal", token, data);
}
