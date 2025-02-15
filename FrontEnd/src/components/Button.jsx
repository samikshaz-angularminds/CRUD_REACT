function Button({type,title}) {
    return(
        <div>
            <button type={type ? type : "submit"} className="btn btn-primary m-2" > {title} </button>
        </div>
    );
}

export default Button;