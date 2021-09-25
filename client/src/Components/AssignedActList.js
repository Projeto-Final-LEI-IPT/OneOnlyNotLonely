import React, { Component } from "react";
import { Container, Button, Table } from "reactstrap";
import { Link } from "react-router-dom";

class assignedActList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acts: [],
    };
  }

  async componentDidMount() {
    console.log(this.props.match.params.boxid);
    let box = this.props.match.params.boxid;
    let acts = await (
      await fetch("http://localhost:6080/box/" + box + "/actList")
    ).json();
    this.setState({
      acts: acts,
    });
    console.log(this.state.acts);
  }

  render() {
    const { acts } = this.state;

    let actList = acts.map((a) => {
      return (
        <tr>
          <td>{a.ID}</td>
          <td>{a.name}</td>
          <td>{a.description}</td>
          <td>{a.level}</td>
          <td>{a.type}</td>
          <td>{a.theme}</td>
        </tr>
      );
    });

    return (
      <Container fluid>
        <div className="float-right">
          <Button color="primary" tag={Link} to="/map">
            Voltar
          </Button>
        </div>
        <h3>Actividades</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Npme</th>
              <th>Descrição</th>
              <th>Nivel</th>
              <th>Tipo</th>
              <th>Tema</th>
            </tr>
          </thead>
          <tbody>{actList}</tbody>
        </Table>
      </Container>
    );
  }
}
export default assignedActList;
