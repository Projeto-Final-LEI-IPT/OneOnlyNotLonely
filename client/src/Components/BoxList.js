import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";

class BoxList extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
    this.state = {
      elders: this.props.elders,
    };
  }

  async remove(id) {
    await fetch(`http://localhost:6080/box/${id}`, {
      method: "DELETE",
    }).then(window.location.reload());
  }

  render() {
    var boxList = this.props.boxes.map((box) => {
     

      return (
        <tr key={box.ID}>
          <td> {box.ID} </td>
          <td style={{ whiteSpace: "nowrap" }}> {box.status} </td>
          <td> {box.description}</td>
          <td>
            lat: {box.latitude} long: {box.longitude}
          </td>
          <td> {box.theme}</td>
          <td>{new Date(box.dataEntrega).toUTCString()} </td>
          <td>{new Date(box.dataLevantamento).toUTCString()}</td>
          <td>{box.oldOne}</td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={(props) => <Link {...props} />}
                to={"/box/" + box.oldOne + "/" +box.ID+"/"+box.theme + "/acts"}
              >
                Assign
              </Button>

              <Button
                size="sm"
                color="primary"
                tag={(props) => <Link {...props} />}
                to={"/box/" + box.ID + "/edit"}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(box.ID)}
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
            <Button color="success" tag={Link} to="/box/new/edit">
              Add Box
            </Button>
          </div>
          <h3>Boxes</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Description</th>
                <th>Coordinates</th>
                <th>Theme</th>
                <th> Delivery Date</th>
                <th> Retrieval Date</th>
                <th> Elder</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{boxList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
export default BoxList;
