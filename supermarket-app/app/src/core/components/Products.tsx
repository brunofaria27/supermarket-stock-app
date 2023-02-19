import * as React from "react";

import {
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

export const Products = () => {
  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                PREÇO
              </TableCell>
              <TableCell style={{ color: "#A7A6A6" }} align="right">
                AÇÕES
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key="teste"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                style={{ color: "#A7A6A6" }}
                component="th"
                scope="row"
              >
                teste
              </TableCell>
              <TableCell style={{ color: "#A7A6A6" }} align="right">
                teste
              </TableCell>
              <TableCell style={{ color: "#A7A6A6" }} align="right">
                teste
              </TableCell>
              <TableCell style={{ color: "#A7A6A6" }} align="right">
                teste
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="Ações do produto"
                  style={{ color: "#A7A6A6" }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </TableRow>
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
            📋 <strong>Cadastrar novo produto</strong>
          </Typography>
          <form /*onSubmit={}*/>
            <FormControl fullWidth margin="normal">
              <InputLabel style={{ color: "#A7A6A6" }} htmlFor="nome-produto">
                Nome do produto
              </InputLabel>
              <Input
                style={{ color: "#A7A6A6" }}
                id="nome-produto"
                inputProps={{ maxLength: 15 }}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel
                style={{ color: "#A7A6A6" }}
                htmlFor="descricao-produto"
              >
                Descrição
              </InputLabel>
              <Input
                style={{ color: "#A7A6A6" }}
                id="descricao-produto"
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
                type="number"
                inputProps={{ min: 0 }}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel style={{ color: "#A7A6A6" }} htmlFor="preco-produto">
                Preço
              </InputLabel>
              <Input
                style={{ color: "#A7A6A6" }}
                id="preco-produto"
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
