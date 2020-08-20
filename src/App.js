import React, {useState, useEffect} from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const product = {
      url: "https://github.com/Rocketseat/umbriel",
      title: "Umbriel " + Date.now(),
      techs: ["Node", "Express", "TypeScript"]
    }
    
    const {data} = await api.post("/repositories", product);
    
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    
    const deletedIndex = repositories.findIndex(repository => repository.id === id);
    
    let updatedRepositories = [...repositories];
    
    updatedRepositories.splice(deletedIndex, 1);
    
    setRepositories([...updatedRepositories]);
  }

  useEffect(()=>{
    const getRepositories = async () => {
      const {data} = await api.get("/repositories");
      setRepositories(data);
    }

    getRepositories();
  }, [setRepositories])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
