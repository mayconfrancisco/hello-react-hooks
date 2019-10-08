import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  // useState - Controla o estado - desestruturamos o retorno recebendo o estado e uma funcao para altera-lo
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  // useCallback - retorna uma funcao
  // Sempre que temos uma funcao dentro de nossa funcao do componente com nossos estados,
  // toda vez que o estado mudar o JS remonta nossas funcoes o que gera processamento desnecessario
  // o useCallback encapsula nossas funcoes evitando esse problema
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

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

    // podemos retornar uma funcao em cada um dos useEffect
    // esta funcao sera executada sempre que o componente for desmontado/removido da tela
    // ou seja, podemos substituir o WillUnmount
    // return () => document.removeEventListener();
  }, [tech]);

  // useMemo monitora uma dependencia e entao executa uma funcao com um unico retorno, sempre que a dependencia mudar
  // excelente para quando precisamos mostrar no render algum resultado de uma funcao
  // ao inves de executa-la a cada render, a funcao sera executada apenas quando a dependencia mudar
  const techSize = useMemo(() => tech.length, [tech]);

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
      <br />
      <strong>Você possui {techSize} tecnologias</strong>
    </>
  );
}

export default App;
