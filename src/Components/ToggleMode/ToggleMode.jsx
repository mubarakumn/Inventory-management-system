import "./Toggle.css"
 
 const ToggleMode = ({ischecked, handleMode}) => {
  return (
    <div className="toggle-container">
        <input type="checkbox"
        id="check"
        className="toggle"
        onChange={handleMode}
        checked={ischecked}
         />
        <label htmlFor="check">{ischecked? ("Dark mode") : ("Light mode") }</label> 
    </div>
  )
}

export default ToggleMode