import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store/rootReducer';
import App from '../components/App';

test('renders app shell', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App />
      </BrowserRouter>
    </Provider>
  );
  
  // Wait for lazy-loaded component to resolve
  const heading = await waitFor(() => screen.getByText(/Nash Stash/i));
  expect(heading).toBeInTheDocument();
});

