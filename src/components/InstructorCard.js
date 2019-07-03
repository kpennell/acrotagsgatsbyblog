import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Link from "gatsby-link"
import { kebabCase } from "lodash"
import Avatar from "@material-ui/core/Avatar"
import Chip from "@material-ui/core/Chip"
 
const styles = theme => ({
  card: {
    width: 300,
    margin: 10,
    borderRadius: 15,
    [theme.breakpoints.down('sm')]: {
      width:"42vw"
    },
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
  },
  instructorAvatar: {
    width: 40,
    height: 40,
    [theme.breakpoints.down('sm')]: {
      width:25,
      height:25
    },
  },
  instructorChips: {
    marginLeft: 0,
    fontSize:"1.3rem",
    height:40,
    background: "none",
    [theme.breakpoints.down('sm')]: {
      height:25,
      fontSize:"1rem"
    

    },
  },
})

function InstructorCard(props) {
  const { classes, item } = props

  //console.log(item);

  return (
    <Card className={classes.card}>
      <Link
        style={{ textDecoration: "none" }}
        to={`/instructor/${kebabCase(item.instructor)}/`}
      >
        <CardContent className={classes.cardContent}>
          <div>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {item.numberOfVideos}{" "}
              {item.numberOfVideos > 1 ? "videos" : "video"}
            </Typography>
  

            <Chip
            avatar={
              <Avatar
                alt="Instructor image"
                src={item.optimized_instructor_image.childImageSharp.fluid.src}
                className={classes.instructorAvatar}
              />
            }
            label={item.instructor}
            variant="outlined"
            className={classes.instructorChips}
          />
          </div>


        </CardContent>
      </Link>
    </Card>
  )
}

export default withStyles(styles)(InstructorCard)
