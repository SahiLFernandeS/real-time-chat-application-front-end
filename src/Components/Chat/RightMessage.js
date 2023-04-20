import { Box, Stack, Typography } from "@mui/material";
import React from "react";

function RightMessage(props) {
  const { Content } = props;
  return (
    <Stack
      sx={{
        color: "#fff",
        alignItems: "flex-end",
        // width: "25%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgb(34, 212, 90)",
          margin: "10px",
          padding: "5px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="body2">{Content}</Typography>
      </Box>
    </Stack>
  );
}

export default RightMessage;
