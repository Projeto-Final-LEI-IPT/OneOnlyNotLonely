import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Container } from "reactstrap";
import AppNavBar from "./AppNavBar.js";
import { withAuthenticationRequired } from "@auth0/auth0-react";

class BoxEdit extends Component {
  emptyItem = {
    ID: null,
    status: "",
    description: "",
    latitude: "",
    longitude: "",
    theme: "",
    dataEntrega: "",
    dataLevantamento: "",
    feedback: "",
    oldOne: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      elders: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let elder = await (await fetch(`http://localhost:6080/utente`)).json();
    this.setState({ elders: elder });
    let yes = this.props.match.params.id;
    if (yes !== "new") {
      const box = await (
        await fetch(`http://localhost:6080/box/${yes} `)
      ).json();
      this.setState({ item: box });
    }
  }

  handleChange(evt) {
    let target = evt.target;
    let value = target.value;
    let name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
    console.log(item);
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    let { item } = this.state;
    item.latitude = parseFloat(item.latitude);
    item.longitude = parseFloat(item.longitude);
    item.oldOne = parseInt(item.oldOne);
    item.dataEntrega = new Date(item.dataEntrega).toISOString();
    item.dataLevantamento = new Date(item.dataLevantamento).toISOString();

    await fetch("http://localhost:6080/box" + (item.ID ? "/" + item.ID : ""), {
      method: item.ID ? "PUT" : "POST",
      body: JSON.stringify(item),
    });

    this.props.history.push("/map");
  }

  render() {
    const { item, elders } = this.state;

    navigator.geolocation.getCurrentPosition((position) => {
      item.latitude = position.coords.latitude;
      item.longitude = position.coords.longitude;
      console.log(item.latitude, item.longitude);
      console.log(this.props.elders);
    });

    let elderList = elders.map((elder) => {
      return (
        <div>
          <input
            type="radio"
            name="oldOne"
            id="oldOne"
            value={elder.ID}
            checked={elder.ID === item.oldOne}
            onChange={this.handleChange}
          />
          <label for="oldOne">
            {" "}
            {elder.ID} : {elder.name}, Nivel: {elder.level}{" "}
          </label>
        </div>
      );
    });

    let title = <h1>{item.ID ? "Edit Box" : "Add Box"}</h1>;
    return (
      <div>
        <AppNavBar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="status"> Status</Label>
              <Input
                type="select"
                name="status"
                id="status"
                value = {item.status}
                onChange={this.handleChange}
              >
                <option value=" "></option>
                <option value="Processing">Processing</option>
                <option value="In Delivery" default>
                  In Delivery
                </option>
                <option value="Delivered">Delivered</option>
                <option value="Ready for pick up">Ready for Pick up</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="description"> Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={item.description}
                onChange={this.handleChange}
                autoComplete="description"
              />
            </FormGroup>
            <FormGroup>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Label for="latitude">Latitude</Label>
                      <Input
                        type="text"
                        name="latitude"
                        id="latitude"
                        value={item.latitude}
                        onChange={this.handleChange}
                        readOnly
                      />
                    </td>
                    <td>
                      <Label for="longitude"> longitude</Label>
                      <Input
                        type="int"
                        name="longitude"
                        id="longitude"
                        value={item.longitude}
                        onChange={this.handleChange}
                        readOnly
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </FormGroup>
            <FormGroup>
              <Label for="theme"> theme</Label>
              <Input
                type="text"
                name="theme"
                id="theme"
                value={item.theme}
                onChange={this.handleChange}
                autoComplete="theme"
              />
            </FormGroup>
            <FormGroup>
              <Label for="dataEntrega"> Delivery Date</Label>
              <Input
                type="date"
                name="dataEntrega"
                id="dataEntrega"
                defaultValue={item.dataEntrega.toString}
                onChange={this.handleChange}
                min="2021-07-01"
              />
            </FormGroup>
            <FormGroup>
              <Label for="dataLevantamento"> Retrieval Date </Label>
              <Input
                type="date"
                name="dataLevantamento"
                id="dataLevantamento"
                defaultValue={item.dataLevantamento.toString}
                onChange={this.handleChange}
                min="2021-07-01"
              />
            </FormGroup>
            <FormGroup>
              <Label for="oldOne"> Elder</Label>
              <fieldset>{elderList}</fieldset>
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
export default withRouter(withAuthenticationRequired(BoxEdit));
