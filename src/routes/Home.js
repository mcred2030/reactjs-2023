import styles from "../App.module.css";
import Movie from "../components/Movie";

import { useState, useEffect } from 'react';



function Home() {
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

 

  //useEffect(isRunOnlyOnce, []);
  useEffect(() => {
    console.log("isRunOnlyOnce");
  }, []);

  useEffect(() => {
    if (toDo !== "" && toDo.length > 5) {
      console.log("render....",  toDo);
    }   
  }, [toDo]);


  // Movies API
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    // Type 1
    //const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year");
    //const json = await response.json();
    // Type 2
    const json = await (await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year")).json();

    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies()
  }, []);
  console.log(movies);



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
        <h1 className={styles.title}>Movie List (count : {movies.length})</h1>
        {loading ? <strong>Movies Data Loading...</strong> : 
        (
          <div>
              {movies.map((movie) => (
                  <Movie key={movie.id} id={movie.id} coverImg={movie.medium_cover_image} title={movie.title} summary={movie.summary} genres={movie.genres} url={movie.url} />
                   
                  
              ))}
          </div>
        
        )}
        
        
        
    </div>
  );
}

export default Home;
