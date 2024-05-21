
import './App.css';
import {useState, useEffect} from 'react'

function App() {

  const [token, setToken] = useState("");
  const [logError, setLogError]= useState(false);
  const [regError, setRegError]= useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [log, mostraLog] = useState(false);
  const [reg, mostraReg] =useState(false);
  const [aggiunto, setAggiunto] = useState(false);
  const [dati, mostraDati] = useState(false);
  const [id, setID] = useState("");
  const [register_date, setRegister_date] = useState("");

  async function registra(){
    const response = await fetch("http://localhost:8080/signup",{
      method: "POST",
      body: JSON.stringify({"username":user,"password":pass,"email":email})

    });
    const rispostaJson = await response.json();
    setAggiunto(rispostaJson.status);
    if(!rispostaJson.status){
      setRegError(true);
    } else{
      setRegError(false);
      mostraReg(false);
    }
    
  } 

  async function login(){
    const response = await fetch("http://localhost:8080/login",{
      method: "POST",
      body: JSON.stringify({"username":user,"password":pass})

    })
    const rispostaJson = await response.json();
    setToken(rispostaJson.token);
    if(rispostaJson.token!=""){
      const response = await fetch("http://localhost:8080/user/"+rispostaJson.token,{method: "GET"})
      const risposta = await response.json();
      setID(risposta.id);
      setRegister_date(risposta.reg_date);
      mostraDati(true);
      setLogError(false)
      mostraLog(false);
      setEmail(risposta.email);
      
    } else{
      setLogError(true);
    }
  }
  
  function handleEmail(e){
    setEmail(e.target.value);
  }

  function handleUser(e){
    setUser(e.target.value);
  }

  function handlePass(e){
    setPass(e.target.value);
  }

  function reset(){
    mostraDati(false);
    setToken("");
  }

  function formReg(){
    mostraReg(true);
    mostraLog(false);
  }

  function formLog(){
    mostraReg(false);
    mostraLog(true);
  }

  return (
    <div className="App">

    { dati ?
       
        <>
          <p>dati dell'utente {email}</p>
          <p>id: {id}</p>
          <p>username: {user}</p>
          <p>token: {token}</p>
          <p>reg date: {register_date}</p>
          <button onClick={reset}>logout</button>
        
       </>
      :
      <>
      { reg ?
          <div>
            <input type='email' placeholder='email' onChange={handleEmail}></input>
            <input type='text' placeholder='username' onChange={handleUser}></input>
            <input type='password' placeholder='password' onChange={handlePass}></input>
            <button onClick={()=>registra()}>registra</button>
            { regError &&
              <>
                <h2>errore nella registrazione</h2>
              </>
            }
          </div>
        :

        <button onClick={formReg}>registrati</button>
      }

      { log ?
          <div>
            <input type='text' placeholder='username' onChange={handleUser}></input>
            <input type='password' placeholder='password' onChange={handlePass}></input>
            <button onClick={()=>login()}>login</button>
            { logError &&
              <>
                <h2>errore nel login</h2>
              </>
            }
          </div>
        :

        <button onClick={formLog}>login</button>
      }

      { aggiunto &&
        <div>
        <h2>aggiunto con successo</h2>
        <button onClick={()=>setAggiunto(false)}>chiudi</button>
        </div>
      }
      </>
    }
      

    </div>
  );
}

export default App;
