import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";
import { promises } from "stream";
import { rejects } from "assert";
import { api_url } from "../../util/environment";

const API_URL = "http://localhost:1337";

//register a new user
export const registerUser = (
  username: string,
  email: string,
  password: string
) => {
  //prevent function from eing ran on the server
  if (typeof window === "undefined") return;

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/api/auth/local/register`, {
        username,
        email,
        password,
      }) //post register info to api
      .then((res) => {
        //set token response form Strapi for serverr validation
        Cookie.set("token", res.data.jwt);

        //respove the promise to set loading to false in Signup
        resolve(res);
        //redirect back to home page
        Router.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object ack to the form
        reject(error);
      });
  });
};
export const login = (identifier: string, password: string) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") return;
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/api/auth/local`, { identifier, password })
      .then((res) => {
        //set token response from Strapi for server validation
        Cookie.set("token", res.data.jwt);
        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        Router.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const logout = () => {
  //remove token and user cookie
  Cookie.remove("token");
  delete window.__user;
  // sync logout between multiple windows
  const date = Date.now().toString() as string;
  window.localStorage.setItem("logout", date);
  //redirect to the home page
  Router.push("/");
  console.log("logout");
};
//Higher Order Component to wrap our pages and logout simultaneously logged in tabs

export const withAuthSync = (Component: any) => {
  const Wrapper = (props: any) => {
    const syncLogout = (event: any) => {
      if (event.key === "logout") {
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};
