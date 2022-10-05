import React, { useState, useContext, useEffect } from "react";

import { login } from "../components/lib/auth";
import Router, { useRouter } from "next/router";
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

function Login(props: any) {
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.push("/"); //redirect if you're logged in
    }
  }, []);

  function onChange(e: any) {
    updateData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <Paper withBorder shadow="md" p={30} mt={30} radius="lg">
        <form>
          <TextInput
            onChange={(e) => onChange(e)}
            name="identifier"
            required
            label="ایمیل"
            placeholder="ایمیل"
            type="email"
            mt="md"
            size="md"
            radius="lg"
          />

          <PasswordInput
            onChange={(e) => onChange(e)}
            name="password"
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
              console.log(data);
              setLoading(true);
              login(data.identifier, data.password)
                .then((res: any) => {
                  setLoading(false);
                  // set authed User in global context to update header/app state
                  appContext.setUser(res.data.user);
                })
                .catch((error) => {
                  console.log(error);
                  setError(error.response.data);
                  setLoading(false);
                });
            }}
            loading={loading}
            disabled={loading}
            // type="submit"
          >
            <Title order={6}> {loading ? " " : "ورود"}</Title>
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
export default Login;
