import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => setUserData(data));

    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((data) => setUserRepos(data));
  };

  const handleReset = () => {
    setUsername('');
    setUserData(null);
    setUserRepos([]);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          GitHub username:
          <input type="text" value={username} onChange={handleInputChange} />
        </label>
        <button type="submit">Search!</button>
      </form>

      {userData && (
        <div>
          <h2>{userData.name}</h2>
          <img src={userData.avatar_url} alt={`${userData.name}'s avatar`} />
          <h3>LOCATION:</h3>
          <p>{userData.location}</p>
          <h3>BIO:</h3>
          <p>{userData.bio}</p>

          <h3>REPOSITORIES:</h3>
          <ul>
            {userRepos.map((repo) => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleReset}>Reset</button>
    </div>
  );

}

export default App;