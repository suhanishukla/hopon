import React from 'react';
import {useEffect, useState} from 'react'

const App = () => {

    const [users,setUsers] = useState(null)
    useEffect(()=> {
        const fetchUsers = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()
            const rushilUsers = json.filter(user => user.first_name.toLowerCase() === 'rushil'); //filter for ava shah
            if (response.ok)
            {
                setUsers(rushilUsers)
            }
        }
        fetchUsers()
    }, [])


    return (
        <div>
            <h1>App</h1>
            <div className='home'>
                {users && users.map((users) => (
                    <p key={users._id}>{users.first_name} {users.last_name}</p>
                ))}
            </div>
        </div>
    );
}

export default App;