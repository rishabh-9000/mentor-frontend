import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

function AddTask() {
  const classes = useStyles();
  const inputLabel = React.useRef(null);

  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [mentors, setMentors] = useState([]);
  const [formData, setFormData] = useState({ task: '', mentor: '' });
  const { task, mentor } = formData;

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

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addTask = async () => {
    try {
      console.log(`HERE: ${JSON.stringify(formData)}`);
      const addedTask = await axios.post('/api/task', formData);
      if (addTask) {
        console.log(`Task Added: ${JSON.stringify(addedTask)}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (mentors) {
    return (
      <div>
        <TextField
          autoFocus
          style={{ width: '100%' }}
          label='Task'
          variant='outlined'
          name='task'
          value={task}
          onChange={e => onChange(e)}
        />
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel ref={inputLabel} id='demo-simple-select-outlined-label'>
            Mentor
          </InputLabel>
          <Select
            style={{ marginBottom: '10px' }}
            labelId='demo-simple-select-outlined-label'
            labelWidth={labelWidth}
            name='mentor'
            value={mentor}
            onChange={e => onChange(e)}
          >
            {mentors.map(mentor => {
              return (
                <MenuItem key={mentor._id} value={mentor._id}>
                  {mentor.name}
                </MenuItem>
              );
            })}
          </Select>
          <Button variant='outlined' color='primary' onClick={addTask}>
            Add
          </Button>
        </FormControl>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default AddTask;
