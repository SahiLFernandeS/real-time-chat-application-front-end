import { Box, Stack, Typography } from "@mui/material";
import React from "react";

function LeftMessage(props) {
  const { Content } = props;
  return (
    <Stack
      sx={{
        color: "#fff",
        alignItems: "flex-start",
        width: "min-content",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgb(34, 112, 90)",
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

export default LeftMessage;
