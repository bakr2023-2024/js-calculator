import React from "react";
import "./App.css";
class Display extends React.Component {
  render() {
    return (
      <div id="displayScreen">
        <p id="formula">{this.props.formula}</p>
        <p id="display">{this.props.display}</p>
      </div>
    );
  }
}
class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(event) {
    let input = event.target.textContent;
    if (input === "AC") {
      this.props.updateFormula(input, 2);
      this.props.updateDisplay(input, 2);
    } else if (input === "=") {
      let copy = this.props.formula;

      let check1 = /[^0-9.]$/;
      let check3 = /\d+[/*+]+-\d+/;
      let check4 = /\d+([/*+-]+)\d+/;
      copy = copy.replace(check1, "");
      let result;
      if (check4.test(copy) && !check3.test(copy)) {
        let junk = copy.match(check4)[1];
        copy = copy.replace(junk, junk.slice(-1));
      }
      try {
        result = String(this.props.evaluate(copy));
        this.props.updateFormula(result, 1);
        this.props.updateDisplay(result, 1);
      } catch (e) {}
    } else {
      let copy = this.props.display;
      let check2 = /\d*\.\d*$/;
      let check3 = /\d/;
      let check4 = /[/*+-]/;
      if (
        (check2.test(copy) && input === ".") ||
        (copy.length > 24 && check3.test(input))
      )
        return;
      let invalids = [
        "*/",
        "/*",
        "-/",
        "-*",
        "+*",
        "+/",
        "..",
        "++",
        "//",
        "**",
      ];
      if (input === "x") input = "*";
      if (invalids.some((i) => copy.slice(-1) + input === i)) {
        input = copy.substring(0, copy.length - 1) + input;
        this.props.updateFormula(input, 1);
        this.props.updateDisplay(input, 1);
      } else {
        if (check4.test(copy)) {
          this.props.updateFormula(input, 0);
          this.props.updateDisplay(input, 1);
        } else {
          this.props.updateFormula(input, 0);
          this.props.updateDisplay(input, 0);
        }
      }
    }
  }
  render() {
    return (
      <div id="buttons">
        <button onClick={this.handleInput} className="cell wideCell" id="clear">
          AC
        </button>
        <button onClick={this.handleInput} className="cell" id="divide">
          /
        </button>
        <button onClick={this.handleInput} className="cell" id="multiply">
          x
        </button>

        <button onClick={this.handleInput} className="cell" id="seven">
          7
        </button>
        <button onClick={this.handleInput} className="cell" id="eight">
          8
        </button>

        <button onClick={this.handleInput} className="cell" id="nine">
          9
        </button>
        <button onClick={this.handleInput} className="cell" id="subtract">
          -
        </button>

        <button onClick={this.handleInput} className="cell" id="four">
          4
        </button>
        <button onClick={this.handleInput} className="cell" id="five">
          5
        </button>
        <button onClick={this.handleInput} className="cell" id="six">
          6
        </button>
        <button onClick={this.handleInput} className="cell" id="add">
          +
        </button>
        <button onClick={this.handleInput} className="cell" id="one">
          1
        </button>
        <button onClick={this.handleInput} className="cell" id="two">
          2
        </button>
        <button onClick={this.handleInput} className="cell" id="three">
          3
        </button>

        <button
          onClick={this.handleInput}
          className="cell tallCell"
          id="equals"
        >
          =
        </button>
        <button
          onClick={this.handleInput}
          className="cell wideCell translateUp"
          id="zero"
        >
          0
        </button>
        <button
          onClick={this.handleInput}
          className="cell translateUp"
          id="decimal"
        >
          .
        </button>
      </div>
    );
  }
}
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: "",
      display: "0",
    };
    this.updateFormula = this.updateFormula.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }
  updateFormula(input, option = 0) {
    this.setState((state) => ({
      formula:
        option === 2
          ? ""
          : option === 1 || state.formula === "0"
          ? input
          : state.formula + input,
    }));
  }
  updateDisplay(input, option = 0) {
    this.setState((state) => ({
      display:
        option === 2
          ? "0"
          : option === 1 || state.display === "0"
          ? input
          : state.display + input,
    }));
  }
  render() {
    return (
      <div id="container">
        <Display formula={this.state.formula} display={this.state.display} />
        <Buttons
          updateFormula={this.updateFormula}
          updateDisplay={this.updateDisplay}
          evaluate={this.props.evaluate}
          formula={this.state.formula}
          display={this.state.display}
        />
      </div>
    );
  }
}

export default Container;
