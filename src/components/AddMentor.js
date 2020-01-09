import React, { useState } from 'react';
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

function AddMentor() {
  const classes = useStyles();
  const inputLabel = React.useRef(null);

  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

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

  const addMentor = async () => {
    try {
      const added = await axios.post('/api/mentor', formData);
      if (added) {
        console.log(`Added ${added.data.data.name}`);
        return;
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <span>All fields are required</span>
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
        <InputLabel ref={inputLabel} id='demo-simple-select-outlined-label'>
          Gender
        </InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          labelWidth={labelWidth}
          name='gender'
          value={gender}
          onChange={e => onChange(e)}
        >
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
        </Select>
      </FormControl>
      <Button variant='outlined' color='primary' onClick={addMentor}>
        Add
      </Button>
    </form>
  );
}

export default AddMentor;
