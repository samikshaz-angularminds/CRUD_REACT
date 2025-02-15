function SelectBox({ optionArray,label }) {
    console.log('====================================');
    console.log(optionArray);
    console.log('====================================');
  return (
    <div>
      <label className="d-flex justify-content-start" htmlFor="" >
        {label}
      </label>
      
      <select className="form-select ">
        {optionArray.map((option) => (
          <option key={option.id} value={option.value}> {option.name} </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBox;
