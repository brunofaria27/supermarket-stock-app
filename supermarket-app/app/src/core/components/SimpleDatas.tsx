import * as React from "react";

import SsidChartIcon from "@mui/icons-material/SsidChart";
import { Card, CardContent, Typography } from "@mui/material";

export const SimpleDatas = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        padding: 10,
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        display={"flex"}
        alignItems={"center"}
        fontSize={25}
        color={"white"}
      >
        <SsidChartIcon sx={{ width: 50, height: 50, paddingRight: 3 }} />
        VISÃO GERAL
      </Typography>

      <div
        style={{
          marginTop: 15,
          display: "flex",
          alignItems: "center",
          padding: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              backgroundColor: "#000000",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 1)",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="#A7A6A6">
                <strong>Produtos cadastrados: </strong>
              </Typography>
              <Typography variant="body2" color="#A7A6A6">
                <strong>Quantidade de itens no estoque: </strong>
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: 50,
          }}
        >
          <Card
            sx={{
              backgroundColor: "#000000",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 1)",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="#A7A6A6">
                <strong>Produtos com o estoque zerado: </strong>
              </Typography>
              <Typography variant="body2" color="#A7A6A6">
                <strong>Produtos com o estoque mínimo: </strong>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
