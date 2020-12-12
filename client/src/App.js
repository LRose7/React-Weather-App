import React, { Component } from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup
} from 'reactstrap';

import Weather from './components/weather';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      weather: null,
      cityList: [],
      newCityName: ''
    };
  }

  getCityList = async () => {
    try {
      const response = await fetch('/cities');
      const jsonData = await response.json();

      const cityList = jsonData.map(r => r.city_name);
      this.setState({ cityList });

    } catch (err) {
      console.error(err.message);
    }
  };

  handleInputChange = (e) => {
    this.setState({ newCityName: e.target.value });
  };

  handleAddCity = async () => {
    try {
      await fetch('/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: this.state.newCityName })
      })
      .then(res => res.json)
      .then(res => {
        this.getCityList();
        this.setState({ newCityName: '' });
      })

    } catch (err) {
      console.error(err.message);

    }
  };

  getWeather = async (city) => {
    await fetch(`/weather/${city}`)
    .then(res => res.json())
    .then(weather => {
      console.log(weather);
      this.setState({ weather });
    });
  }

  handleChangeCity = async (e) => {
    await this.getWeather(e.target.value);
  }

  // called by React when the component is started.
  // used to fecth data and initialize state.
  componentDidMount () {
    this.getCityList();
  }

    render() {
    return (
      <Container fluid className='centered'>
        <Navbar dark color='dark'>
          <NavbarBrand href='/'>Climatic Weather</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className='display-3'>Climatic Weather</h1>
              <p classname='lead'>Stay informed of the current weather in your desired cities!</p>
              <InputGroup>
                <Input
                  placeholder='Enter city name...'
                  value={this.state.newCityName}
                  onChange={this.handleInputChange}
                >
                </Input>
                <InputGroupAddon addonType='append'>
                  <Button color='primary' onClick={this.handleAddCity}>Add City</Button>
                </InputGroupAddon>
              </InputGroup>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className='display-5'>Current Weather</h1>
            <FormGroup>
              <Input type='select' onChange={this.handleChangeCity}>
                { this.state.cityList.length === 0 && <option>No cities added yet.</option> }
                { this.state.cityList.length > 0 && <option>Select a city.</option> }
                { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Weather data={this.state.weather}/>
      </Container>
    );
  }
}

export default App;
