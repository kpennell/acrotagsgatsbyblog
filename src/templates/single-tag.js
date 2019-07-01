import React from "react"
import { withStyles } from "@material-ui/core/styles"

import { graphql } from "gatsby"
import Layout from "../components/layout"

import Typography from "@material-ui/core/Typography"
import VideoCard from "../components/VideoCard"
import Chip from "@material-ui/core/Chip"
import Label from '@material-ui/icons/Label';

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
  chipLabel:{
    color: "#c5c5c5",

  },
  tagChips:{
    fontSize:20,
    marginLeft:5,


}
})

const TagPage = ({ data, classes, pageContext }) => {
  const itemsWithTag = data.allItem.edges

  return (
    <Layout>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom align="center" component="h1">
          {itemsWithTag.length} {itemsWithTag.length > 1 ? 'videos' : 'video'} tagged with
          <Chip icon={<Label className={classes.chipLabel} />} label={pageContext.tag} key={pageContext.tag.toString()} className={classes.tagChips}/>
        </Typography>

        <div className={classes.flexBoxParentDiv}>
          {itemsWithTag.map(item => (
            <VideoCard item={item} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default withStyles(styles)(TagPage)

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allItem(filter: { tags: { in: [$tag] } }) {
      totalCount
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
