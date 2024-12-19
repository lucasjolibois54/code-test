import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function App() {
  const [data, setData] = useState(null);
    const [jokeSearchQuery, setJokeSearchQuery] = useState('');

  const url = `https://icanhazdadjoke.com/search?term=${jokeSearchQuery}`;

  useEffect(() => {
    axios
      .get(url, { headers: { Accept: 'application/json' } })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [jokeSearchQuery, url]);

  return (
    <div className="App">
        <input 
          type="text" 
          placeholder="Search for a joke" 
          value={jokeSearchQuery} 
          onChange={(e) => setJokeSearchQuery(e.target.value)} 
        />
      <div>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}</div>
    </div>
  );
}

export default App;
