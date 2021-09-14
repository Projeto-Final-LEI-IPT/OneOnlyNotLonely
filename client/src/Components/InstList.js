import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';


class InstList extends Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
    }

    async remove(id) {
        await fetch(`http://localhost:6080/institution/${id}`, {
            method: "DELETE"
        }).then(window.location.reload());
    }


    render() {
        console.log(this.props.insts)
        var instList = this.props.insts.map(inst => {
            return (
                <tr key={inst.ID}>
                    <td>{inst.ID} </td>
                    <td style={{ whiteSpace: 'nowrap' }}>{inst.name} </td>
                    <td>{inst.address}</td>
                    <td>{inst.codPostal}</td>
                    <td>{inst.type}</td>
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="primary" tag={(props) => <Link {...props} />} to={"/institution/" + inst.ID +"/edit"}>Edit</Button>
                            <Button size="sm" color="danger" onClick={() => this.remove(inst.ID)} >Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })


        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/institution/new/edit" >Add institution</Button>
                    </div>
                    <h3>Institutions</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="5%">ID</th>
                                <th width="15%">Name</th>
                                <th width="20%">Address</th>
                                <th width="10%">Postal Code</th>
                                <th width="20%">Tipo</th>
                                <th width="30%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {instList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default InstList;