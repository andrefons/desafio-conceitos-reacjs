import React, { useState, useEffect } from "react";

import "./styles.css";
//import Axios from "axios";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`).then(() => {
      setRepositories(repositories.filter((repo) => repo.id != id));
    });
  }

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>

      <ul data-testid="repository-list">
        {repositories.map((repository) =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
