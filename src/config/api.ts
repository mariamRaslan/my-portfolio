"use server";

import axios from "axios";

import { cookies, headers } from "next/headers";


export const instance = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
});

export const saveCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
};


export const postData = async ([endpoint, data, method = "post"]: [
  string,
  any,
  string?,
]) => {
  try {
  
    const headersList = await headers();

    const response = await instance.request({
      url: endpoint,
      method,
      data,
      withCredentials: true,
      headers: {
        
        Cookie: headersList.get("cookie"),
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};




