const DeadlineAddModalInput = (props) => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{props.label}</label>
      </div>
      <div className="field-body field is-expanded">
        <input
          className="input"
          type="text"
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.action(e.target.value)}
        />
      </div>
    </div>
  )
}

export default DeadlineAddModalInput