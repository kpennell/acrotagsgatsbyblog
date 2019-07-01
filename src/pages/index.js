import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, StaticQuery, graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import VideoCard from "../components/VideoCard"

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

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

class IndexPage extends React.Component {
  render() {
    const classes = this.props.classes

    let items = this.props.data.allItem.edges

    return (
      <Layout>
        <SEO title="AcroTags" />
        <div className={classes.root}>
          <div className={classes.flexBoxParentDiv}>
            {items.map(item => (
              <div>
                <VideoCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export default withStyles(styles)(IndexPage)

export const query = graphql`
  query IndexQuery {
    allItem {
      edges {
        node {
          id
          move
          videoUrl
          thumbnail
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
