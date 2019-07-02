import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Typography from "@material-ui/core/Typography"
import VideoCard from "../components/VideoCard"
import Chip from "@material-ui/core/Chip"
import Avatar from "@material-ui/core/Avatar"

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    marginBottom: ".2em",
  },
  backButton: {
    textDecoration: "none",
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
  instructorChips: {
    marginLeft: 10,
    background: "none",
  },
})

const InstructorPage = ({ data, classes, pageContext }) => {
  const itemsWithInstructor = data.allItem.edges

  console.log(itemsWithInstructor[0].node)

  return (
    <Layout>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom align="center" component="h1">
          {itemsWithInstructor.length} videos by
          <Chip
            avatar={
              <Avatar
                alt="Instructor image"
                src={itemsWithInstructor[0].node.optimized_instructor_image.childImageSharp.fluid.src}
              />
            }
            label={pageContext.instructor}
            variant="outlined"
            className={classes.instructorChips}
          />
        </Typography>

        <div className={classes.flexBoxParentDiv}>
          {itemsWithInstructor.map((item, index) => (
            <VideoCard item={item} key={index} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default withStyles(styles)(InstructorPage)

export const InstructorPageQuery = graphql`
  query InstructorPage($instructor: String) {
    site {
      siteMetadata {
        title
      }
    }
    allItem(filter: { instructor: { in: [$instructor] } }) {
      totalCount
      edges {
        node {
          id
          move
          videoUrl
          optimized_thumbnail {
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
          optimized_instructor_image {
            childImageSharp {
              fluid(maxHeight: 50) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
