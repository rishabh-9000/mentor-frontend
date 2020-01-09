import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

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

  const [mentors, setMentors] = useState([]);

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
                <ListItemText primary={mentor.name} />
                <Button variant='outlined' onClick={() => console.log(`HERE`)}>
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
      </div>
    );
  }
  return <div></div>;
}

export default Mentors;
