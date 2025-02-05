import { useState } from 'react'
import './App.css'
import video from './backvideo.mp4'
import { upperCaseLetters,lowerCaseLetters,numbers,special } from './data';
import Modal from './Modal';

function App() {
  
  const [password,setPassword] = useState("");
  const [counter,setCounter] = useState(6);
  const [isUppercase,setisUppercase] = useState(false);
  const [isLowercase,setisLowercase] = useState(false);
  const [isNumber,setisNumber] = useState(false);
  const [isSymbol,setisSymbol] = useState(false);
  const [modal,setModal] = useState({
    title:"",
    show:false,
    message:"",
  });

  const increaseCounter = (e)=>{
    e.preventDefault();

    if(counter < 20){
      setCounter((prevcounter)=> prevcounter+1);
    }
  }

  const decreaseCounter = (e)=>{
    e.preventDefault();

    if(counter >6){
      setCounter((prevcounter)=> prevcounter-1);
    }
  }

  const generatePassword = (e) => {
    e.preventDefault();

    let _password = "";
    for (let i = 0; i < counter; i++) {
      _password +=getRandom();
    }
    setPassword(_password);
  };


  const getRandom = () =>{
    const chars = [];

    if(isUppercase){
      chars.push(upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)]);
    }
    if(isLowercase){
      chars.push(lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)]);
    }
    if(isNumber){
      chars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    if(isSymbol){
      chars.push(special[Math.floor(Math.random() * special.length)]);
    }

    if(chars.length ===0){
      return;
    }

    return chars[Math.floor(Math.random()*chars.length)];
  };

  const createCopy = ()=>{
    const textAreaEl = document.createElement("textarea");
    textAreaEl.innerText = password;
    document.body.appendChild(textAreaEl);
    textAreaEl.select();
    document.execCommand("copy");
    textAreaEl.remove();
  };

  const copyPasswordHandler=(e)=>{
    e.preventDefault();

    if(password.trim().length === 0){
      setModal({
        title:"Error",
        message:"There is nothing to copy",
        show:true,
      });
    }else{
      setModal({
        title:"success",
        message:"Password successfully copied to clipboard",
        show: true,
      });
    }

    createCopy();
  };

  const closeModalHandler = ()=>{
    setModal({...modal,show:false});
  };


  return (
   <div className="App">
    <video autoPlay muted loop className="background-video">
    <source src={video} type="video/mp4" />
    Your browser does not support the video tag.
    </video>

    {modal.show && <Modal onClose={closeModalHandler} title={modal.title} message={modal.message} />}

    <div className="generator">
      <h2 className='generator_title'>Password Generator</h2>
      <h4 className="password">{password}</h4>
   

    <form className='generator_form'>
      <div className="gererator_form-controls">
        <div className="generator_form-control">
          <label htmlFor="uppercase">Uppercase</label>
          <input type="checkbox"  id='uppercase' name='uppercase' checked={isUppercase} onChange={(e)=>setisUppercase(e.target.checked)}/>
        </div>
        
        <div className="generator_form-control">
          <label htmlFor="lowercase">Lowercase</label>
          <input type="checkbox" id='lowercase' name='lowercase' checked={isLowercase} onChange={(e)=>setisLowercase(e.target.checked)}/>
        </div>

        <div className="generator_form-control">
          <label htmlFor="numbers">Numbers</label>
          <input type="checkbox" id='numbers' name='numbers' checked={isNumber} onChange={(e)=>setisNumber(e.target.checked)}/>
        </div>

        <div className="generator_form-control">
          <label htmlFor="symbols">Symbols</label>
          <input type="checkbox" id='symbols' name='symbols' checked={isSymbol} onChange={(e)=>setisSymbol(e.target.checked)}/>
        </div>

        <div className="generator_length">
          <h4 className="generator_length-title">Password Length</h4>
          <div className="generator_length-counter">
            <button onClick={decreaseCounter}>-</button>
            <span>{counter}</span>
            <button onClick={increaseCounter}>+</button>
          </div>
        </div>

        <div className="generator_form-actions">
          <button onClick={generatePassword} className='btn generate-btn'><b>Generate Password</b></button>
          <button onClick={copyPasswordHandler} className='btn copy-btn'><b>Copy Password</b></button>
        </div>

      </div>
     </form>
    </div>
   </div>
  )
}

export default App
