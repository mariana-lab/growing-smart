import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import Popular from "./components/Popular";
import Battle from "./components/Battle";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import {GiBattleAxe, GiPodium} from 'react-icons/gi';
import Counter from "./components/Hooks";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      battle: true,
    };

    this.changeMode = this.changeMode.bind(this);
  }

  changeMode(){
    this.setState({
      battle:false
    });
    this.setState((state)=>{
      this.state.battle = !state.battle;
    })
  }

  render() {
    const { battle } = this.state;
    console.log(this.state.battle);
    return (
      <div className="container">
        <Counter/>
        <label>
        <span>POPULAR </span>
          <Toggle
            defaultChecked={this.state.battle}
            icons={{
              checked: <GiPodium/>,
              unchecked: <GiBattleAxe />,
            }}
            onChange={this.changeMode}
          />
          <span> BATTLE</span>
        </label>
        {battle ? <Battle /> : <Popular />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
