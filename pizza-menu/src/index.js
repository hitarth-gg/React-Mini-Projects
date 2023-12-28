import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // we are using two curly braces in the `style = {{}}`because in react we have to define style props using a JS object, so the first set of curly braces is to enter the JS mode and the 2nd set of curly braces is to create an object.
  // return <h1 style={{color: 'red'}}>Fast React Pizza Co.</h1>;
  // OR we can do it like this as well :
  // const style = {color: 'red', fontSize: '32px', textTransform: 'uppercase'}

  const style = {};
  return (
    <header className="header">
      <h1 style={style}>पापी पिज्जा भंडार ltd.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;

  return (
    
    
    <main className="menu">
      <h2>Our Menu</h2>
      {numPizzas > 0 ? (

        // could've used <></> as well
        <React.Fragment key="asd">
        <p>Authentic desi cuisine. 
          <br></br>
           We no longer mix rat poison in our pizzas😔🥺.</p>
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
        </React.Fragment>
      ) : (
        <p>We're still working on our menu.</p>
      )}

      {/* <Pizza
        name="Pizza Spinaci"
        ingredients="Rotten Tomato, mozarella, spinach, and Rat Poison"
        photoName="pizzas/spinaci.jpg"
        price="10" // here we are using a `string`
      />
      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mushrooms, Toilet Cleaner"
        photoName="pizzas/funghi.jpg"
        price={12} // for numbers we have to use curly braces
      /> */}
    </main>
  );
}

// function Pizza(props) { // and then use props.pizzaObj.name
// OR use destructuring : 
function Pizza({pizzaObj}) { // destructuring the object directly // name should be the same as the argument that was passed originally
  console.log(pizzaObj); // → {name: 'Pizza Spinaci', ingredients: 'Tomato', ...} // basically it returned a JS object

  // if (pizzaObj.soldOut) return null;


  return (
    <div className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name}></img>
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>

        {/* {pizzaObj.soldOut ? <span>"SOLD OUT"</span> : <span>pizzaObj.price</span>} */}

        <span>{pizzaObj.soldOut ? "SOLD OUT":pizzaObj.price}</span>
      </div>
    </div>
  );
}

function Footer() {
  const openHour = 8;
  const closeHour = 21;
  const hour = new Date().getHours();
  const isOpen = hour >= openHour && hour < closeHour;

  // if (hour >= openHour && hour < closeHour)
  //     alert('We are open now!');
  // else
  //     alert('We are closed now !')

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour = {openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00{" "}
        </p>
      )}
      {/* {new Date().toLocaleTimeString()}. We're currently open. */}
    </footer>
  );
  // return React.createElement('footer', null, 'We\'re currently open!' )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function Order({closeHour, openHour}) {
  return (
    <div className="order">
      <p>We're Open from {openHour}:00 until {closeHour}:00</p>
      <button className="btn">Order</button>
    </div>
  );
}
