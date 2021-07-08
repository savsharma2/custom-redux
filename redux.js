import React, { useState, useEffect, useContext } from "react";

const ReduxContext = React.createContext("redux");

export const Provider = ({ store, children }) => (
  <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
);

export const ACTION_INCREMENT = "increment";

export const createStore = (rootReducer, initialState = {}) => {
  let state = initialState,
    listners = [];

  const getState = () => {
    return state;
  };

  const subscribe = (fn) => {
    if (typeof fn === "function") {
      listners.push(fn);
    }
  };

  const dispatch = (action) => {
    state = rootReducer(state, action);
    listners.forEach((fn) => {
      fn(state);
    });
  };

  return { dispatch, subscribe, getState };
};

export const combineReducers = (reducers) => {
  const nextState = {};
  return (state = {}, action) => {
    Object.entries[reducers].forEach(([key, fn]) => {
      nextState[key] = fn(state[key], action);
    });

    return nextState;
  };
};

export const connect = (
  mapStateToProps = () => {},
  mapDispatchToProps = () => {}
) => (Component) => {
  // class Connect extends React.Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = props.store.getState();
  //   }

  //   componentDidMount() {
  //     this.props.store.subscribe((state) => {
  //       this.setState(state);
  //     });
  //   }

  //   render() {
  //     const { store } = this.props;

  //     return (
  //       <Component
  //         {...this.props}
  //         {...mapStateToProps(store.getState())}
  //         {...mapDispatchToProps(store.dispatch)}
  //       />
  //     );
  //   }
  // }

  const Connect = (props) => {
    const { store } = props;
    const [state, setState] = useState(store.getState());
    useEffect(() => {
      store.subscribe((st) => {
        setState(st);
      });
    }, [store]);

    return (
      <Component
        {...props}
        {...mapStateToProps(state)}
        {...mapDispatchToProps(store.dispatch)}
      />
    );
  };

  return (props) => (
    <ReduxContext.Consumer>
      {(store) => <Connect {...props} store={store} />}
    </ReduxContext.Consumer>
  );
};

export const useDispatch = () => {
  const store = useContext(ReduxContext);
  return store.dispatch;
};

export const useSelector = (fn) => {
  const store = useContext(ReduxContext);
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(st => {
      setState(st);
    });
  },[store]);
  return fn(state);
};
