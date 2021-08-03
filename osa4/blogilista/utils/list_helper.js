// tehdään joukko apufunktioita blogien käsittelyyn
// testit myös

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map((blog) => blog.likes)
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const sorted = blogs.sort((a, b) => a.likes - b.likes)
    const blogWithMostLikes = sorted[sorted.length - 1]
    return blogWithMostLikes
}

const mostBlogs = (blogs) => {
    let authors = new Map()

    blogs.map((blog) => {
        if (authors.has(blog.author)) {
            authors.set(blog.author, authors.get(blog.author) + 1)
        } else {
            authors.set(blog.author, 1)
        }
    })

    const sorted = Array
        .from(authors)
        .sort((a, b) => {
            return a[1] - b[1]
        })
    return { author: sorted[sorted.length - 1][0], blogs: sorted[sorted.length - 1][1] }
}

const mostLikes = (blogs) => {
    let authors = new Map()

    blogs.map((blog) => {
        if (authors.has(blog.author)) {
            authors.set(blog.author, authors.get(blog.author) + blog.likes)
        } else {
            authors.set(blog.author, blog.likes)
        }
    })

    const sorted = Array
        .from(authors)
        .sort((a, b) => {
            return a[1] - b[1]
        })
    return { author: sorted[sorted.length - 1][0], likes: sorted[sorted.length - 1][1] }

}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}