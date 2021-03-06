import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

// const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(thunk), // eslint-disable-next-line no-underscore-dangle, no-undef
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
