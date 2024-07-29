import s from './Contact.module.css';
import { BsTelephone } from 'react-icons/bs';
import { SlUser } from 'react-icons/sl';

const Contact = ({ data: { id, name, number }, onDelete }) => {
  return (
    <>
      <div className={s.contact}>
        <p className={s.contact_text}>
          <SlUser className={s.icons} />
          {name}
        </p>
        <p className={s.contact_text}>
          <BsTelephone className={s.icons} />
          {number}
        </p>
      </div>

      <button className={s.btn} onClick={() => onDelete(id)}>
        Delete
      </button>
    </>
  );
};

export default Contact;
