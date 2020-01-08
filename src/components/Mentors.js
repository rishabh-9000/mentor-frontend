import React, { useEffect } from 'react';
import axios from 'axios';

function Mentors() {
  // const [mentors, setMentors] = useState();
  useEffect(() => {
    getMentors();
    async function getMentors() {
      try {
        const response = await axios.get('/api/mentor');
        // setMentors(response.data);
        console.log(`RESPONSE: ${JSON.stringify(response.data.data.length)}`);
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    }
  }, []);

  return (
    <div>
      <h1>HI</h1>
    </div>
  );
}

export default Mentors;
