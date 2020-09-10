import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from 'prop-types'
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
    backgroundColor: '#D64045', 
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: '#eee',
    fontFamily: 'Grandstander',
    fontSize: '20px',
  },
  button: {
    margin: '0',
    width: 'auto',
    height: 'auto',
    padding: '10px 15px',
    borderRadius: '8px',
    fontSize: '15px',
    backgroundColor: '#eee',
    color: '#D64045'
  }
}));

export default function TransitionsModal({handleClose, open, name, type, gender, species, created, 
  image, episode, dimension, residents, episodeCharacters}) {
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
            <img src={image} className='img-modal' alt={name}></img> : ""}
            {type ? <p className='margin-p'>Type: {type}</p> : ""}
            {gender ? <p className='margin-p'>Gender: {gender}</p> : ""}
            {species ? <p className='margin-p'>Species: {species}</p> : ""}
            {created ? <p className='margin-p'>Created: {created}</p> : ""}
            {episode ? <p className='margin-p'>Episode: {episode}</p> : ""}
            {dimension ? <p className='margin-p'>Dimension: {dimension}</p> : ""}
            
            {residents && 
            <>
            <p>Residents:</p>
            <p className='margin-p'>{residents.map((resident, i)=>{
              if(i<5){
              return(
                `${resident.name} - `
              )}
            })}</p>
            </>}
            
            {episodeCharacters && 
            <>
            <p>Characters:</p>
            <p className='margin-p'>{episodeCharacters.map((char, i)=>{
              if(i<5){
              return(
                `${char.name} - `
              )}
            })}</p>
            </>}
            <button className={classes.button} onClick={handleClose}>Close</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

TransitionsModal.propTypes = {
  handleClose: PropTypes.func, 
  open: PropTypes.bool, 
  name: PropTypes.string, 
  type: PropTypes.string, 
  gender: PropTypes.string, 
  species: PropTypes.string, 
  created: PropTypes.string, 
  image: PropTypes.string, 
  episode: PropTypes.string, 
  dimension: PropTypes.string, 
  residents: PropTypes.array, 
  episodeCharacters: PropTypes.array
}