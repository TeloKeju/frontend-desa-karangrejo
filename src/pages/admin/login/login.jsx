import { setCookie } from "cookies-next";
import { Button, Card, TextInput } from "flowbite-react";

const dataUsers = [
  {
    username: "@adminKarangrejo",
    password: "@adminKarangrejo_desa",
  },
  {
    username: "Posyandu@DesaKarangrejo25",
    password: "Posyandukarangrejo25",
  },
];

import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  }

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (validateForm()) {
      const foundUser = dataUsers.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password
      );

      if (foundUser) {
        alert("Login Berhasil");
        setCookie("username", formData.username, { maxAge: 60 * 60 * 24 });
        setCookie("password", formData.password, { maxAge: 60 * 60 * 24 });
        setCookie("token", "jsaishHiahih1HIHSiNSA", { maxAge: 60 * 60 * 24 });
        return navigate("/admin");
      } else {
        alert("Username atau Password salah");
      }
    }
  }

  return (
    <section
      className="flex justify-center items-center"
      style={{ height: "100vh" }}
    >
      <Card className="min-w-[400px]">
        <h1 className="text-xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="space-y-3">
            <div>
              <TextInput
                placeholder="Username"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <p className="text-red-500 text-sm text-start ps-1">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <TextInput
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm text-start ps-1">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          <div className="w-full mt-8">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default Login;
