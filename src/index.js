import ReactDOM from "react-dom";
import Container from "./App";
import { evaluate } from "mathjs";
console.log(evaluate(""));
//console.log(evaluate('9-'))
//console.log(evaluate('9+'))
//console.log(evaluate('9/'))

ReactDOM.render(
  <Container evaluate={evaluate} />,
  document.getElementById("hookContainer")
);
