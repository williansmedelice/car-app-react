import React, { Component } from 'react';
import { Button, Modal, Form, Input, Icon, Radio, message, InputNumber } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class FormCar extends Component {
      constructor(props) {
          super(props);
            this.state = {
                dataCar: this.props.dataCar,
                messageError: ''
            };
      }

      render() {
        const {
          visible, onCancel, onCreate, form,
        } = this.props;
        const { getFieldDecorator } = form;
        const { dataCar } = this.state;
        return (
          <Modal
            visible={visible}
            title={"Editar Vehículo"}
            okText={"Guardar"}
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="Marca">
                {getFieldDecorator('brand',{
                  initialValue: dataCar.brand,
                  rules: [{ required: true, message: 'Campo Marca Requerido!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="Año de fabricación">
                {getFieldDecorator('year', {
                  initialValue: dataCar.year,
                  rules: [{ required: true, message: 'Campo Año de fabricación Requerido!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="País de origen">
                {getFieldDecorator('madein', {
                  initialValue: dataCar.madein,
                  rules: [{ required: true, message: 'Campo País de origen Requerido!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="Velocidad máxima">
                {getFieldDecorator('maxspeed', {
                  initialValue: dataCar.maxspeed,
                  rules: [{ required: true, message: 'Campo Velocidad máxima Requerido!' }],
                })(
                    <InputNumber min={0} max={1500} />
                )}
              </Form.Item>
              <Form.Item className="collection-create-form_last-form-item">
                {getFieldDecorator('status', {
                    initialValue: dataCar.status,
                })(
                    <Radio.Group>
                    <Radio value={true}>Activado</Radio>
                    <Radio value={false}>Desactivado</Radio>
                    </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="Descripción">
                {getFieldDecorator('description', {
                  initialValue: dataCar.description,
                  rules: [{ required: true, message: 'Campo Descripción Requerido!' }],
                })(
                  <Input type="textarea" />
                )}
              </Form.Item>
              <Form.Item label="Colores">
                {getFieldDecorator('colors', {
                  initialValue: dataCar.colors,
                  rules: [{ required: true, message: 'Campo Colores Requerido!' }],
                })(
                    <Input />
                )}
              </Form.Item>
              <Form.Item label="Cantidad de puertas">
                {getFieldDecorator('quantify', {
                  initialValue: dataCar.quantify,
                  rules: [{ required: true, message: 'Campo Cantidad Requerido!' }],
                })(
                    <Input />
                )}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  );

class FormEditCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    };
  
    showModal = () => {
      this.setState({ visible: true });
    }
  
    handleCancel = () => {
      //const form = this.formRef.props.form;
      this.setState({ visible: false });
      //form.resetFields();
    }
  
    handleCreate = () => {
      const form = this.formRef.props.form;
      const { dataCar } = this.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
  
        //console.log('Received values of form: ', values);
        this.props.handleUpdateDataCar(values, dataCar.key);
        message.success('Datos actualizados con éxito!');
        //form.resetFields();
        this.setState({ visible: false });
      });
    }
  
    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }
  
    render() {
      return (
        <div className="inline">
          <Button title="Editar" onClick={this.showModal} shape="circle">
            <Icon type="edit" />
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            dataCar={this.props.dataCar}
          />
        </div>
      );
    }
  }
  
  export default FormEditCar;