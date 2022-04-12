const Input = (props) => {
  //console.log(props);
  if(props.type === 'checkbox') {
    return (
      <div>
        <input className={props.error && 'is-invalid'} {...props} />
        <label>{props.label}</label>
        { props.error && props.error.map(err => <p key={err} className="valid">* {err}</p>)}
      </div>
    )
  }else {
    return (
      <div>
        <label>{props.label}</label>
        <input className={`form-control`} {...props} />
        {/* <input className={`form-control ${props.error && 'is-invalid'}`} {...props} />
        { props.error && props.error.map(err => <p key={err} className="invalid">* {err}</p>)} */}
      </div>
    )
  }
}

export default Input;