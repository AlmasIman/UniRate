import * as React from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Warning = (props) => {

  return (
    <>
      <div style={{position:'fixed',width:'100%',display: 'flex', justifyContent: 'center', zIndex:'1000'}}>
      <Collapse in={true}>
      <Alert
        severity="warning"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={props.onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {props.message}
      </Alert>
    </Collapse>
      </div>
    </>
  );
};

export default Warning;