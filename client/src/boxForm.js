import React, { UseState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const boxForm = (props) => {
  const [box, setBox] = UseState({
    boxname: props.box ? props.box.boxname : '',
    lat: props.box ? props.box.lat : '',
    longi: props.box ? props.box.longi : '',  
    estado: props.box ? props.box.estado : '',
    descricao: props.box ? props.box.descricao : ''
  });

  const [errorMsg, setErrorMsg] = UseState('');
  const { boxname, lat, longi, estado, descricao} = box;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [boxname, lat, longi, estado, descricao];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const box = {
        id: uuidv4(),
        boxname,
        lat,
        longi,
        estado,
        descricao,
      };
      props.handleOnSubmit(box);
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'estado':
        if (value === '' || parseInt(value) === +value) {
          setBox((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      case 'longi':
        if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setBox((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        setBox((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>box Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="boxname"
            value={boxname}
            placeholder="Enter name of box"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="lat">
          <Form.Label>box lat</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="lat"
            value={lat}
            placeholder="Enter Latitude "
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="estado">
          <Form.Label>estado</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="estado"
            value={estado}
            placeholder="Enter available estado"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="longi">
          <Form.Label>box longi</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="longi"
            value={longi}
            placeholder="Enter longi of box"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default boxForm;