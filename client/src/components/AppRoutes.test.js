import React from 'react';
import { render, screen } from '@testing-library/react';
import AppRoutes from './AppRoutes';
import { MemoryRouter } from 'react-router';

jest.mock('../features/posts/PostsList', () => {
  const MockPostList = () => (
    <div>Your Matcher for PostList component.</div>
  );

  return MockPostList;
});

jest.mock('../features/posts/PostDetails', () => {
  const MockPostDetail = () => (
    <div>Your Matcher for PostDetails component.</div>
  );

  return MockPostDetail;
});

jest.mock('../features/posts/NewPostForm', () => {
  const NewPostForm = () => (
    <div>Your Matcher for NewPostForm component.</div>
  );

  return NewPostForm;
});

jest.mock('../features/posts/PostEditForm', () => {
  const PostEditForm = () => (
    <div>Your Matcher for PostEditForm component.</div>
  );

  return PostEditForm;
});

jest.mock('../constants', () => ({
  API_URL: 'hhtp://your-test-api-url',
}));

describe('AppRoutes component', () => {

  const renderWithRouter = (ui, { initialEntries = ['/']} = {}) => {
    return render(ui, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      )
    });
  };

  test('root path renders PostLists', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/'] });

    const expectedText = 'Your Matcher for PostList component.';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  test('root path renders PostDetails', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/posts/1'] });

    const expectedText = 'Your Matcher for PostDetails component.';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  test('/new path renders NewPostForm', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/new'] });

    const expectedText = 'Your Matcher for NewPostForm component.';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  test('/posts/:id/edit path renders PostEditForm', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/posts/1/edit'] });

    const expectedText = 'Your Matcher for PostEditForm component.';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
