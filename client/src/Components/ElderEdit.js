import React,{Component}from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Container } from "reactstrap";
import AppNavBar from "./AppNavBar.js";
import {withAuthenticationRequired} from "@auth0/auth0-react"

class ElderEdit extends Component {
  emptyItem = {
    ID: 0,
    name: "",
    latitude: "",
    longitude: "",
    address: "",
    codPostal: "",
    likes: "",
    level: "",
    inst: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      insts: [],
      likes: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.timeout = this.timeout.bind(this);
  }

  async componentDidMount() {
    let yes = this.props.match.params.id;
    let inst = await (await fetch(`http://localhost:6080/institution`)).json();
    this.setState({ insts: inst });
    if (yes !== "new") {
      let elder = await (
        await fetch(`http://localhost:6080/utente/${yes}`)
      ).json();
      this.setState({ item: elder });
    }
  }

  handleChange(evt) {
    let target = evt.target;
    let value = target.value;
    let name = target.name;
    let item = { ...this.state.item };
    if (name === "likes") {
      let likes = this.state.likes;
      if (likes.includes(value)) {
        likes.splice(likes.indexOf(value), 1);
        this.setState({ likes: likes });
      } else {
        likes.push(value);
        console.log(likes);
      }
    } else {
      item[name] = value;
    }
    this.setState({ item });
  }

  timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { item } = this.state;
    var xmlhttp = new XMLHttpRequest();
    var url =
      "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
      item.address;
    xmlhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var myArr = JSON.parse(this.responseText);
        console.log(myArr);
        item.latitude = myArr[0].lat;
        item.longitude = myArr[0].lon;

        if (item.latitude === 0 || item.longitude === 0) {
          item.latitude = "27.727535";
          item.longitude = "-58.494335";
        }
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    await this.timeout(1000);

    item.latitude = parseFloat(item.latitude);
    item.longitude = parseFloat(item.longitude);
    item.level = parseFloat(item.level);
    item.inst = parseInt(item.inst);
    item.likes = this.state.likes.join();
    console.log(item);

    await fetch(
      "http://localhost:6080/utente" + ((item.ID) ? "/" + item.ID : ""),
      {
        method: item.ID ? "PUT" : "POST",
        body: JSON.stringify(item),
      }
    );

    this.props.history.push("/map");
  }

  render() {
    const { item, insts } = this.state;

    let instList = insts.map((inst) => {
      return (
        <div>
          <Input
            type="radio"
            name="inst"
            id="inst"
            value={inst.ID}
            checked={inst.ID === item.inst}
            onChange={this.handleChange}
          />
          <Label for="inst"> {inst.name} </Label>
        </div>
      );
    });

    const title = (
      <h1>{item.ID ? "Editar Dados Idoso" : "Adicionar Dados Idoso"}</h1>
    );
    return (
      <div>
        <AppNavBar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="nome"> Nome</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={item.name}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="address"> Morada</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={item.address}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="codPostal"> Codigo Postal</Label>
              <Input
                type="text"
                name="codPostal"
                id="codPostal"
                value={item.codPostal}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="level"> Sabe Ler?</Label>
              <Input
                type="select"
                name="level"
                id="level"
                onChange={this.handleChange}
                value={item.level}
              >
                <option value=" "></option>
                <option value="0" default>
                  Não
                </option>
                <option value="1">Sei ler </option>
                <option value="2">Sei ler e escrever</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="inst"> Instituição </Label>
              <fieldset>
                <Input
                  type="radio"
                  name="inst"
                  id="inst"
                  checked={item.inst==="1" || 1}
                  onChange={this.handleChange}
                />
                <Label for="inst"> Sem instituição </Label>
                {instList}
              </fieldset>
            </FormGroup>
            <FormGroup>
              <fieldset>
                <legend>De que gosta?</legend>
                <Input
                  type="checkbox"
                  name="likes"
                  id="likes"
                  value="Jardinagem"
                  onChange={this.handleChange}
                />
                <Label>Jardinagem</Label>
                <br />
                <Input
                  type="checkbox"
                  name="likes"
                  id="likes"
                  value="Culinaria"
                  onChange={this.handleChange}
                />
                <Label>Culinária</Label>
                <br />
                <Input
                  type="checkbox"
                  name="likes"
                  id="likes"
                  value="Escrita"
                  onChange={this.handleChange}
                />
                <Label>Escrita</Label>
                <br />
                <Input
                  type="checkbox"
                  name="likes"
                  id="likes"
                  value="Leitura"
                  onChange={this.handleChange}
                />
                <Label>Leitura</Label>
                <br />
                <Input
                  type="checkbox"
                  name="likes"
                  id="likes"
                  value="Pintura"
                  onChange={this.handleChange}
                />
                <Label>Pintura</Label>
                <br />
                <Input
                  type="checkbox"
                  name="likes"
                  id="likes"
                  value="Carpintaria"
                  onChange={this.handleChange}
                />
                <Label>Carpintaria</Label>
                <br />
                <Input
                  type="checkbox"
                  name="likes"
                  id="likes"
                  value="Bordar"
                  onChange={this.handleChange}
                />
                <Label>Bordar</Label>
                <br />
                <Input
                  type="checkbox"
                  name="likes"
                  id="likes"
                  value="Passear"
                  onChange={this.handleChange}
                />
                <Label>Passear</Label>
                <br />
                <Input
                  type="checkbox"
                  name="likes"
                  id="likes"
                  value="Museus"
                  onChange={this.handleChange}
                />
                <Label>Visitar Museus</Label>
                <br />
                <Input
                  type="checkbox"
                  name="likes"
                  id="likes"
                  value="Teatro"
                  onChange={this.handleChange}
                />
                <Label>Assistir Peças de teatro</Label>
                <br />
                <Input
                  type="checkbox"
                  name="likes"
                  id="likes"
                  value="Aprender"
                  onChange={this.handleChange}
                />
                <Label>Aprender Coisas novas</Label>
                <br />
                <Input
                  type="checkbox"
                  name="likes"
                  id="likes"
                  value="Puzzle"
                  onChange={this.handleChange}
                />
                <Label>Puzzles de Jornais</Label>
                <Input type="text" value={item.likes} readOnly/>
              </fieldset>
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
export default withRouter(withAuthenticationRequired(ElderEdit));
