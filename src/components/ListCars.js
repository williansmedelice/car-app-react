import React, { Component } from 'react';
import { Divider, Button, Modal, Tag, Icon  } from 'antd';
import ReactTable from "react-table";
import "react-table/react-table.css";
import FormEditCar from './FormEditCar';
import Switch from "react-switch";


const confirm = Modal.confirm;

class ListCars extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            dataCars: this.props.dataCars,
            sortedInfo: null,
            isToggleOnMarca: true
        };

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

    onChangeStatusCar(checked, id) {
        this.props.handleUpdateCar(id, checked);
    }

    handleUpdateDataCar(dataCarEdit, id){
        this.props.handleUpdateDataCar(dataCarEdit, id)
    }

    render() {
        return(
            <div>
                <ReactTable
                    data={this.state.dataCars}
                    previousText='Anterior'
                    nextText='Siguiente'
                    noDataText='No se encontraron filas'
                    pageText='Página'
                    rowsText='filas'
                    ofText= 'de'

                    columns={[
                      {
                        columns: [
                          {
                            Header: <div className="text-bold">Marca</div>,
                            id: "brand",
                            accessor: d => d.brand,
                            Cell: row => (
                                <div className="margin-top-10px">{row.value}</div>
                            )
                          },
                          {
                            Header: <div className="text-bold">Año de fabricación</div>,
                            accessor: "year",
                            Cell: row => (
                                <div className="text-center margin-top-10px">{row.value}</div>
                            )
                          },
                          {
                            Header: <div className="text-bold">País de origen</div>,
                            accessor: "madein",
                            Cell: row => (
                                <div className="text-center margin-top-10px">{row.value}</div>
                            )
                          },
                          {
                            Header: <div className="text-bold">Velocidad Máxima km/h</div>,
                            accessor: "maxspeed",
                            Cell: row => (
                                <div className="text-center margin-top-10px">{row.value} km/h</div>
                            )
                          },
                          {
                            Header: <div className="text-bold">Estado</div>,
                            accessor: "status",
                            sortable: false,
                            Cell: row => (
                                <div className="text-center margin-top-10px">
                                    {(row.value) ? <Tag color="green">Activo</Tag> : <Tag color="red">Inactivo</Tag>}
                                </div>
                            )
                          }
                          ,
                          {
                            Header: <div className="text-bold">Acciones</div>,
                            id: "acciones",
                            width: 250,
                            accessor: a => a.acciones,
                            sortable: false,
                            Cell: row => (
                                <div className="margin-top-10px text-center">
                                <span>
                                    <Switch 
                                        onChange={(checked) => this.onChangeStatusCar(checked, row.original.key)} 
                                        checked={row.original.status} 
                                    />
                                    <Divider type="vertical" />
                                    {(row.original.status) ?
                                        <Button title="Detalles" type="primary" onClick={() => this.info(row.original)} shape="circle">
                                            <Icon type="info" />
                                        </Button>: 
                                        <Button title="Detalles" type="primary" disabled shape="circle">
                                            <Icon type="info" />
                                        </Button>
                                    }
                                    <Divider type="vertical" />
                                    {
                                        <FormEditCar handleUpdateDataCar={this.handleUpdateDataCar} dataCar={row.original}/>                                   
                                    }
                                    <Divider type="vertical" />
                                    <Button 
                                        title="Eliminar" 
                                        onClick={() => this.showDeleteConfirm(this.props, row.original.key, row.original.brand, row.original.year, row.original.madein,)} 
                                        type="danger" 
                                        shape="circle"
                                    >
                                        <Icon type="close" />
                                    </Button>
                                </span>
                                </div>
                            )
                          }
                          
                        ]
                      }
                    ]}

                    defaultPageSize={10}
                    className="-striped -highlight"
                  />
                <br/>
                <div className="text-muted">Copyright 2019</div>
            </div>
        );
    }
}

export default ListCars;