import { TextInput, Button } from "@mantine/core";
import s from "./Auth.module.scss";
import { useState } from "react";

export const AuthPage = (): React.ReactNode => {

    const [user, setUser] = useState({
        login: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleLogin = () => {
        if (user.login === "") {
            setError("Введите логин");
            return;
        }

        if (user.password === "") {
            setError("Введите пароль");
            return;
        }

        if (user.login === "admin" && user.password === "admin") {
            setError("");
            console.log("Вход выполнен");
        } else {
            setError("Неверный логин или пароль");
        }
    };

  return (
    <div className={s.root}>
      <TextInput 
        label="Логин" 
        placeholder="Введите ваш логин" 
        onChange={(event) => setUser({...user, login: event.currentTarget.value})}
        />
      <TextInput
        label="Пароль"
        placeholder="Введите ваш пароль"
        type="password"
        onChange={(event) => setUser({...user, password: event.currentTarget.value})}
      />

        <div className={s.error}>{error}</div>

        <Button onClick={handleLogin} color="teal" className={s.button}>
            Войти
        </Button>
    </div>
  );
};
