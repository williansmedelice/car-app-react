import React, { Component } from 'react';
import { Layout, Card, Button, Icon, Avatar, Drawer  } from 'antd';
import Login from './components/login';
import FormAddCar from './components/FormAddCar'
import CarsList from './components/CarsList';
import firebase from 'firebase';
import { DB_CONFIG } from './config/config';
import Capitalize from './service/Capitalize';
import Moment from 'moment';
import 'moment/locale/es';
import 'firebase/database';
import './App.css';

const {Header, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        auth: false,
        user: '',
        dataCars: [],
        fechaActual:  Moment().format('D ') + Capitalize(Moment().format('MMMM ')) + Moment().format('YYYY'),
        visible: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAddCar = this.handleAddCar.bind(this);
    this.handleRemoveCar = this.handleRemoveCar.bind(this);
    this.handleUpdateCar = this.handleUpdateCar.bind(this);
    this.handleUpdateDataCar =this.handleUpdateDataCar.bind(this);

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
          dataCars[i].brand = snap.val().brand;
          dataCars[i].year = snap.val().year;
          dataCars[i].madein = snap.val().madein;
          dataCars[i].maxspeed = snap.val().maxspeed;
          dataCars[i].status = snap.val().status;
          dataCars[i].description = snap.val().description;
          dataCars[i].colors = snap.val().colors;
          dataCars[i].quantify = snap.val().quantify;
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
      user:'',
      visible: false
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

  //Metodo para actualizar cambios en edicion de un carro
  handleUpdateDataCar(dataCarEdit, id) {
    this.db.child(id).update({
      brand: dataCarEdit.brand,
      year: dataCarEdit.year,
      madein: dataCarEdit.madein,
      maxspeed: dataCarEdit.maxspeed,
      status: dataCarEdit.status,
      description: dataCarEdit.description,
      colors: dataCarEdit.colors,
      quantify: dataCarEdit.quantify
    });
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { auth, user, dataCars, fechaActual } = this.state;
    return(
        <Layout className="st005">
          <div>
          <Header>
            <span className="font-white">Car App</span>
            {(!auth) ?
              "" :
              <div className="inline paddin-left-right-10px">
                <div className="facet_sidebar inline float-right margin-right-20px">
                  <FormAddCar handleAddCar={this.handleAddCar}/>
                  <Button type="primary" title="Cerrar sesión" onClick={this.handleLogout}>
                    <Icon type="logout" />
                  </Button>
                </div>
                <div className="float-right display-001">
                  <Button type="primary" title="Desplegar Menú" onClick={this.showDrawer}>
                    <Icon type="menu-fold" />
                  </Button>
                </div>
                <Drawer
                  title="Menú"
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  visible={this.state.visible}
                >
                  
                  <div className="margin-left-10px" ><FormAddCar handleAddCar={this.handleAddCar}/></div>
                  
                  <p>
                    <Button type="primary" title="Cerrar sesión" onClick={this.handleLogout}>
                      Cerrar Sesión <Icon type="logout" />
                    </Button>
                  </p>
                </Drawer>
              </div>
            }
          </Header>
          </div>
          <div>
          <Content>
            {(!auth) ? 
              <div className="st001">
                <div className="text-center padding-20px">
                  <Avatar size={64} icon="user" className="boxshadow-001" />
                  <h2>Bienvenido</h2>
                </div>
                <Login handleLogin={this.handleLogin}></Login>
              </div> :
              <Card className="st006">
              <div className="st002">
                <div className="text-center">
                  <Avatar size={64} icon="user" className="boxshadow-001" />
                  <div className="text-center">
                    <h2>Bienvenido {user}</h2>
                    <h4>Hoy es {fechaActual}</h4>                    
                  </div>
                </div>

                <Card title="Lista de Vehículos">
                  <CarsList 
                    handleRemoveCar={this.handleRemoveCar} 
                    handleUpdateCar={this.handleUpdateCar} 
                    dataCars={dataCars}
                    handleUpdateDataCar={this.handleUpdateDataCar}
                  >
                  </CarsList>
                </Card>                
              </div>
              </Card>
            }
          </Content>
          </div>
          {/*<div className="footer">
            <Footer className="text-center backgroung-001529 color-white">Car App, ©2019 Created by Willians Medelice</Footer>
          </div>*/}
        </Layout>
    );
  }
}

export default App;
