import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header />

        <div
          style={{
            margin: `0 auto`,
            maxWidth: 1060,
            padding: `.5rem`,
            paddingTop: ".5rem",
          }}
        >
          <main>{children}</main>
        </div>
      </>
    )}
  />
)

export default Layout
