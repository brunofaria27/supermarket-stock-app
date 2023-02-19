import * as React from "react";

import logo from "../../images/logo.png";
import { AppBar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#000000" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          style={{
            height: 50,
            width: 100,
            margin: 10,
          }}
          src={logo}
          alt="Logo do website"
        ></img>

        <Typography
          variant="h6"
          color="#EEEEEE"
          component="div"
          style={{
            fontSize: 15,
            paddingLeft: 20
          }}
        >
          CONTROLE DE ESTOQUE
        </Typography>
      </div>
    </AppBar>
  )
}