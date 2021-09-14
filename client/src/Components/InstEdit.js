import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Container } from 'reactstrap';
import AppNavBar from './AppNavBar.js';
import {withAuthenticationRequired} from "@auth0/auth0-react"

class InstEdit extends Component{
    emptyItem = {
        ID: 0,
        name: "",
        latitude: "",
        longitude: "",
        address: "",
        codPostal: "",
        type:""
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
         this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.timeout = this.timeout.bind(this);
    }

    async componentDidMount() {
        let yes = this.props.match.params.id;
        if (yes !== 'new') {
            console.log(yes);
            let inst = await (await fetch(`http://localhost:6080/institution/${yes}`)).json();
            this.setState({ item: inst });
            console.log(inst)
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

    timeout(delay) {
        return new Promise(res => setTimeout(res, delay))
    }


    async handleSubmit(evt) {
        evt.preventDefault();
        const { item } = this.state;
        var xmlhttp = new XMLHttpRequest();
        var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + item.address;
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var myArr = JSON.parse(this.responseText);
                console.log(myArr);
                item.latitude = myArr[0].lat;
                item.longitude = myArr[0].lon;

                if(item.latitude===0 || item.longitude===0) {
                        item.latitude = "27.727535";
                        item.longitude="-58.494335";
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        await this.timeout(1000)
        item.latitude = parseFloat(item.latitude);
        item.longitude = parseFloat(item.longitude);
        console.log(item);

        await fetch('http://localhost:6080/institution' + ((item.ID) ? '/' + item.ID : ''), {
            method: (item.ID) ? 'PUT' : 'POST',
            body: JSON.stringify(item),
            mode: 'no-cors'

        });

        this.props.history.push('/map');

    }



    render() {
        const { item } = this.state;
        const title = <h1>{(item.ID) ? 'Editar Instituição' : 'Adicionar Instituição'}</h1>
        return (
            <div>
                <AppNavBar />
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="nome"> Nome</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address"> Morada</Label>
                            <Input type="text" name="address" id="address" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="codPostal"> Código Postal</Label>
                            <Input type="text" name="codPostal" id="codPostal" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="type"> Tipo de Instituição</Label>
                            <Input type="select" name="type" id="type" onChange={this.handleChange}  >
                                <option value=" "></option>
                                <option value='Centro de Dia'>Centro de Dia</option>
                                <option value='Lar'>Lar</option>
                                <option value='Associação Social'>Associação</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{''}
                            <Button color="secondary" href="/map">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }

}
export default withRouter(withAuthenticationRequired(InstEdit));