import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock react-router-dom Link used by Home (so tests don't require the router package to resolve)
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>
}));

import Home from '../pages/Home';

// Simple smoke test to ensure Home page renders and the welcome heading is present.
test('renders home welcome heading', () => {
  render(<Home />);
  const heading = screen.getByRole('heading', { name: /Welcome to Aditya Shoor's Portfolio/i });
  expect(heading).toBeInTheDocument();
});
