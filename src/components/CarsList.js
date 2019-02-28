import React, { Component } from 'react';
import { Table, Divider, Button, Modal, Switch, Tag, Icon  } from 'antd';
import FormEditCar from './FormEditCar';
//import FormAddCar from './FormAddCar';
//import Capitalize from './../service/Capitalize';

const { Column } = Table;

const confirm = Modal.confirm;

class CarsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            dataCars: this.props.dataCars,
            sortedInfo: null,
            isToggleOnMarca: true
        };

        //this.handleAddCar = this.handleAddCar.bind(this);
        this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
        this.handleUpdateDataCar = this.handleUpdateDataCar.bind(this);
    }

    info(data) {
        Modal.info({
          title: 'Detalles del Carro',
          content: (
            <div>
              <div><p><span className="text-bold">UId: </span>{data.key}</p></div>
              <div><p><span className="text-bold">Marca: </span>{data.brand}</p></div>
              <div><p><span className="text-bold">Año de fabricación: </span>{data.year}</p></div>
              <div><p><span className="text-bold">País de origen: </span>{data.madein}</p></div>
              <div><p><span className="text-bold">Velocidad máxima: </span>{data.maxspeed} Km/h</p></div>
              <div className="margin-bottom-1em"><span className="text-bold">Estado: </span>{(data.status) ? <Tag color="green">Activo</Tag> : <Tag color="red">Inactivo</Tag> }</div>
              <div><p><span className="text-bold">Descripción: </span>{data.description}</p></div>
              <div><p><span className="text-bold">Colores: </span>{data.colors}</p></div>
              <div><p><span className="text-bold">Cantidad de puertas: </span>{data.quantify}</p></div>
            </div>
          ),
          onOk() {
              
          },
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

    /*handleAddCar(dataCar) {
        this.props.handleAddCar(dataCar);
    }*/

    onChangeStatusCar(checked, id) {
        this.props.handleUpdateCar(id, checked);
    }

    handleUpdateDataCar(dataCarEdit, id){
        this.props.handleUpdateDataCar(dataCarEdit, id)
    }

    handleChange = (pagination, filters, sorter) => {
        //console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          sortedInfo: sorter
        });
    }

    render() {
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        return(
            <div>
                <Table dataSource={this.state.dataCars} scroll={{ x: 1300 }} onChange={this.handleChange}>
                    <Column title="Marca" dataIndex="brand" key="brand" 
                        sorter={(a, b) => a.brand.length - b.brand.length} sortOrder={sortedInfo.columnKey === 'brand' && sortedInfo.order} />
                    <Column title="Año de fabricación" dataIndex="year" key="year" 
                        sorter={(a, b) => a.year - b.year} sortOrder={sortedInfo.columnKey === 'year' && sortedInfo.order} className="text-center" />
                    <Column title="País de origen" dataIndex="madein" key="madein" className="text-center"
                        sorter={(a, b) => a.madein.length - b.madein.length} sortOrder={sortedInfo.columnKey === 'madein' && sortedInfo.order} />
                    <Column title="Velocidad Máxima km/h" dataIndex="maxspeed" key="maxspeed" className="text-center" 
                        render={(text, record) => (
                            <span>
                              {record.maxspeed} km/h  
                            </span>
                        )}
                        sorter={(a, b) => a.maxspeed - b.maxspeed} sortOrder={sortedInfo.columnKey === 'maxspeed' && sortedInfo.order}
                    />
                    <Column
                        title={<div className="text-center">Estado</div>}
                        dataIndex="status"
                        key="status"
                        render={(text, record) => (
                            <span>
                              {(record.status) ? <Tag color="green">Activo</Tag> : <Tag color="red">Inactivo</Tag>}  
                            </span>
                        )}
                        className="text-center"
                    />
                    <Column
                        title={<div className="text-center">Acciones</div>}
                        key="action"
                        render={(text, record) => (
                            <span>
                                {(record.status) ? 
                                    <Switch title="Desactivar" defaultChecked  onChange={(checked) => this.onChangeStatusCar(checked, record.key)} /> : 
                                    <Switch title="Activar" onChange={(checked) => this.onChangeStatusCar(checked, record.key)} />
                                }
                                <Divider type="vertical" />
                                {(record.status) ?
                                    <Button title="Detalles" type="primary" onClick={() => this.info(text)} shape="circle">
                                        <Icon type="info" />
                                    </Button>: 
                                    <Button title="Detalles" type="primary" disabled shape="circle">
                                        <Icon type="info" />
                                    </Button>
                                }
                                <Divider type="vertical" />
                                {
                                    <FormEditCar handleUpdateDataCar={this.handleUpdateDataCar} dataCar={text}/>                                   
                                }
                                <Divider type="vertical" />
                                <Button title="Eliminar" onClick={() => this.showDeleteConfirm(this.props, record.key, record.brand, record.year, record.madein,)}  type="danger" shape="circle">
                                 <Icon type="close" />
                                </Button>
                            </span>
                        )}
                        className="text-center"
                    />   
                </Table>
                <div className="text-muted margin-top-001">Copyright 2019</div>
                {/*<FormAddCar handleAddCar={this.handleAddCar}/>*/}
            </div>
        );
    }
}

export default CarsList;