import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, StaticQuery, graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"
import InstructorCard from "../components/InstructorCard"

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    margin: 10,
    width: 70,
    height: 70,
  },
  ListItemParentDiv: {
    display: "flex",
  },
  flexBoxParentDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    "&::after": {
      content: "",
      flex: "auto",
    },
  },
})

class InstructorPage extends React.Component {
  render() {
    const classes = this.props.classes

    let items = this.props.data.allItem.edges

    let uniqueInstructorsWithLengthAndImage = []
    const map = new Map()
    for (const item of items) {
      if (!map.has(item.node.instructor)) {
        map.set(item.node.instructor, true)
        uniqueInstructorsWithLengthAndImage.push({
          instructor: item.node.instructor,
          instructor_image: item.node.instructor_image,
          numberOfVideos: items.filter(
            innerItem => innerItem.node.instructor === item.node.instructor // check if instructor matches
          ).length,
        })
      }
    }
    return (
      <Layout>
        <SEO title="AcroTags | Explore AcroYoga Videos by Instructor" />
        <div className={classes.root}>
          <div className={classes.flexBoxParentDiv}>
            <div className={classes.flexBoxParentDiv}>
              {uniqueInstructorsWithLengthAndImage.map(item => (
                <InstructorCard item={item} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withStyles(styles)(InstructorPage)

export const query = graphql`
  query InstructorsQuery {
    allItem {
      edges {
        node {
          id
          move
          videoUrl
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 400, maxHeight: 250) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          title
          tags
          level
          instructor
          instructor_image
        }
      }
    }
  }
`
