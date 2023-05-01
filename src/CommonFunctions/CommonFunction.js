import { Avatar, Tooltip } from "@mui/material";

export const filterMessages = (messages, i, userId) => {
  if (messages[i].sender._id === userId) {
    // diplay chat to right
    return (
      <div
        style={{
          padding: "6px 10px",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <span
          style={{
            backgroundColor: "blue",
            padding: "8px",
            borderRadius: "10px",
            color: "#fff",
          }}
        >
          {messages[i].content}
        </span>
      </div>
    );
  } else {
    return (
      <div
        style={{
          padding: "6px 10px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Tooltip title={messages[i].sender.name} placement="bottom">
          <span
            style={{
              backgroundColor: "red",
              padding: "8px",
              borderRadius: "10px",
              color: "#fff",
            }}
          >
            {messages[i].content}
          </span>
        </Tooltip>
      </div>
    );
  }
};
