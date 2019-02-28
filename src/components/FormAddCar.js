import React, { Component } from 'react';
import { Button, Modal, Form, Input, Icon, Radio, InputNumber } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class FormCar extends Component {
      render() {
        const {
          visible, onCancel, onCreate, form,
        } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title={"Agregar un Vehículo"}
            okText={"Enviar"}
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="Marca">
                {getFieldDecorator('brand', {
                  rules: [{ required: true, message: 'Campo Marca Requerido!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="Año de fabricación">
                {getFieldDecorator('year', {
                  rules: [{ required: true, message: 'Campo Año de fabricación Requerido!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="País de origen">
                {getFieldDecorator('madein', {
                  rules: [{ required: true, message: 'Campo País de origen Requerido!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="Velocidad máxima">
                {getFieldDecorator('maxspeed', {
                  rules: [{ required: true, message: 'Campo Velocidad máxima Requerido!' }],
                })(
                  <InputNumber min={0} max={1500}/>
                )}
              </Form.Item>
              <Form.Item className="collection-create-form_last-form-item">
                {getFieldDecorator('status', {
                    initialValue: true,
                })(
                    <Radio.Group>
                    <Radio value={true}>Activado</Radio>
                    <Radio value={false}>Desactivado</Radio>
                    </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="Descripción">
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: 'Campo Descripción Requerido!' }],
                })(
                  <Input type="textarea" />
                )}
              </Form.Item>
              <Form.Item label="Colores">
                {getFieldDecorator('colors', {
                  rules: [{ required: true, message: 'Campo Colores Requerido!' }],
                })(
                    <Input />
                )}
              </Form.Item>
              <Form.Item label="Cantidad de puertas">
                {getFieldDecorator('quantify', {
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

class FormAddCar extends Component {
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
      const form = this.formRef.props.form;
      this.setState({ visible: false });
      form.resetFields();
    }
  
    handleCreate = () => {
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
  
        //console.log('Received values of form: ', values);
        this.props.handleAddCar(values)
        form.resetFields();
        this.setState({ visible: false });
      });
    }
  
    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }
  
    render() {
      return (
        <div className="inline paddin-left-right-10px">
          <Button title="Crear Vehículo" type="primary" onClick={this.showModal}><Icon type="plus-circle" /> Crear Vehículo</Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      );
    }
  }
  
  export default FormAddCar;