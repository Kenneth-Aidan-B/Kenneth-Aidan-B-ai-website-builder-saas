import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamDashboard = ({ userId }) => {
  const [team, setTeam] = useState(null);
  const [newMember, setNewMember] = useState('');

  useEffect(() => {
    async function loadTeam() {
      const res = await axios.get(`http://localhost:5000/api/teams/user/${userId}`);
      setTeam(res.data);
    }
    loadTeam();
  }, [userId]);

  const addMember = async () => {
    await axios.post('http://localhost:5000/api/teams/add-member', {
      teamId: team._id,
      email: newMember,
      userId: 'firebase_user_id_of_member'
    });
    alert('Member Added');
  };

  return (
    <div>
      <h2>Team: {team?.teamName}</h2>
      <h3>Team Members:</h3>
      <ul>
        {team?.members.map(m => <li key={m.userId}>{m.email}</li>)}
      </ul>

      <input placeholder="New Member Email" onChange={e => setNewMember(e.target.value)} />
      <button onClick={addMember}>Add Member</button>
    </div>
  );
};

export default TeamDashboard;
