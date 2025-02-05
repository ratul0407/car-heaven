function TextArea({ label, name, placeholder, defaultValue }) {
  return (
    <div className="form-control sm:col-span-2">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        name={name}
        className="textarea textarea-bordered min-h-24 resize-y"
        placeholder={placeholder}
        defaultValue={defaultValue}
      ></textarea>
    </div>
  );
}

export default TextArea;
