const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const fs = require("fs")
const html =  fs.readFileSync('./file', 'utf8')
const {
  roblox: { Item }
} = new XMLParser().parse(html, {})
function walk(root) {
  let results = []
  // Use recursion to traverse the tree
  function recurse(node) {
    console.log(node)
    // Check if this node has LinkedSource
    if (node.Properties /* && node.Properties.int64*/) {
      // Add the node to the array
      results.push(node)
    }
    if (node?.Item?.forEach) {
      node?.Item?.forEach(recurse)
    }
  }
  // Start the recursion with the root node
  recurse(root)
  // Return the results
  return results
}

const scripts = walk(Item)

console.log(
  scripts.map((a) => a.Properties.int64).length,
  '',
  new Set(scripts.map((a) => a.Properties.int64)).size,
  ''
)

console.log(
  'Properties',
  new Set(scripts.flatMap((a) => Object.keys(a.Properties)))
)
console.log(
  new Set(
    scripts.map((a) => a.Properties.int64).filter((a) => a && !Array.isArray(a))
  )
) 
