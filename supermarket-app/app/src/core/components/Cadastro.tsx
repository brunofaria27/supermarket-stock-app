import * as React from "react";

import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { UserRe } from "../repositories/UserRepository";
import { User } from "../../typescript";

export const Cadastro = () => {
  const [cpf, setCpf] = React.useState("");
  const [cpfRaw, setCpfRaw] = React.useState("");
  const [cpfError, setCpfError] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newEmail = event.target.value;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (emailRegex.test(newEmail)) {
      setEmail(newEmail);
      setEmailError(false);
    } else {
      setEmail("");
      setEmailError(true);
    }
  }

  function handleCpfChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newCpf = event.target.value.replace(/\D/g, "");
    setCpfRaw(newCpf);

    if (cpfValidator.isValid(newCpf)) {
      setCpfError(false);
    } else {
      setCpfError(true);
    }
  }

  function formatCpf(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  React.useEffect(() => {
    if (cpfRaw.length === 11) {
      const formattedCpf = formatCpf(cpfRaw);
      setCpf(formattedCpf);
    } else {
      setCpf(cpfRaw);
    }
  }, [cpfRaw]);

  /***********************************/
  const [requestSuccess, setRequestSuccess] = React.useState(false);
  const [requestSuccessC, setRequestSuccessC] = React.useState(false);
  const [requestError, setRequestError] = React.useState(false);

  // Adicionar usuário
  async function adicionarCliente(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: User = {
      nome: formData.get("nome") as string,
      cpf: formData.get("cpf") as string,
      email: formData.get("email") as string,
      senha: formData.get("senha") as string,
    };

    try {
      const response = await UserRe.addUser(data);
      if (response.status === 200) {
        setRequestSuccess(true);
        setTimeout(() => {
          setRequestSuccess(false);
          window.location.href = "/login";
        }, 5000);
      } else if (response.status === 400) {
        setRequestSuccessC(true);
        setTimeout(() => {
          setRequestSuccessC(false);
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
            CADASTRO
          </Typography>

          {requestSuccessC && (
            <div id="alerta-request">
              <Alert severity="warning">
                <AlertTitle>
                  <strong>Que pena!</strong>
                </AlertTitle>
                Já existe esse <strong>email</strong> ou <strong>cpf</strong>{" "}
                cadastrados no site.
              </Alert>
            </div>
          )}

          {requestSuccess && (
            <div id="alerta-request">
              <Alert severity="success">
                <AlertTitle>
                  <strong>Adicionado</strong>
                </AlertTitle>
                O usuário foi cadastrado com sucesso. Você será redirecionado em
                5 segundos.
              </Alert>
            </div>
          )}

          {requestError && (
            <div id="alerta-request">
              <Alert severity="error">
                <AlertTitle>
                  <strong>Erro!</strong>
                </AlertTitle>
                Não foi possível criar o usuário.
              </Alert>
            </div>
          )}

          <div style={{ marginLeft: 30, marginRight: 30 }}>
            <form onSubmit={adicionarCliente}>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="nome-completo">Nome completo *</InputLabel>
                <Input
                  id="nome-completo"
                  name="nome"
                  inputProps={{ maxLength: 40 }}
                  required
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="cpf">CPF *</InputLabel>
                <Input
                  id="cpf"
                  name="cpf"
                  inputProps={{ maxLength: 14 }}
                  onChange={handleCpfChange}
                  value={cpf}
                  required
                />
                {cpfError && (
                  <Typography color="error" variant="caption">
                    CPF inválido.
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">Email *</InputLabel>
                <Input
                  id="email"
                  name="email"
                  onChange={handleEmailChange}
                  required
                />
                {emailError && (
                  <Typography color="error" variant="caption">
                    Email inválido.
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="senha">Senha *</InputLabel>
                <Input type="password" id="senha" name="senha" required />
              </FormControl>

              <div
                style={{
                  marginTop: 25,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      sx={{ marginRight: 3 }}
                    >
                      Cancelar
                    </Button>
                  </Link>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={emailError || cpfError || requestSuccess}
                >
                  Cadastrar
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
