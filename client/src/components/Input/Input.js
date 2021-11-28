function Input({ label, name, type }) {
  return (
    <div className="field">
      <label htmlFor={name} className="field__label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={name}
        className="field__input"
      />
    </div>
  );
}

export default Input;
