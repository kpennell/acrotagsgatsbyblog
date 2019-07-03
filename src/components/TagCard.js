import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Link from "gatsby-link"
import { kebabCase } from "lodash"
import Chip from "@material-ui/core/Chip"
import Label from '@material-ui/icons/Label';

const styles = theme => ({
  card: {
    width: 240,
    margin: 10,
    borderRadius: 15,
    [theme.breakpoints.down('sm')]: {
      width:"42vw"
    },
  },
  title: {
    fontSize: 14,

  },
  chipLabel:{
    color: "#c5c5c5",
  },
  tagChips:{
    fontSize:20,
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
    },
  }
})

function TagCard(props) {
  const { classes, tag } = props

  return (
    <Card className={classes.card}>
      <Link style={{ textDecoration: "none" }} to={`/tag/${kebabCase(tag.tagName)}/`}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {tag.numberOfVideos} {tag.numberOfVideos > 1 ? "videos" : "video"}
          </Typography>
  
          <Chip icon={<Label className={classes.chipLabel} />} label={tag.tagName} key={tag.tagName.toString()} className={classes.tagChips}/>
        </CardContent>
      </Link>
    </Card>
  )
}

export default withStyles(styles)(TagCard)
