import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";

class ElderList extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  async remove(id) {
    await fetch(`http://localhost:6080/utente/${id}`, {
      method: "DELETE",
    }).then(window.location.reload());
  }

  render() {
    let insts = this.props.insts;

    var ElderList = this.props.elders.map((elder) => {
      let instNome;
      insts.forEach((inst) => {
        if (elder.inst === 0) {
          instNome = "Sem instituição";
        } else if (elder.inst === inst.ID) {
          instNome = inst.name;
        }
      });

      return (
        <tr key={elder.ID}>
          <td>{elder.ID} </td>
          <td style={{ whiteSpace: "nowrap" }}>{elder.name} </td>
          <td>{elder.address}</td>
          <td>{elder.codPostal}</td>
          <td> {elder.level}</td>
          <td style={{ wordWrap: true }}>{elder.likes}</td>
          <td> {instNome}</td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={(props) => <Link {...props} />}
                to={"/elder/" + elder.ID + "/edit"}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(elder.ID)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/elder/new/edit">
              Add elder
            </Button>
          </div>
          <h3>Elders</h3>

          <Table className="mt-4">
            <thead>
              <tr>
                <th width="5%">ID</th>
                <th width="10%">Name</th>
                <th width="20%">Address</th>
                <th width="10%">Postal Code</th>
                <th width="5%">Level</th>
                <th width="20%"> Likes</th>
                <th width="10%">Institution</th>
                <th width="20%">Actions</th>
              </tr>
            </thead>
            <tbody>{ElderList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ElderList;
