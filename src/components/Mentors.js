import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

function Mentors() {
  const classes = useStyles();

  const [singleMentor, setSingleMentor] = useState();
  const [mentors, setMentors] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = useState([]);
  const [mentorDialog, setMentorDialog] = React.useState(false);

  const handleClickOpen = (e, m) => {
    setFormData(m);
    setSingleMentor(m);
    console.log(`HERE: ${JSON.stringify(m)}`);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getMentors();
    async function getMentors() {
      try {
        const response = await axios.get('/api/mentor');
        setMentors(response.data.data);
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    }
  }, [mentors]);

  const deleteMentor = async id => {
    try {
      const deleted = await axios.delete(`/api/mentor/${id}`);
      if (deleted) {
        console.log(`Deleted: ${deleted.data.data.id}`);
        return;
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    dateOfBirth: '',
    gender: ''
  });

  const { name, email, mobile, dateOfBirth, gender } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const getMentor = async (e, m) => {
    try {
      const taskResponse = await axios.get(`/api/task/${m._id}`);
      const mentorResponse = await axios.get(`/api/mentor/${m._id}`);

      setTasks(taskResponse.data.data);
      setSingleMentor(mentorResponse.data.data);

      setMentorDialog(true);
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const updateMentor = async id => {
    try {
      console.log(`ID: ${id}`);
      const updated = await axios.post(`/api/mentor/${id}`, formData);
      if (updated) {
        console.log(`Updated ${updated.data.data.id}`);
        setOpen(false);
        return;
      }
      setOpen(false);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  if (mentors) {
    return (
      <div>
        <List
          component='nav'
          className={classes.root}
          aria-label='mailbox folders'
        >
          {mentors.map(mentor => {
            return (
              <ListItem divider key={mentor._id}>
                <ListItemText
                  primary={mentor.name}
                  onClick={e => getMentor(e, mentor)}
                />
                <Button
                  variant='outlined'
                  onClick={e => {
                    handleClickOpen(e, mentor);
                  }}
                >
                  Update
                </Button>
                <DeleteOutlinedIcon
                  style={{ paddingLeft: '10px' }}
                  onClick={() => deleteMentor(mentor._id)}
                />
              </ListItem>
            );
          })}
        </List>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Update</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              style={{ width: '96%' }}
              label='Name'
              variant='outlined'
              name='name'
              value={name}
              onChange={e => onChange(e)}
            />
            <TextField
              style={{ width: '96%' }}
              label='Email'
              variant='outlined'
              name='email'
              value={email}
              onChange={e => onChange(e)}
            />
            <TextField
              style={{ width: '96%' }}
              label='Mobile'
              variant='outlined'
              name='mobile'
              value={mobile}
              onChange={e => onChange(e)}
            />
            <TextField
              style={{ width: '96%' }}
              label='Date Of Birth'
              variant='outlined'
              name='dateOfBirth'
              value={dateOfBirth}
              onChange={e => onChange(e)}
            />
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel
                // ref={inputLabel}
                id='demo-simple-select-outlined-label'
              >
                Gender
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                // labelWidth={labelWidth}
                name='gender'
                value={gender}
                onChange={e => onChange(e)}
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => updateMentor(singleMentor._id)}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          onClose={() => setMentorDialog(false)}
          aria-labelledby='simple-dialog-title'
          open={mentorDialog}
        >
          <DialogTitle id='simple-dialog-title'>Mentor Info</DialogTitle>
          {singleMentor ? (
            <DialogContentText>
              <span>Name: {singleMentor.name}</span>
              <br />
              <span>Email: {singleMentor.email}</span>
              <br />
              <span>Mobile: {singleMentor.mobile}</span>
              <br />
              <span>Date Of Birth: {singleMentor.dateOfBirth}</span>
              <br />
              <span>Gender: {singleMentor.gender}</span>
              <br />
            </DialogContentText>
          ) : (
            <div></div>
          )}
          <h4>TASKS</h4>
          <List
            component='nav'
            className={classes.root}
            aria-label='mailbox folders'
          >
            {tasks.map(task => {
              return (
                <ListItem divider key={task._id}>
                  <ListItemText primary={task.task} />
                </ListItem>
              );
            })}
          </List>
        </Dialog>
      </div>
    );
  }
  return <div></div>;
}

export default Mentors;
