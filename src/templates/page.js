import React, { Fragment } from 'react'
import Img from 'gatsby-image'
import BackToPrevious from 'components/BackToPrevious'
import parseEmoji from 'helpers/emoji'

const Page = props => {
  const { data } = props
  const { transition } = props
  const { markdownRemark: post } = data
  const { backTo, backLabel } = post.frontmatter
  const style = post.frontmatter.style || ''

  return (
    <div style={transition && transition.style}>
      <div className={style + ' page'}>
        {!!backTo &&
          backLabel && <BackToPrevious to={backTo} label={backLabel} />}
        {style === 'index' && (
          <div className="index-me-wrapper">
            {!!post.frontmatter.featuredImage && (
              <Img
                fadeIn={false}
                outerWrapperClassName="index-me"
                sizes={{
                  ...post.frontmatter.featuredImage.childImageSharp.sizes,
                  base64:
                    post.frontmatter.featuredImage.childImageSharp.sqip.dataURI
                }}
              />
            )}
          </div>
        )}
        <div>
          <h1>{parseEmoji(post.frontmatter.title)}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    </div>
  )
}

export default Page

export const PageQuery = graphql`
  query Page($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        style
        featuredImage {
          childImageSharp {
            sqip(numberOfPrimitives: 50, blur: 0, width: 400) {
              dataURI
              svg
            }
            sizes(maxWidth: 600) {
              ...GatsbyImageSharpSizes_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`
