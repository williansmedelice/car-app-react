import React, { Component } from 'react';
import { Table, Divider, Button, Modal, Switch, Tag  } from 'antd';
import FormAddCar from './FormAddCar';
//import Capitalize from './../service/Capitalize';

const { Column } = Table;

const confirm = Modal.confirm;

class CarsList extends Component {
    constructor(props) {
        super(props);
        

        
        this.state = {
            dataCars: this.props.dataCars
        };

        this.handleAddCar = this.handleAddCar.bind(this);
        this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    }

    info(data) {
        Modal.info({
          title: 'Detalles del Carro',
          content: (
            <div>
              <p><span className="text-bold">UId: </span>{data.key}</p>
              <p><span className="text-bold">Marca: </span>{data.brand}</p>
              <p><span className="text-bold">Año de fabricación: </span>{data.year}</p>
              <p><span className="text-bold">Origen(país): </span>{data.madein}</p>
              <p><span className="text-bold">Velocidad máxima: </span>{data.maxspeed} Km/h</p>
              <p><span className="text-bold">Estado: </span>{data.status}</p>
              <p><span className="text-bold">Descripción: </span>{data.description}</p>
              <p><span className="text-bold">Colores: </span>{data.colors}</p>
              <p><span className="text-bold">Cantidad de puertas: </span>{data.quantify}</p>
            </div>
          ),
          onOk() {},
        });
    }

    showDeleteConfirm(p, id, ...data) {
        //console.log(data);
        confirm({
            title: 'Deseas eliminar este registro?',
            content: `${data[0]} ${data[1]} de ${data[2]}`,
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                p.handleRemoveCar(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    handleAddCar(dataCar) {
        this.props.handleAddCar(dataCar);
    }

    onChangeStatusCar(checked, id) {
        this.props.handleUpdateCar(id, checked);
    }

    render() {
        return(
            <div>
                <Table dataSource={this.state.dataCars}>
                    <Column title="Marca" dataIndex="brand" key="brand" />
                    <Column title="Año de fabricación" dataIndex="year" key="year" />
                    <Column title="Origen (País)" dataIndex="madein" key="madein" />
                    <Column title="Velocidad Máxima" dataIndex="maxspeed" key="maxspeed" />
                    <Column
                        title="Estado"
                        dataIndex="status"
                        key="status"
                        render={(text, record) => (
                            <span>
                              {(record.status) ? <Tag color="green">Activo</Tag> : <Tag color="red">Inactivo</Tag>}  
                            </span>
                        )}
                    />
                    <Column
                        title="Acciones"
                        key="action"
                        render={(text, record) => (
                            <span>
                                {(record.status) ? 
                                    <Switch title="Desactivar" defaultChecked  onChange={(checked) => this.onChangeStatusCar(checked, record.key)} /> : 
                                    <Switch title="Activar" onChange={(checked) => this.onChangeStatusCar(checked, record.key)} />
                                }
                                <Divider type="vertical" />
                                {(record.status) ?
                                    <Button type="primary" onClick={() => this.info(text)} >Detalles</Button>: 
                                    <Button type="primary" disabled>Detalles</Button>
                                }
                                <Divider type="vertical" />
                                <Button onClick={() => this.showDeleteConfirm(this.props, record.key, record.brand, record.year, record.madein,)}  type="danger">
                                    Eliminar
                                </Button>
                            </span>
                        )}
                    />   
                </Table>
                <FormAddCar handleAddCar={this.handleAddCar}/>
            </div>
        );
    }
}

export default CarsList;