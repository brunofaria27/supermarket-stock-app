import * as React from "react";

import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { UserRe } from "../repositories/UserRepository";

export const Login = () => {
  const [requestError, setRequestError] = React.useState(false);

  async function recuperarCliente(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get("email") as string,
      senha: formData.get("password") as string,
    };

    try {
      const response = await UserRe.getUser(data.email, data.senha);
      console.log(response);

      if (response.status === 200) {
        window.location.href = "/";
        setRequestError(false);
      } else {
        setRequestError(true);
        setTimeout(() => {
          setRequestError(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setRequestError(true);
      setTimeout(() => {
        setRequestError(false);
      }, 5000);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={recuperarCliente}>
        <Card
          sx={{
            width: 500,
            backgroundColor: "#ffffff",
            boxShadow: "0px 0px 100px rgba(0, 0, 0, 2)",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              component="h4"
              display={"flex"}
              alignItems={"center"}
              fontSize={25}
              color={"black"}
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: 4,
              }}
            >
              LOGIN
            </Typography>

            {requestError && (
              <div id="alerta-request">
                <Alert severity="error">
                  <AlertTitle>
                    <strong>Erro!</strong>
                  </AlertTitle>
                  Nenhum usuário com essas credenciais foi encontrado.
                </Alert>
              </div>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              ENTRAR
            </Button>

            <Typography variant="body2" color="text.secondary" align="center">
              Você ainda não tem uma conta?{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button color="primary">Cadastre-se</Button>
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
