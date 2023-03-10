import * as React from "react";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Estoque } from "../../typescript";
import { EstoqueRe } from "../repositories/EstoqueRepository";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#262626",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Products = (props: { produtos: Estoque[], refreshProducts: () => void }) => {
  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Request Add
  const [requestSuccess, setRequestSuccess] = React.useState(false);
  const [requestError, setRequestError] = React.useState(false);

  // Request Remove
  const [requestSuccessRmv, setRequestSuccessRmv] = React.useState(false);
  const [requestErrorRmv, setRequestErrorRmv] = React.useState(false);

  /********************************************************/
  // Remover o produto
  async function excluirProduto(id: string | undefined) {
    try {
      await EstoqueRe.deleteProducts(id)

      setRequestSuccessRmv(true);

      setTimeout(() => {
        setRequestSuccessRmv(false);
      }, 5000);

      props.refreshProducts()
    } catch (error) {
      console.error(error);
      setRequestErrorRmv(true);
      setTimeout(() => {
        setRequestErrorRmv(false);
      }, 5000);
    }
  }

  // Adicionar um novo produto no banco
  async function adicionarItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget);

    const data: Estoque = {
      nome: formData.get("nome") as string,
      descricao: formData.get("descricao") as string,
      preco: Number(formData.get("preco")),
      categoria: formData.get("categoria") as string,
      quantidade: Number(formData.get("quantidade")),
    };

    try {
      await EstoqueRe.addProducts(data)

      handleClose();

      setRequestSuccess(true);

      setTimeout(() => {
        setRequestSuccess(false);
      }, 5000);

      props.refreshProducts();
    } catch (error) {
      console.log(error);
      handleClose();
      setRequestError(true);
      setTimeout(() => {
        setRequestError(false);
      }, 5000);
    }
  }

  /********************************************************/

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
      }}
    >
      <div
        id="alerta-request"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          marginLeft: 4,
          marginRight: 4,
        }}
      >
        {requestSuccess && (
          <div id="alerta-request">
            <Alert severity="success">
              <AlertTitle>
                <strong>Adicionado</strong>
              </AlertTitle>
              O produto foi cadastrado com sucesso.
            </Alert>
          </div>
        )}

        {requestError && (
          <div id="alerta-request">
            <Alert severity="error">
              <AlertTitle>
                <strong>Adicionado</strong>
              </AlertTitle>
              Tivemos um erro ao tentar adicionar o item.
            </Alert>
          </div>
        )}

        {requestSuccessRmv && (
          <div id="alerta-request">
            <Alert severity="success">
              <AlertTitle>
                <strong>Removido</strong>
              </AlertTitle>
              O produto foi removido com sucesso.
            </Alert>
          </div>
        )}

        {requestErrorRmv && (
          <div id="alerta-request">
            <Alert severity="error">
              <AlertTitle>
                <strong>Removido</strong>
              </AlertTitle>
              Tivemos um erro ao tentar remover o item.
            </Alert>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          marginLeft: 4,
          marginRight: 4,
        }}
      >
        <Typography style={{ color: "#A7A6A6" }} variant="overline">
          Adicionar novo produto
        </Typography>
        <IconButton
          style={{ color: "#A7A6A6" }}
          onClick={handleOpen}
          aria-label="Adicionar produto"
        >
          <AddCircleIcon />
        </IconButton>
      </div>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 1)",
          borderRadius: 3,
        }}
      >
        <Table aria-label="simple table" style={{ backgroundColor: "#000000" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#A7A6A6" }}>PRODUTO</TableCell>
              <TableCell style={{ color: "#A7A6A6" }} align="right">
                CATEGORIA
              </TableCell>
              <TableCell style={{ color: "#A7A6A6" }} align="right">
                QUANTIDADE
              </TableCell>
              <TableCell style={{ color: "#A7A6A6" }} align="right">
                PRE??O
              </TableCell>
              <TableCell style={{ color: "#A7A6A6" }} align="right">
                A????ES
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.produtos.length === 0 ? (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{ color: "#A7A6A6" }}
                  component="th"
                  scope="row"
                >
                  <strong>Nenhum produto foi encontrado!</strong>
                </TableCell>
              </TableRow>
            ) : (
              props.produtos.map((value) => (
                <TableRow
                  key={value._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{ color: "#A7A6A6" }}
                    component="th"
                    scope="row"
                  >
                    {value.nome}
                  </TableCell>
                  <TableCell style={{ color: "#A7A6A6" }} align="right">
                    {value.categoria}
                  </TableCell>
                  <TableCell style={{ color: "#A7A6A6" }} align="right">
                    {value.quantidade}
                  </TableCell>
                  <TableCell style={{ color: "#A7A6A6" }} align="right">
                    R$ {value.preco}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="A????es do produto"
                      style={{ color: "#A7A6A6" }}
                      onClick={() => excluirProduto(value._id)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ color: "#A7A6A6" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            ???? <strong>Cadastrar novo produto</strong>
          </Typography>
          <form onSubmit={adicionarItem}>
            <FormControl fullWidth margin="normal">
              <InputLabel style={{ color: "#A7A6A6" }} htmlFor="nome-produto">
                Nome do produto
              </InputLabel>
              <Input
                style={{ color: "#A7A6A6" }}
                id="nome-produto"
                name="nome"
                inputProps={{ maxLength: 15 }}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel
                style={{ color: "#A7A6A6" }}
                htmlFor="descricao-produto"
              >
                Descri????o
              </InputLabel>
              <Input
                style={{ color: "#A7A6A6" }}
                id="descricao-produto"
                name="descricao"
                inputProps={{ maxLength: 150 }}
                multiline
                rows={3}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel
                style={{ color: "#A7A6A6" }}
                htmlFor="categoria-produto"
              >
                Categoria
              </InputLabel>
              <Input
                style={{ color: "#A7A6A6" }}
                id="categoria-produto"
                name="categoria"
                inputProps={{ maxLength: 15 }}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel
                style={{ color: "#A7A6A6" }}
                htmlFor="quantidade-produto"
              >
                Quantidade
              </InputLabel>
              <Input
                style={{ color: "#A7A6A6" }}
                id="quantidade-produto"
                name="quantidade"
                type="number"
                inputProps={{ min: 0 }}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel style={{ color: "#A7A6A6" }} htmlFor="preco-produto">
                Pre??o
              </InputLabel>
              <Input
                style={{ color: "#A7A6A6" }}
                id="preco-produto"
                name="preco"
                startAdornment={
                  <InputAdornment position="start">R$</InputAdornment>
                }
                type="number"
                inputProps={{ min: 0 }}
                required
              />
            </FormControl>
            <div
              style={{
                marginTop: 25,
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
              }}
            >
              <div>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  sx={{ marginRight: 3 }}
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
              </div>
              <Button type="submit" variant="contained" color="primary">
                Cadastrar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
