import React, { useState, useContext } from "react";

import { registerUser } from "../components/lib/auth";
import Router from "next/router";
import { Container, Grid, Button, Group, Box, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import AppContext from "../context/AppContext";
const SignUp = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const appContext = useContext(AppContext);

  // const Error = (
  //   {Object.entries(error).length !== 0 &&
  //     error.constructor === Object &&
  //     error.message.map((error) => {
  //       return (
  //         <div
  //           key={error.messages[0].id}
  //           style={{ marginBottom: 10 }}
  //         >
  //           <small style={{ color: "red" }}>
  //             {error.messages[0].message}
  //           </small>
  //         </div>
  //       );
  //     })}
  // );

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form>
        <TextInput
          disabled={loading}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          withAsterisk
          label="نام کاربری"
          placeholder="نام کاربری"
          type="text"
        />
        <TextInput
          onChange={(e) => setData({ ...data, email: e.target.value })}
          withAsterisk
          label="ایمیل"
          placeholder="ایمیل"
          type="email"
        />
        <TextInput
          onChange={(e) => setData({ ...data, password: e.target.value })}
          withAsterisk
          label="رمز عبور"
          placeholder="رمز عبور"
          type="password"
        />
        <Button
          onClick={() => {
            registerUser(data.username, data.email, data.password)
              .then((res) => {
                // set authed user in global context object
                appContext.setUser(res.data.user);
                setLoading(false);
                console.log(res);
              })
              .catch((error) => {
                setError(error.response.data);
                setLoading(false);
                console.log(error);
              });
          }}
          loading={loading}
          disabled={loading}
          // type="submit"
        >
          {loading ? " " : "ثبت نام"}
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
