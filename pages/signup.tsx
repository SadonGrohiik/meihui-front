import React, { useState, useContext } from "react";

import { registerUser } from "../components/lib/auth";
import Router from "next/router";
import {
  Container,
  Grid,
  Button,
  Paper,
  Box,
  TextInput,
  Title,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import AppContext from "../context/AppContext";
import { format } from "path";
const SignUp = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const form = useForm({
    initialValues: { username: "" },
    validate: {
      username: (value) =>
        value.length < 3 ? "نام کاربری باید حداقل 3 حرف داشته باشد" : null,
      // email: (value) =>
      //   /^\S+@\S+$/.test(value) ? null : "لطفاا ایمیل معتبر وارد کنید",
      // password: (value) =>
      //   value.length < 8 ? "طول رمز عبور باید بیشتر از 8 حرف باشد" : null,
    },
  });
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
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <Paper withBorder shadow="md" p={30} mt={30} radius="lg">
        <form>
          <TextInput
            disabled={loading}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            required
            label="نام کاربری"
            placeholder="نام کاربری"
            type="text"
            mt="md"
            radius="lg"
          />
          <TextInput
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
            label="ایمیل"
            placeholder="ایمیل"
            type="email"
            mt="md"
            size="md"
            radius="lg"
          />
          <PasswordInput
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
            label="رمز عبور"
            placeholder="رمز عبور"
            mt="md"
            size="md"
            radius="lg"
          />
          <Button
            fullWidth
            mt="xl"
            radius="xl"
            onClick={() => {
              form.validate();
              setLoading(true);
              // if (form.isValid()) {
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
              // }
            }}
            loading={loading}
            disabled={loading}
            // type="submit"
          >
            <Title order={6}> {loading ? " " : "ثبت نام"}</Title>
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUp;
