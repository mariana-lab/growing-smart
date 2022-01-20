import React from "react";

 function getExpensiveCount() {
    console.log("Calculating initial count");
    return 999;
  }
  
  export default function Counter() {
    const [count, setCount] = React.useState(getExpensiveCount());
  
    const increment = () => setCount((count) => count + 1);
    const decrement = () => setCount((count) => count - 1);
  
    return (
      <React.Fragment>
        <button onClick={decrement}>-</button>
        <h1>{count}</h1>
        <button onClick={increment}>+</button>
      </React.Fragment>
    );
  }