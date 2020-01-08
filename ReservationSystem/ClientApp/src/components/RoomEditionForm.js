import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Room from './Room'
import axios from 'axios';
import history from '../history';
import './styles/RoomEditionForm.css';

export default class RoomEditionForm extends Component {
  displayName = RoomEditionForm.name;
  SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg"
  ];

  constructor(props){
    super(props);

    this.state = {
      previewImage: '',
      imageFile: ''
    }

    this.setPreviewImage = this.setPreviewImage.bind(this);
    this.hangleImageChange = this.hangleImageChange.bind(this);
    this.useExistingImage = this.useExistingImage.bind(this);
  }

  useExistingImage = () => this.state.imageFile === '' && this.props.imageUrl !== '';
  isEditing = () => this.props.roomId !== '';

  hangleImageChange(file, setFieldValue, event){
    setFieldValue('image', event.target.value);
    this.setState({imageFile: file});
    var reader  = new FileReader();
    reader.onloadend = () => this.setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  }

  setPreviewImage(image){
    this.setState({previewImage: image});
  }

  handleSubmit(values, setSubmitting) {
    var url = this.isEditing() ? "api/rooms/update/" : "api/rooms/add"

    setSubmitting(true);
    this.props.setLoading(true);

    let formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('capacity', values.capacity);
    formData.append('price', values.price);
    formData.append('image', this.state.imageFile);
    if (this.isEditing())
      formData.append('id', this.props.roomId);

    axios.post(url, formData, {
      headers: { Authorization: "Bearer " + localStorage.token }})
    .then(() => {
      history.push('/admin');})
    .catch(error => {
      if (error.response.status === 401)
        this.props.showMessage("Aby wykonać tę akcję, musisz się zalogować!");
      else
        this.props.showMessage("Wystąpił błąd");

      this.props.setLoading(false)
      return;});
  }

  render(){
    return(
      <React.Fragment>
        <h2 className="pb-3">Dodaj pokój</h2>
        <Formik
          initialValues={this.props.initialValues}
          enableReinitialize={true}
          validationSchema={Yup.object({
            title: Yup.string()
              .required("To pole jest wymagane"),
            description: Yup.string()
              .required("To pole jest wymagane"),
            capacity: Yup.number()
              .required("To pole jest wymagane")
              .integer("Podaj liczbę całkowitą")
              .min(0, "Wartość nie może być ujemna"),
            price: Yup.number()
              .required("To pole jest wymagane")
              .integer("Podaj liczbę całkowitą")
              .min(0, "Wartość nie może być ujemna"),
            image:  this.useExistingImage() ? "" :
              Yup.mixed()
                .required("Wybierz zdjęcie")
          })}
          onSubmit={(values, { setSubmitting }) => this.handleSubmit(values, setSubmitting)}
          render= {({values, setFieldValue}) => {
          return(
          <Form className="generic-form" >
            <Field name="title" type="text" className="generic-input room-edit-input" placeholder="Nazwa"/>
            <ErrorMessage name="title" className="generic-error-message" render={msg => <span className="generic-error-message">{msg}</span>}/>
            <Field name="description" type="text" as="textarea" className="generic-input room-edit-input" placeholder="Opis"/>
            <ErrorMessage name="description" className="generic-error-message" render={msg => <span className="generic-error-message">{msg}</span>}/>
            <Field name="capacity" type="number" className="generic-input room-edit-input" placeholder="Ilość miejsc" min="1"/>
            <ErrorMessage name="capacity" className="generic-error-message" render={msg => <span className="generic-error-message">{msg}</span>}/>
            <Field name="price" type="number" className="generic-input room-edit-input" placeholder="Cena za noc" min="0"/>
            <ErrorMessage name="price" className="generic-error-message" render={msg => <span className="generic-error-message">{msg}</span>}/>
            <Field name="image" type="file" onChange={e => this.hangleImageChange(e.target.files[0], setFieldValue, e)} className="room-edit-input"
              accept="image/jpg, image/jpeg"/>
            <ErrorMessage name="image" className="generic-error-message" render={msg => <span className="generic-error-message">{msg}</span>}/>
            <button type="submit" className="generic-submit-button-light">Wyślij</button>
            <Room
              title={values.title}
              description={values.description}
              price={values.price}
              image={this.state.imageFile === '' ?  this.props.imageUrl : this.state.previewImage}
              capacity={values.capacity}
              onRoomTitleClick={(id) => {}}/>
          </Form>);
          }} 
        />
      </React.Fragment>
    );
  }
}