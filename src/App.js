import Naboo from './components/naboo/Naboo'
import { Provider } from 'react-redux'

import store from './store/index'


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Naboo appName="naboo"></Naboo>
      </Provider>
    </div>
  );
}

export default App;

