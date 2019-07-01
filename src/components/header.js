import { Link } from "gatsby"
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const styles = {
  root: {
    flexGrow: "1 !important",
  },
  appbar: {
    backgroundColor: "#177e89",
  },
  grow: {
    flexGrow: 1,
    color: "white",
    textDecoration: `none`,
  },
  link: {
    color: `white`,
    textDecoration: `none`,
  },
  pageTitle: {
    color: "white",
  },
}

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <div className={classes.grow}>
              <Link to="/" className={classes.link}>
                <Typography
                  className={classes.pageTitle}
                  variant="title"
                  component="h1"
                >
                  AcroTags
                </Typography>
              </Link>
            </div>
            <div>
              <Link to="/tags" className={classes.link}>
                <Button color="inherit" className={classes.grow}>
                  Tags
                </Button>
              </Link>
              <Link to="/instructors" className={classes.link}>
                <Button color="inherit" className={classes.grow}>
                  Instructors
                </Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Header)
