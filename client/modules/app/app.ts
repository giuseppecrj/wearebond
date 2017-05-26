// YOUR CODE WILL GO HERE!
const render = (element) => {
  return (domContainerNode) => {
    domContainerNode.appendChild(element)
  }
}

const el = document.createElement('h1')
el.innerHTML = 'HS Starter Front End'

render(el)(document.getElementById('app-root'))
