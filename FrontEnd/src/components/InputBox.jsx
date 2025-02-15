function InputBox({label,type,placeholder,id,value}) {


    return(
        <div className="form-group p-2">
            <label className="d-flex justify-content-start " htmlFor=""> {label} </label>
            <input id={id ? id : ""} type={type ? type : "text"} className="form-control" placeholder={placeholder} />
        </div>
    );
}

export default InputBox;