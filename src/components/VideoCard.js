import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Chip from "@material-ui/core/Chip"
import Typography from "@material-ui/core/Typography"
import Link from "gatsby-link"
import Label from "@material-ui/icons/Label"
import Avatar from "@material-ui/core/Avatar"

import { kebabCase } from "lodash"

const styles = {
  card: {
    width: 310,
    margin: 10,
  },
  cardContent: {
    height: 230,
  },
  media: {
    height: 170,
  },
  title: {
    lineHeight: 1.2,
    fontSize: "1.2rem",
  },
  tagChips: {
    margin: "3px 3px 3px 0px",
    height: 26,
  },
  tagArea: {
    marginTop: 10,
  },
  chipLabel: {
    color: "#c5c5c5",
  },
  instructorChips: {
    marginTop: 5,
    background: "none",
  },
}

function VideoCard(props) {
  const { classes, item } = props

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Link
          key={item.node.id}
          style={{ textDecoration: "none" }}
          to={`/video/${kebabCase(item.node.title)}/`}
        >
          <CardMedia className={classes.media} image={item.node.thumbnail} />
        </Link>
        <CardContent className={classes.cardContent}>
          <Link
            key={item.node.id}
            style={{ textDecoration: "none" }}
            to={`/video/${kebabCase(item.node.title)}/`}
          >
            <Typography variant="h5" component="h3" className={classes.title}>
              {item.node.title}
            </Typography>
          </Link>
          <Link
            to={`/instructor/${kebabCase(item.node.instructor)}/`}
            style={{ textDecoration: "none" }}
          >
            <Chip
              avatar={
                <Avatar
                  alt="Instructor image"
                  src={item.node.instructor_image}
                />
              }
              label={item.node.instructor}
              variant="outlined"
              clickable
              className={classes.instructorChips}
            />
          </Link>
          <div className={classes.tagArea}>
            {item.node.tags.map(tag => (
              <Link
                to={`/tag/${kebabCase(tag)}/`}
                style={{ textDecoration: "none" }}
              >
                <Chip
                  icon={<Label className={classes.chipLabel} />}
                  clickable
                  label={tag}
                  key={tag.toString()}
                  className={classes.tagChips}
                />
              </Link>
            ))}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default withStyles(styles)(VideoCard)
