import React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage, GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => (
<Layout>
  <Seo />
  <section className="hero">
    <figure>
    <StaticImage
      src="../images/hero.jpg"
      alt=""
      layout="fullWidth"
      style={{ height :"100%"}}
    />
    </figure>
    <div className="catch">
      <h1>There is no love sincerer than<br /> the love of food.</h1>
      <p>食物を愛するよりも誠実な愛はない ― バーナード・ショー</p>
    </div>
    <div className="wave">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1366 229.5"
        fill="#fff"
      >
        <path
          d="M1369,6.3C1222.5-12.2,1189.5,8,919.2,96.6C665,179.8,160,141.7-2,53.1v150l1371-14.2V6.3z"
          opacity=".53"
        />
        <path d="M1369 229.5V55.8c-9.5-2.4-19.2-4.4-28.9-5.8-196.9-29.9-203.4-15.8-503.9 82.6-219.8 72-627.6 53.2-838.2-10.5v107.4h1371z" />
      </svg>
    </div>
  </section>
  <section className="food">
    <div className="container">
      <h2 className="bar">Food <span>Essence</span></h2>
      <div className="details">
        <div className="detail">
          <figure>
          <StaticImage
            src="../images/fruit.jpg"
            alt=""
            layout="constrained"
            style={{ width :"320px"}}
          />
          </figure>
          <h3>フルーツ</h3>
          <p>FRUIT</p>
          <p>甘くてすっぱくておいしい果実たち。<br />旬のフルーツを満喫します。</p>
        </div>
        <div className="detail">
          <figure>
          <StaticImage
            src="../images/grain.jpg"
            alt=""
            layout="constrained"
            style={{ width :"320px"}}
          />
          </figure>
          <h3>穀物</h3>
          <p>GRAIN</p>
          <p>食事の基本となる穀物。<br />毎日の活動のエネルギー源になります。</p>
        </div>
        <div className="detail">
          <figure>
          <StaticImage
            src="../images/beverage.jpg"
            alt=""
            layout="constrained"
            style={{ width :"320px"}}
          />
          </figure>
          <h3>飲み物</h3>
          <p>BEVERAGE</p>
          <p>リラックスするのに欠かせない飲み物。<br />お気に入りの一杯はありますか？</p>
        </div>
      </div>
    </div>
  </section>
  <section className="photo">
    <h2 className="sr-only">Photo</h2>
    <figure>
    <StaticImage
      src="../images/berry.jpg"
      alt=""
      layout="fullWidth"
      style={{ height :"100%"}}
    />
    </figure>
  </section>
  <section>
      <div className="container">
        <h2 className="sr-only">RECENT POSTS</h2>
        <div className="posts">
        {data.allContentfulBlogPost.edges.map(({node}) => (
          <article className="post" key={node.id}>
            <Link to={`/blog/post/${node.slug}`}>
              <figure>
                <GatsbyImage image={node.eyecatch.gatsbyImageData} alt={node.eyecatch.description} style={{ height: "200px" , width: "573px"}}/>
              </figure>
              <h3>{node.title}</h3>
            </Link>
          </article>
          ))}
        </div>
      </div>
    </section>
</Layout>
)

export const query = graphql`
query{
  allContentfulBlogPost(
    sort: {order: DESC, fields: publishDate}
    limit: 4
    skip: 0
  ) {
    edges {
      node {
        title
        id
        slug
        eyecatch {
          gatsbyImageData(width: 573, layout: CONSTRAINED)
          description
        }
      }
    }
  }
}
`

export default IndexPage