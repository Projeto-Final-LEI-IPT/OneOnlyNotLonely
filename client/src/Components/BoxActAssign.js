import React, { Component } from "react";
import { Button, Table, Form } from "reactstrap";
import AppNavBar from "./AppNavBar.js";

class boxActAssign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elder: [],
      act: [],
      box: 0,
      boxtheme: "",
      assignedActs: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    let { elderid, boxid, boxtheme } = this.props.match.params;
    let elder = await (
      await fetch("http://localhost:6080/utente/" + elderid)
    ).json();
    let acts = await (await fetch("http://localhost:6080/activity")).json();
    this.setState({
      box: boxid,
      elder: elder,
      act: acts,
      boxtheme: boxtheme,
    });
  }
  async handleSubmit(evt) {
    let box = parseInt(this.state.box);
    let uri = "http://localhost:6080/box/" + box + "/actList";
    await fetch(uri, {
      method: "POST",
      body: JSON.stringify(this.state.assignedActs),
    });
    this.props.history.push("/map");
  }

  async handleChange(evt) {
    let assignedActs = evt.target.value;
    await this.setState({assignedActs});
    console.log(this.state.assignedActs);
    this.handleSubmit();
  }

  render() {
    const { elder } = this.state;
    let likes = elder.likes;
    let acts = [];
    let actArr = [];
    this.state.act.forEach((a) => {
      if (a.theme === this.state.boxtheme) {
        if (a.level <= elder.level) {
          if (likes.includes(a.type)) {
            acts.push(a.ID);
          }
        }
      }
    });

    for (let i = 0; i < 4; i++) {
      actArr[i] = acts[Math.floor(Math.random() * acts.length)];
    }

    let actList = this.state.act.map((a) => {
      if (actArr.includes(a.ID)) {
        return (
          <tr key="index">
            <td>{a.ID}</td>
            <td>{a.name}</td>
            <td>{a.description}</td>
            <td>{a.level}</td>
            <td>{a.type}</td>
            <td>{a.theme}</td>
          </tr>
        );
      } else return <tr />;
    });

    return (
      <div>
        <AppNavBar />
        <h2>
          {elder.name} : {elder.level}
          <div className="float-right">
            <Form onSubmit={this.handleSubmit}>
              <Button
                type="submit"
                color="success"
                value={actArr}
                onMouseDown={this.handleChange}
              >
                Confirm Activities
              </Button>
            </Form>
          </div>
        </h2>
        <Table className="mt-4">
          <thead>
            <tr key="head">
              <td>ID</td>
              <td>Name</td>
              <td>Description</td>
              <td>Level</td>
              <td>Type</td>
              <td>Theme</td>
            </tr>
          </thead>
          <tbody>{actList}</tbody>
        </Table>
      </div>
    );
  }
}
export default boxActAssign;
