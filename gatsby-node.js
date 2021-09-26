

const path = require("path")

exports.createPages = async({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogresult = await graphql(`
  query {
    allContentfulBlogPost(sort: {fields: publishDate, order: DESC}) {
      edges {
        node {
          id
          slug
        }
        next {
          title
          slug
        }
        previous {
          title
          slug
        }
      }
    }
    allContentfulCategory {
      edges {
        node {
          categorySlug
          id
          category
          blogpost {
            title
          }
        }
      }
    }
  }
  `)

  if(blogresult.errors){
    reporter.panicOnBuild(`GraphQLのクエリでエラーがが発生しました。`)
    return
  }

  blogresult.data.allContentfulBlogPost.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `/blog/post/${node.slug}/`,
      component: path.resolve(`./src/templates/blogpost-template.js`),
      context: {
        id: node.id,
        next,
        previous,
      },
    })
  })

  const blogPostPerPage = 6;
  const blogPosts = blogresult.data.allContentfulBlogPost.edges.length
  const blogPages = Math.ceil(blogPosts / blogPostPerPage )

  Array.from({length: blogPages}).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
      component: path.resolve("./src/templates/blog-template.js"),
      context: {
        skip: blogPostPerPage * i,
        limit: blogPostPerPage,
        currentPage: i + 1, //現在のページ番号
        isFirst: i + 1 === 1, //最初のページ
        isLast: i + 1 === blogPages, //最後のページ 
      },
    })
  })


  blogresult.data.allContentfulCategory.edges.forEach(({ node }) => {
    const catPostPerPage = 6;
    const catPosts = node.blogpost.length
    const catPages = Math.ceil(catPosts / catPostPerPage )

    Array.from({length: catPages}).forEach((_, i) => {
      createPage({
        path: i === 0 
        ? `/cat/${node.categorySlug}/` 
        : `/cat/${node.categorySlug}/${i + 1}/`,
        component: path.resolve("./src/templates/blog-template.js"),
        context: {
          catid: node.id,
          catname: node.category,
          catslug: node.categorySlug,
          skip: catPostPerPage * 1,
          limit: catPostPerPage,
          currentPage: i + 1, //現在のページ番号
          isFirst: i + 1 === 1, //最初のページ
          isLast: i + 1 === catPages, //最後のページ 
        },
      })
    })
  })
}