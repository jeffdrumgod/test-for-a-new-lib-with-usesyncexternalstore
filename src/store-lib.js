import React, { useCallback } from "react";
import { useEffect } from "react";
import { useSyncExternalStore } from "react";

export const createStore = (
  initialState,
  { selectors: originalSelectors, effects: originalEffects }
) => {
  let state = initialState;
  const getState = () => state;
  const listeners = new Set();
  const setState = (fn) => {
    state = fn(state);
    listeners.forEach((l) => l());
  };
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  let selectors = {};

  if (originalSelectors) {
    selectors = Object.entries(originalSelectors).reduce(
      (stack, [name, fn]) => {
        Object.assign(stack, {
          [name]: () => fn(state)
        });

        // Object.defineProperty(state, name, {
        //   get() {
        //     return useCallback(() => fn(state), [state]);
        //   }
        // });

        return stack;
      },
      {}
    );
  }

  let effects = {};
  if (originalEffects && typeof originalEffects === "function") {
    effects = originalEffects({ getState, setState });
  }

  return { getState, setState, subscribe, effects, selectors };
};

export const useStore = (store, selector) =>
  useSyncExternalStore(
    store.subscribe,
    useCallback(() => {
      return selector(store.getState());
    }, [store, selector])
    // () =>
    //     selector({
    //       state: store.getState(),
    //       selectors: store.selectors
    //     }),
    //   [store, selector]
  );
