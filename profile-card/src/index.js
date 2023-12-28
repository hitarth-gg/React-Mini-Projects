import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <div className="card">
      <Avatar path="Avatar.jpg" />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar(props) {
  return <img className="avatar" src={props.path} alt="asd"></img>;
}

function Intro() {
  return (
    <div className="">
      <h2>hitarth.</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam itaque
        maxime corrupti quasi, atque illo optio, numquam porro, laudantium
        ducimus quisquam tempore facilis nesciunt harum perspiciatis quibusdam.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill skill="Pluggnb" emoji="🧁" color="lightblue" />
      <Skill skill="LoFi" emoji="🌸" color="pink" />
      <Skill skill="当生シ" emoji="🪻" color="#FFCCFF" />
      <Skill skill="やぶあ" emoji="🌺" color="lightgreen" />
    </div>
  );
}

function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.color }}>
      {props.skill} {props.emoji}
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
