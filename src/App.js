import React, { useState, useEffect } from 'react';

function App() {
  // useState - Controla o estado - desestruturamos o retorno recebendo o estado e uma funcao para altera-lo
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    setTech([...tech, newTech]);
    setNewTech('');
  }

  // useEffect substitui os metodos de ciclo de vida
  // recebe uma funcao que sera executada como primeiro parametro e um valor que fica ouvindo como segundo paramentro
  // ao perceber alteracoes na variavel executa a funcao
  // sem passar parametro algum o effect sera executado ao montar o componente, ou seja, substitui o didMount
  useEffect(() => {
    const storageTech = localStorage.getItem('@hooks/tech');
    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  // neste ouvimos o tech - todas as alteracoes no estado de tech jogamos os valores localstorage
  // desta forma conseguimos substitui o didUpdate por exemplo
  useEffect(() => {
    localStorage.setItem('@hooks/tech', JSON.stringify(tech));
  }, [tech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <input
        type="text"
        value={newTech}
        onChange={e => setNewTech(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
