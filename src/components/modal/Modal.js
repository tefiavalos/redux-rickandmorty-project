import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import './modal.css'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    width: '40%',
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#eee', 
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: '#819792',
    fontFamily: 'Grandstander'
  },
  button: {
    margin: '0',
    width: 'auto',
    height: 'auto',
    padding: '10px 15px',
    borderRadius: '8px',
    fontSize: '15px',
    backgroundColor: '#819792'
  }
}));

export default function TransitionsModal({handleClose, open, name, type, gender, species, created, 
  image, episode, dimension}) {
  const classes = useStyles();
  
  return (
    <div>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>{name}</h2>
            {image ? 
            <img src={image}></img> : ""}
            <p>{type}</p>
            <p>{gender}</p>
            <p>{species}</p>
            <p>{created}</p>
            <p>{episode}</p>
            <p>{dimension}</p>
            <button className={classes.button} onClick={handleClose}>Close</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
