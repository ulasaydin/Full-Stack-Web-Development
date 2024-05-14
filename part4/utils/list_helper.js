const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const maxLikes = Math.max(...blogs.map(blog => blog.likes));
  const favoriteBlog =  blogs.find(blog => blog.likes === maxLikes);

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  };
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const blogCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }
  , {});

  const authorWithMostBlogs = Object.keys(blogCounts).reduce((a, b) => blogCounts[a] > blogCounts[b] ? a : b);
  const mostBlogs = blogCounts[authorWithMostBlogs];

  return {
    author: authorWithMostBlogs,
    blogs: mostBlogs
  };

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};

