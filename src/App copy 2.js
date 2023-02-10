import styles from "./App.module.css";

import { useState, useEffect } from 'react';



function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);

  

  const onChange = (event) => {setToDo(event.target.value)};
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray])
    setToDo("");
    console.log("To Do : ",  toDo);

   
  };

  console.log("render : START", toDos);
  //console.log("render",  keyword);

  const isRunOnlyOnce = () => {
    console.log("isRunOnlyOnce");
  };

  

  //useEffect(isRunOnlyOnce, []);
  useEffect(() => {
    console.log("isRunOnlyOnce");
  }, []);

  useEffect(() => {
    if (toDo !== "" && toDo.length > 5) {
      console.log("render....",  toDo);
    }   
  }, [toDo]);


  // Coins API
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    //fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setCoins(data);
      setLoading(false);
    });
  }, []);



  return (
    <div>
        <h1 className={styles.title}>To Do List (count : {toDos.length})</h1>
        <form onSubmit={onSubmit} >
          <input type="text" placeholder='Write Your To Do...' onChange={onChange} value={toDo} />
          <button>Add To Do</button>
        </form>
        <hr />
        <ul>
          {toDos.map((item, index) => (
              <li key={index}>{item}</li>
          ))}
        </ul>


        <hr />
        <h1 className={styles.title}>Coin List (count : {coins.length})</h1>
        {loading ? <strong>Data Loading...</strong> : 
        (
          <div>
          <select>
            {coins.map((coin, id) => (
                <option key={id}>{coin.name} ({coin.symbol}) :  ${coin.quotes.USD.price} USD</option>
            ))}
          </select>

          <ul>
            {coins.map((coin, id) => (
                <li key={id}>{coin.name} ({coin.symbol}) :  ${coin.quotes.USD.price} USD</li>
            ))}
          </ul>
        </div>
        
        )}
        
        
        
    </div>
  );
}

export default App;
