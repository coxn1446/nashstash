# Test Suite Organization

This directory contains all test files for the Nash Stash application. Tests are organized by feature area for better maintainability.

## Test File Structure

### App Integration Tests
These test files cover the main App component and routing integration:

- **`App.test.js`** - Basic rendering, initialization, and routing tests

### Component Tests
Tests for individual React components (to be added as components are created):

- **`Loading.test.js`** - Loading component tests (to be created)
- **`[ComponentName].test.js`** - Component-specific tests (to be created as components are added)

### Route Tests
Tests for route components (to be added as routes are created):

- **`Home.test.js`** - Home route tests (to be created)
- **`NotFound.test.js`** - 404 route tests (to be created)
- **`[RouteName].test.js`** - Route-specific tests (to be created as routes are added)

### Helper Tests
Tests for utility functions (to be added as helpers are created):

- **`authHelpers.test.js`** - Authentication helpers (to be created when auth is implemented)
- **`[helperName]Helpers.test.js`** - Helper-specific tests (to be created as helpers are added)

### Store Tests
Tests for Redux state management (to be added as reducers are created):

- **`auth.reducer.test.js`** - Auth reducer tests (to be created when auth is implemented)
- **`global.reducer.test.js`** - Global reducer tests (to be created)
- **`native.reducer.test.js`** - Native reducer tests (to be created)
- **`[reducerName].reducer.test.js`** - Reducer-specific tests (to be created as reducers are added)

### Game Tests
Tests for game-specific features (to be added as games are developed):

- **`[GameName].test.js`** - Game-specific tests (to be created as games are added)

## Shared Test Utilities

### `__mocks__/` (to be created as needed)
Shared test utilities and mocks:
- Fetch mocking utilities
- Component mocks
- Store mocks
- Native platform mocks

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run a specific test file:
```bash
npm test -- App.test.js
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Test Organization Principles

1. **Feature-based grouping** - Tests are grouped by feature area (auth, games, etc.)
2. **Shared utilities** - Common mocks and helpers should be in `__mocks__/` directory
3. **Component isolation** - Component tests focus on component behavior
4. **Integration tests** - App tests verify routing and feature integration
5. **Helper tests** - Utility functions have dedicated test files
6. **Game tests** - Each game should have its own test file

## Adding New Tests

When adding new features:

1. **New component** → Create `ComponentName.test.js` in `src/tests/`
2. **New route** → Create `[RouteName].test.js` in `src/tests/` or add to `App.test.js` for integration tests
3. **New helper** → Create `[helperName]Helpers.test.js` in `src/tests/`
4. **New reducer** → Create `[reducerName].reducer.test.js` in `src/tests/`
5. **New game** → Create `[GameName].test.js` in `src/tests/`

## Test Patterns

### Component Testing
```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import ComponentName from '../components/ComponentName';

test('renders component', () => {
  render(<ComponentName />);
  // assertions
});
```

### Route Testing
```javascript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/rootReducer';
import RouteName from '../routes/RouteName';

test('renders route', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <RouteName />
      </BrowserRouter>
    </Provider>
  );
  
  // Wait for lazy-loaded components
  await waitFor(() => {
    // assertions
  });
});
```

### Helper Testing
```javascript
import { helperFunction } from '../helpers/helperHelpers';

test('helper function works correctly', () => {
  const result = helperFunction(input);
  expect(result).toBe(expected);
});
```

### Reducer Testing
```javascript
import reducer, { action } from '../store/reducerName';

test('handles action correctly', () => {
  const initialState = { /* initial state */ };
  const newState = reducer(initialState, action(payload));
  expect(newState).toEqual(expectedState);
});
```

## Current Test Coverage

- ✅ Basic app rendering (`App.test.js`)
- ⏳ Component tests (to be added as components are created)
- ⏳ Route tests (to be added as routes are created)
- ⏳ Helper tests (to be added as helpers are created)
- ⏳ Reducer tests (to be added as reducers are created)
- ⏳ Game tests (to be added as games are developed)

## Notes

- All route components are lazy-loaded, so use `waitFor` when testing routes
- Use React Router future flags in tests to avoid deprecation warnings
- Mock external dependencies (Firebase, native APIs, etc.) as needed
- Keep tests focused and isolated
- Update this README as new test files are added

