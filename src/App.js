import React, { useEffect, useState} from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    api.get('repositories').then( titles =>{
      setRepositories(titles.data)
    })
 
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories', {title: "teste", url: "github", techs:['RodeJS', 'React'] })
      setRepositories([...repositories, response.data])
    }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories/'+ id)
    const repo = repositories.filter( repository => repository.id !== id)
    setRepositories(repo)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repository => (<li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
