import React from "react";
import { strapiRegister } from "../components/lib/auth";
import Router from "next/router";
import { Container, Grid, Button, Group, Box, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
class SignUp extends React.Component {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = {
      data: {
        email: "",
        username: "",
        password: "",
      },
      loading: false,
      error: "",
    };
  }
  onChange(propertyName: any, event: any) {
    const { data } = this.state;
    data[propertyName] = event.target.value;
    this.setState({ data });
  }
  onSubmit() {
    const {
      data: { email, username, password },
    } = this.state;
    this.setState({ loading: true });

    strapiRegister(username, email, password)
      ?.then(() => this.setState({ loading: false }))
      .catch((e) => this.setState({ error: e }));
  }

  render(): React.ReactNode {
    const { error } = this.state;
    return (
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form>
          <TextInput
            onChange={this.onChange.bind(this, "username")}
            withAsterisk
            label="نام کاربری"
            placeholder="نام کاربری"
            type="text"
          />
          <TextInput
            onChange={this.onChange.bind(this, "email")}
            withAsterisk
            label="ایمیل"
            placeholder="ایمیل"
            type="email"
          />
          <TextInput
            onChange={this.onChange.bind(this, "password")}
            withAsterisk
            label="رمز عبور"
            placeholder="رمز عبور"
            type="password"
          />
          <Button onClick={this.onSubmit.bind(this)} type="submit">
            ثبت نام
          </Button>
        </form>
      </Box>
    );
  }
}

export default SignUp;
