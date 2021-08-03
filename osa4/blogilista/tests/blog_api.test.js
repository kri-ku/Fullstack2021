const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const { request } = require('../app')
const { userExtractor } = require('../utils/middleware')

let authorization = ''
let testUserId = ''

// needs fixing

beforeEach(async () => {
    const testUser = {
        "username": "TESTER",
        "name": "test",
        "password": "testing"
    }
    await User.deleteMany({})
    let userObject = new User(testUser)
    let addedUser = await userObject.save()
    console.log("ADDED USER)", addedUser)

    /*const addedUser = await api
        .post('/api/users')
        .send(testUser)
*/
    const logIn = {
        "username": "TESTER",
        "password": "testing"

    }
    const response = await api
        .post('/api/login')
        .send(logIn)

    const token = response.body.token
    console.log("TOKEN", response)
    authorization = `bearer ${token}`
    testUserId = addedUser._id
    console.log("TEST USER ID", addedUser._id)

    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)



})

describe('returns right amount of blogs as JSON', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

})

describe('id field is called id', () => {
    test('id field is id not __id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('blog can be added to db', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12
        }

        await api
            .post('/api/blogs')
            .set({ Authorization: authorization })
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const titles = blogsAtEnd.map(b => b.title)
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain('Canonical string reduction')
    })

    describe('test without likes', () => {
        test('if blog is posted without likes, likes will be zero', async () => {

            const newBlog = {
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
            }

            await api
                .post('/api/blogs')
                .set({ Authorization: authorization })
                .send(newBlog)
                .expect(200)

            const blogsAtEnd = await helper.blogsInDb()
            const likes = blogsAtEnd.map(b => b.likes)
            expect(likes).toContain(0)
        })
    })

})


describe('added blog has right content', () => {
    test('if new blog does not contain fields title and url status code is 400', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const newBlog = {
            author: "Robert C. Martin",
            likes: 3
        }

        await api
            .post('/api/blogs')
            .set({ Authorization: authorization })
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    })
})

describe('delete blog', () => {
    test('blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        //const blogToDelete = blogsAtStart[0]
        //const user = request.user

        const newBlog = {
            title: 'BlogtoDelete',
            author: 'K. Kumila',
            url: 'testi.com',
            likes: 7,
            user: testUserId
        }

        const blog = await api
            .post('/api/blogs')
            .set({ Authorization: authorization })
            .send(newBlog)

        const blogToDelete = blog.body.id
        //console.log("BLOG ID!", blog_id)

        //console.log("BLOG TO DELTE", blogToDelete)
        await api
            .delete(`/api/blogs/${blogToDelete}`)
            .set({ Authorization: authorization })
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length
        )
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).not.toContain(blogToDelete.title)
    })

})

describe('blog can be modified', () => {
    test('blog can be modified', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToModify = blogsAtStart[0]
        //console.log("BLOG TO MODIFY", blogToModify)
        const newBlogContent = {
            author: "Kristiina Kumila",
            likes: 300
        }

        await api
            .put(`/api/blogs/${blogToModify.id}`)
            .send(newBlogContent)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length
        )

        expect(blogsAtEnd[0]).toEqual({
            id: blogToModify.id,
            title: blogToModify.title,
            author: "Kristiina Kumila",
            url: blogToModify.url,
            likes: 300
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})