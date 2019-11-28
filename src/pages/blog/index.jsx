import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import Layout from '~src/layouts/Layout';
import SEO from '~src/components/SEO';
import formatReadingTime from '~src/helpers/formatReadingTime';

function BlogIndex() {
  const { allMarkdownRemark, allMdx } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {
                date(formatString: "DD MMMM, YYYY", locale: "ru-RU")
                title
              }
              timeToRead
            }
          }
        }
      }
    `,
  );

  const posts = allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO
        title="Все посты"
        keywords={[`блог`, `gatsby`, `javascript`, `react`]}
      />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <div style={{ marginTop: '2rem' }} key={node.fields.slug}>
            <h3>
              <Link to={`/${node.fields.slug}`}>{title}</Link>
            </h3>
            <small>
              {node.frontmatter.date} • {formatReadingTime(node.timeToRead)}
            </small>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        );
      })}
    </Layout>
  );
}

export default BlogIndex;
