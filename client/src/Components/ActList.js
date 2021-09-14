import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class ActList extends Component {
    constructor(props) {
        super(props)
        this.remove = this.remove.bind(this)
    }

    async remove(id) {
        await fetch(`http://localhost:6080/activity/${id}`, {
            method: 'DELETE'
        }).then(window.location.reload)
    }

    render() {
        var actList = this.props.acts.map(
            act => {
                return (

                    <tr key={act.ID}>
                        <td>{act.ID}</td>
                        <td>{act.name}</td>
                        <td>{act.description}</td>
                        <td>{act.level}</td>
                        <td>{act.type}</td>
                        <td>{act.theme}</td>
                        <td>
                            <ButtonGroup>
                                <Button size="sm" color="primary" tag={(props) => <Link {...props} />} to={"/activity/" + act.ID +"/edit"}>Edit</Button>
                                <Button size="sm" color="danger" onClick={() => this.remove(act.ID)} >Delete</Button>
                            </ButtonGroup>
                        </td>
                    </tr>

                )
            }
        );


        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={(props) => <Link {...props} />} to="/activity/new/edit" >Add Activity</Button>
                    </div>
                    <h3>Activities</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Descricao</th>
                                <th>Nivel</th>
                                <th>Tipo</th>
                                <th>theme</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {actList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }

}
export default ActList;