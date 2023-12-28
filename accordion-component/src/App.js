import { useState } from "react";
import "./styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() {
  const [curOpen, setIsOpen] = useState(null);

  return (
    <div className="accordion">
      {faqs.map((el, i) => (
        <Item curOpen={curOpen} onOpen={setIsOpen} el={el} i={i} />
      ))}
    </div>
  );
}

function Item({ el, i, curOpen, onOpen }) {
  const isOpen = i === curOpen; // true or false

  return (
    <div className={isOpen ? "item open" : "item"} onClick={() => onOpen(isOpen ? null : i)}>
      <p className="number">{i + 1}</p>
      <span className="title">{el.title}</span>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen ? <span className="content-box">{el.text}</span> : ""}
    </div>
  );
}
