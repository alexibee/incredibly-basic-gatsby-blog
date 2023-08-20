import * as React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledHeader = styled.h1`
  margin-bottom: 20px;
`
const StyledBlogTitle = styled.h3`
  margin-bottom: 10px;
  padding: 0 10px;
  color: var(--color-primary);
`
const StyledExcerpt = styled.p`
  padding: 0 15px;
  font-style: italic;
`

const Index = ({ data }) => (
  <Layout>
    <div>
      <StyledHeader>Incredibly basic blog</StyledHeader>
      <span> Total posts: {data.allMarkdownRemark.totalCount}</span>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <StyledLink to={node.fields.slug}>
            <StyledBlogTitle>
              {node.frontmatter.title} - {node.frontmatter.date}
            </StyledBlogTitle>
          </StyledLink>
          <StyledExcerpt>{node.excerpt}</StyledExcerpt>
        </div>
      ))}
    </div>
  </Layout>
)

export default Index

export const Head = () => <Seo title="Home" />

export const query = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
          excerpt
          html
        }
      }
    }
  }
`
