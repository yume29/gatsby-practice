import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"


const BlogPage = ({ data, location, pageContext }) => (
  <Layout>
  <Seo 
    pagetitle="ブログ"
    pagedesc="ESSENTIALのブログです"
    pagepath={location.pathname}/>
    <section className="content bloglist">
      <div className="container">
        <h1 className="bar">RECENT POSTS</h1>
        <div className="posts">
        {data.allContentfulBlogPost.edges.map(({node}) => (
          <article className="post" key={node.id}>
            <Link to={`/blog/post/${node.slug}`}>
              <figure>
              <GatsbyImage
                image={node.eyecatch.gatsbyImageData}
                alt={node.eyecatch.description}
                style={{ height: "100%" }}
              />
              </figure>
              <h3>{node.title}</h3>
            </Link>
          </article>
          ))}
        </div>
        <ul class="pagenation">
          {!pageContext.isFirst && (
            <li class="prev">
                <Link to={
                  pageContext.currentPage === 2
                  ? `/blog/`
                  : `/blog/${pageContext.currentPage - 1}/`
                }
                rel="prev"
                >
                    <FontAwesomeIcon icon={faChevronLeft}/>
                    <span>前のページ</span>
                </Link>
            </li>
            )}
            {!pageContext.isLast && (
            <li class="next">
              <Link to={`/blog/${pageContext.currentPage + 1}/`} rel="next">
                    <span>次のページ</span>
                    <FontAwesomeIcon icon={faChevronRight}/>
              </Link>
            </li>
            )}
        </ul>

      </div>
    </section>
  </Layout>
)

export const query = graphql`
query($skip: Int!, $limit: Int!){
  allContentfulBlogPost(
    sort: {order: DESC, fields: publishDate}
    limit: $limit
    skip: $skip
  ) {
    edges {
      node {
        title
        id
        slug
        eyecatch {
          gatsbyImageData(width: 500, layout: CONSTRAINED)
          description
        }
      }
    }
  }
}
`

export default BlogPage