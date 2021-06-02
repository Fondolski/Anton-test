import {useState, useRef, useEffect} from 'react'
import logo from './logo.svg';
import './App.scss';
import Modal from '@material-ui/core/Modal';


function App() {

  const [name, setName] = useState('')
  const [tools, setTools] = useState(["Hammer", "Mallet", "axe", "handsaw", "Hacksaw", "Level", "Screwdriver"])
  const [suggestions, setSuggestions] = useState([])
  const [suggestion, setSuggestion] = useState('')
  const [number, setNumber] = useState('')
  const [modal, setModal] = useState(false)
  const rootRef = useRef(null);


  function onChangeText(text) {
    setName(text)
    let suggestions = []
    if(text.length > 0) {
        const regex = new RegExp(`${text}`, 'i')
        suggestions = tools.sort().filter(v => regex.test(v))
    }

    setSuggestions(suggestions)
  }

  function suggestionSelected(value) {
    setName(value)
    setSuggestion(value)
    setSuggestions([])
}
  
  return (
    <div className="App">
      <div className="tool-weight">
        <div className="tool-container">
            <p className="tool-text">Tool:</p>
            <input placeholder="tool" className="tool-input" value={name} onChange={e => onChangeText(e.target.value)}></input>
        </div>
        <div className="tool-container">
            <p className="tool-text">Weight:</p>
            <input placeholder="t" className="tool-input" type="number" onChange={e => setNumber(e.target.value + '  t')}></input>
        </div>
        <button className="btn" onClick={() => setModal(true)}>+</button>
      </div>
      <div className="tool-list">
        {suggestions.map((tool, i)=> {
          return(
            <p className="tool" onClick={ () => suggestionSelected(tool)}>{tool}</p>
          )
        })}
      </div>
      <div className="modal-container" ref={rootRef}>
          <Modal
            disablePortal
            disableEnforceFocus
            open={modal}
            disableAutoFocus
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            className="modal"
            container={() => rootRef.current}
          >
            <div>
            <div className="modal-open">
              <div className="in-modal">
                <h2 id="server-modal-title">Tool:</h2>
                <p id="server-modal-description">{suggestion}</p>
              </div>
              <div className="in-modal">
                <h2 id="server-modal-title">Weight:</h2>
                <p id="server-modal-description">{number}</p>
              </div>
              <button className="close-modal" onClick={() => setModal(false)}>x</button>
            </div>
            <button className="modal-btn">Add items</button>
            </div>
          </Modal>
        </div>
    </div>
  );
}

export default App;
