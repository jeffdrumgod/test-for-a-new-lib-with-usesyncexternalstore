import { createStore } from "./store-lib";
// --------
export const store = createStore(
  { count: 0, text: "hello", jsonData: [] },
  {
    selectors: {
      getTodoListFormated: (state) => {
        const { jsonData } = state;

        return jsonData.map(({ id, title }) => {
          return {
            id,
            title: title.toUpperCase()
          };
        });
      }
    },
    effects: ({ getState, setState }) => {
      return {
        getRemoteApiCall: async () => {
          console.log("getRemoteApiCall called");
          // return promise com o que eu quiser
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/"
          );
          const data = await response.json();
          setState((prev) => ({ ...prev, jsonData: data }));
        }
      };
    }
  }
);
