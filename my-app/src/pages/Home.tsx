import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function App() {
  const [data, setData] = useState(null);
    const jokeSearchQuery = 'dog';

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
  }, []);

  return (
    <div className="App">
      <div>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}</div>
    </div>
  );
}

export default App;
