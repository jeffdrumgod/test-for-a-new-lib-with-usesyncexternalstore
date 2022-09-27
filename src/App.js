import { useStore } from "./store-lib";
import { store } from "./store";
import "./styles.css";

const App = () => {
  const todos = useStore(store, (state) => {
    return state.jsonData;
  });

  const getTodos = () => {
    console.log("getTodos called");
    store.effects.getRemoteApiCall();
  };

  return (
    <div className="App">
      <h1>Test for new lib with useSyncExternalStore</h1>
      <p>
        <button onClick={getTodos}>Get TODOs</button>
      </p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <thead>
          {todos.map(({ id, title }) => {
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
              </tr>
            );
          })}
        </thead>
      </table>
    </div>
  );
};

export default App;
