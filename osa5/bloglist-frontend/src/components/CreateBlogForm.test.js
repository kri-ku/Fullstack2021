import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm />', () => {

  test('when creating blog all the fields are right',() => {

    const createBlog = jest.fn()

    const component = render(<CreateBlogForm createBlog={createBlog} />)

    const form = component.container.querySelector('form')
    console.log(prettyDOM(form))

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, { target: { value :'Testing blog' } })
    fireEvent.change(author, { target: { value :'K. Kumila' } })
    fireEvent.change(url, { target: { value :'www.Testing blog.test' } })

    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)

    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Testing blog',
      author: 'K. Kumila',
      url: 'www.Testing blog.test'
    })

  })

})