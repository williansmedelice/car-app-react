import React, { Component } from 'react';
import { Layout, Card, Button, Icon, Avatar  } from 'antd';
import Login from './components/login';
import CarsList from './components/CarsList';
import firebase from 'firebase';
import { DB_CONFIG } from './config/config';
import Capitalize from './service/Capitalize';
import 'firebase/database';
import './App.css';

const {Header, Content} = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        auth: false,
        user: '',
        dataCars: []
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAddCar = this.handleAddCar.bind(this);
    this.handleRemoveCar = this.handleRemoveCar.bind(this);
    this.handleUpdateCar = this.handleUpdateCar.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('cars');
  }

  componentDidMount() {
    const { dataCars } = this.state;
    
    //Metodo de Base de Datos Firebase para recuperar una coleccion de objetos
    this.db.on('child_added', snap => {
      dataCars.push({
        key: snap.key,
        brand: Capitalize(snap.val().brand),
        year: snap.val().year,
        madein: Capitalize(snap.val().madein),
        maxspeed: snap.val().maxspeed,
        status: snap.val().status,
        description: snap.val().description,
        colors: snap.val().colors,
        quantify: snap.val().quantify,
      })
      
      this.setState({
        dataCars
      });

    });

    //Metodo de Base de Datos Firebase para realizar un snapshot de los cambios provocados cuando se quitan un elemento de la coleccion de datos
    this.db.on('child_removed', snap => {
      for(let i = 0; i < dataCars.length; i++){
        if(dataCars[i].key === snap.key){
          dataCars.splice(i, 1);
        }
      }
      this.setState({
        dataCars
      });
    })

    //Metodo de Base de Datos Firebase para realizar un snapshot de los cambios provocados cuando se realiza una actualizacion de una determinada coleccion de datos
    this.db.on('child_changed', snap => {
      for(let i = 0; i < dataCars.length; i++){
        if(dataCars[i].key === snap.key){
          dataCars[i].status = snap.val().status;
        }
      }
      this.setState({
        dataCars
      });
    })

  }

  handleLogin(user) {
    this.setState({
      auth: true,
      user: Capitalize(user)
    })
  }

  handleLogout() {
    this.setState({
      auth: false,
      user:''
    })
  }

  //Metodo para agregar un nuevo carro
  handleAddCar(dataCar) {
    this.db.push().set({
      brand: dataCar.brand,
      year: dataCar.year,
      madein: dataCar.madein,
      maxspeed: dataCar.maxspeed,
      status: dataCar.status,
      description: dataCar.description,
      colors: dataCar.colors,
      quantify: dataCar.quantify
    })
  }

  //Metodo para eliminar un carro
  handleRemoveCar(id) {
    this.db.child(id).remove();
  }

  //Metodo para actualizar cambios en status de un carro
  handleUpdateCar(id, status) {
    this.db.child(id).update({status:status});
  }

  render() {
    const { auth, user, dataCars } = this.state;
    return(
        <Layout className="st005">
          <Header><span className="font-white">Car App</span></Header>
          <Content>
            {(!auth) ? 
              <div className="st001">
                <div className="text-center padding-20px">
                  <Avatar size={64} icon="user" />
                  <h2>Bienvenido</h2>
                </div>
                <Login handleLogin={this.handleLogin}></Login>
              </div> :
              <div className="st002">
                <div className="text-center">
                  <Avatar size={64} icon="user" />
                  <div className="text-center">
                    <h2>Bienvenido {user}</h2>
                  </div>
                </div>
                <div className="st004">
                  <Button type="primary" title="Cerrar sesión" onClick={this.handleLogout}>
                       <Icon type="logout" />
                  </Button>
                </div>
                <Card title="Lista de Carros">
                  <CarsList handleAddCar={this.handleAddCar} handleRemoveCar={this.handleRemoveCar} handleUpdateCar={this.handleUpdateCar} dataCars={dataCars}></CarsList>
                </Card>                
              </div>
            }
          </Content>
          {/*<div className="footer">
            <Footer className="text-center backgroung-001529 color-white">Car App, ©2019 Created by Willians Medelice</Footer>
          </div>*/}
        </Layout>
    );
  }
}

export default App;
