import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './modules';
import thunk from 'redux-thunk';

const enhancers = [];
const middleware = [thunk];

export default function configureStore() {
    const composedEnhancers = compose(
        applyMiddleware(...middleware),
        ...enhancers
    );

    return createStore(rootReducer, {}, composedEnhancers);
}