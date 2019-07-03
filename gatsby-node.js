const path = require(`path`)
const axios = require("axios")
const _ = require("lodash")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
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
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const items = result.data.allItem.edges

    items.forEach(edge => {
      const id = edge.node.id
      const title = edge.node.title
      const videoPath = `/video/${_.kebabCase(title)}/`

      createPage({
        path: videoPath,
        component: path.resolve(`src/templates/single-item.js`),
        context: {
          itemId: id,
        },
      })
    })

    // Tag pages:
    let tags = []

    items.forEach(item => {
      if (item.node.tags.length > -1) {
        tags = tags.concat(item.node.tags)
      }
    })

    tags = _.uniq(tags)

    tags.forEach(tag => {
      const tagPath = `/tag/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/single-tag.js`),
        context: {
          tag,
        },
      })
    })

    let instructors = []

    items.forEach(item => {
      if (item.node.instructor.length > -1) {
        instructors = instructors.concat(item.node.instructor)
      }
    })

    instructors = _.uniq(instructors)

    instructors.forEach(instructor => {
      const instructorPath = `/instructor/${_.kebabCase(instructor)}/`

      createPage({
        path: instructorPath,
        component: path.resolve(`src/templates/single-instructor.js`),
        context: {
          instructor,
        },
      })
    })
  })
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const fetchFormItems = () =>
    axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/1Qyn6530gveP7wnLHswBH0a_6ndTbWE65hvMWY17313Y/values:batchGet?ranges=export&majorDimension=ROWS&key=AIzaSyC1XWLfbg_9cbaq6dw-eFROFVDpfp2XhxE`
    )

  const response = await fetchFormItems()

  const arrayOfItems = response.data.valueRanges[0].values

  let rows = []
  for (var i = 1; i < arrayOfItems.length; i++) {
    var rowObject = {}
    for (var j = 0; j < arrayOfItems[i].length; j++) {
      rowObject[arrayOfItems[0][j]] = arrayOfItems[i][j]
    }
    rows.push(rowObject)
  }

  console.log(rows);

  let itemsArrayWithTagsArray = rows.map(function(item) {
    item.tags = item.tags.split(",").map(item => item.trim())
    item = { ...item }
    return item
  })

  itemsArrayWithTagsArray.map((item, i) => {
    const itemNode = {
      id: createNodeId(`${i}`),
      parent: `__SOURCE__`,
      internal: {
        type: `item`, // name of the graphQL query --> allItem {}
        contentDigest: createContentDigest(item),
      },
      children: [],
      move: item.move,
      videoUrl: item.videoUrl,
      thumbnail: item.thumbnail,
      title: item.title,
      tags: item.tags,
      level: item.level,
      instructor: item.instructor,
      instructor_image: item.instructor_image,
    }

    createNode(itemNode)
  })
}
