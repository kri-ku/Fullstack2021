import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
// CI=true npm test

describe('<Blog />', () => {
  test('renders title but not author, likes or url', () => {

    const blog = {
      title: 'Test blog',
      author: 'K. Kumila',
      url: 'www.blogtotest.net',
      likes: 12
    }

    const component = render(
      <Blog blog={blog} />
    )

    const div = component.container.querySelector('.blog')
    component.debug()

    expect(div).toHaveTextContent('Test blog')
    expect(div).not.toHaveTextContent('K. Kumila')
    expect(div).not.toHaveTextContent(12)
    expect(div).not.toHaveTextContent('www.blogtotest.net')
  })

  test('clicking the button shows likes and url', async () => {

    const blog = {
      title: 'Test blog',
      author: 'K. Kumila',
      url: 'www.blogtotest.net',
      likes: 12
    }

    const user = {
      username: 'darma',
      name: 'Kristiina'
    }
    const component = render(
      <Blog blog={blog} user={user}/>
    )

    expect(component.container).not.toHaveTextContent('www.blogtotest.net')
    expect(component.container).not.toHaveTextContent('K. Kumila')


    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog_show_all')
    expect(div).toHaveTextContent('www.blogtotest.net')
    expect(div).toHaveTextContent('K. Kumila')
  })

  test('when like button is clicked twice, event handler is called twice', () => {

    const blog = {
      title: 'Test blog',
      author: 'K. Kumila',
      url: 'www.blogtotest.net',
      likes: 12
    }

    const user = {
      username: 'darma',
      name: 'Kristiina'
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} addLikes={mockHandler} user={user}/>
    )
    const open_button = component.getByText('view')
    fireEvent.click(open_button)
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })

})

