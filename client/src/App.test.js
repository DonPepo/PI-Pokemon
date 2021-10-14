import React from 'react';
import App from './App';
import { mount, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LandingPage from './components/Landing/landing'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom'

configure({ adapter: new Adapter() });

describe("App", () => {
  let store;
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });
  describe('El componente LandingPage debe renderizar en la ruta /', () => {
    it('Debería renderizarse en la ruta "/"', () => {
      const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ '/' ]}>
              <App />
            </MemoryRouter>
          </Provider>
      );
        expect(wrapper.find(LandingPage)).toHaveLength(1);
    });
  });
})
