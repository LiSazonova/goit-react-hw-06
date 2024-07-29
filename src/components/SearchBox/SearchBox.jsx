import s from './SearchBox.module.css';

const SearchBox = ({ value, onSearch }) => {
  return (
    <>
      <p className={s.label}>Find contacts by name</p>
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={e => onSearch(e.target.value)}
      />
    </>
  );
};

export default SearchBox;
