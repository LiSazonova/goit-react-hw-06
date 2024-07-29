import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import SearchBox from './SearchBox/SearchBox';
import ContactList from './ContactList/ContactList';
import initialContacts from './contacts.json';
import s from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedData = JSON.parse(window.localStorage.getItem('contacts'));
    if (savedData) {
      return savedData;
    }
    return initialContacts;
  });
  const [search, setSearch] = useState('');

  const addContacts = newContact => {
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = ContactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(Contact => Contact.id !== ContactId);
    });
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const searchContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onAdd={addContacts} />
      <SearchBox value={search} onSearch={setSearch} />
      <ContactList contacts={searchContacts} onDelete={deleteContact} />
    </div>
  );
};

export default App;
