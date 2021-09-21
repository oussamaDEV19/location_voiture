import { createStore } from 'redux';

import rootReducers from './store/reducers/Index';

const store = createStore(rootReducers);

export default store;