import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Container } from "reactstrap";
import AppNavBar from "./AppNavBar.js";
import { withAuthenticationRequired } from "@auth0/auth0-react";

class ActEdit extends Component {
  emptyItem = {
    ID: null,
    name: "",
    description: "",
    level: "",
    type: "",
    theme: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let yes = this.props.match.params.id;
    if (yes !== "new") {
      console.log(yes);
      let act = await (
        await fetch(`http://localhost:6080/activity/${yes} `)
      ).json();
      this.setState({ item: act });
      console.log(act);
    }
  }

  handleChange(evt) {
    let target = evt.target;
    let value = target.value;
    let name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { item } = this.state;
    item.level = parseInt(item.level);
    await fetch(
      "http://localhost:6080/activity" + (item.ID ? "/" + item.ID : ""),
      {
        method: item.ID ? "PUT" : "POST",
        body: JSON.stringify(item),
      }
    );

    this.props.history.push("/map");
  }

  render() {
    const { item } = this.state;

    return (
      <div>
        <AppNavBar />
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={item.name}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={item.description}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="level">Nível</Label>
              <Input
                type="select"
                name="level"
                id="level"
                onChange={this.handleChange}
                value={item.level}
              >
                <option value=" "></option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="type">Type</Label>
              <Input
                type="select"
                name="type"
                id="type"
                onChange={this.handleChange}
                defaultValue={item.type}
              >
                <option value=" "></option>
                <option value="Jardinagem">Jardinagem</option>
                <option value="Culinaria">Culinaria</option>
                <option value="Escrita">Escrita</option>
                <option value="Leitura">Leitura</option>
                <option value="Pintura">Pintura</option>
                <option value="Carpintaria">Carpintaria</option>
                <option value="Bordar">Bordar</option>
                <option value="Passear">Passear</option>
                <option value="Teatro">Teatro</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Aprender">Aprender</option>
                <option value="Museus">Museus</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="theme">Theme</Label>
              <Input
                type="text"
                name="theme"
                id="theme"
                value={item.theme}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>
              <Button color="secondary" href="/map">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}
export default withRouter(withAuthenticationRequired(ActEdit));
