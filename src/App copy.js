import Button from './Button';
import styles from "./App.module.css";

import { useState, useEffect } from 'react';

function HelloMsg() {
  useEffect(() => {
    console.log("Create : On");
    return () => console.log("Destoyed : Off");

  }, []);

  return <h1>Hello</h1>;
}

function App() {
  const [counter, setValue] = useState(0);
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);

  const [showing, setShowing] = useState(false);
  const onClicked = () => {setShowing((prev) => !prev)};
  const onClick = () => {setValue((prev) => prev + 1)};
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
        
        
        <h1 className={styles.title}>counter : {counter}</h1>
        <Button txt={"Click"} onClick={onClick}/>
        
        <button onClick={onClicked}>{showing ? "Hide" : "Show"}</button>
        {showing ? <HelloMsg /> : null}
        
    </div>
  );
}

export default App;
