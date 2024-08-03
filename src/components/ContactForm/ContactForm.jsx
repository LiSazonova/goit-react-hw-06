import s from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addContact } from '../../redux/contactsSlice';

const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    number: '',
  };

  const ContactFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short! Please type min 3 symbols')
      .max(50, 'Too Long! Must be up to 50 symbols')
      .required('Required'),
    number: Yup.string()
      .min(3, 'Must be a valid phone number, min 3 symbols!')
      .max(50, 'Too Long!')
      .matches(/^\+?[1-9]\d{1,14}$/, 'Невірний формат номеру телефона')
      .required('Required'),
  });

  const nameFieldId = nanoid();
  const phoneFieldId = nanoid();

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        id: nanoid(),
        name: values.name,
        number: values.number,
      }),
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
    >
      <Form className={s.form}>
        <label className={s.input_title} htmlFor={nameFieldId}>
          Name
        </label>
        <Field className={s.field} type="text" name="name" />
        <ErrorMessage className={s.input_error} name="name" component="span" />
        <label className={s.input_title} htmlFor={phoneFieldId}>
          Number
        </label>
        <Field className={s.field} type="tel" name="number" />
        <ErrorMessage
          className={s.input_error}
          name="number"
          component="span"
        />
        <button className={s.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
