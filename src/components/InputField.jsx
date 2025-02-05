function InputField({ type, label, name, placeholder, defaultValue }) {
  return (
    <div className="form-control">
      <label htmlFor="" className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full"
        required
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default InputField;
