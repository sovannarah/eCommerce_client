import React from 'react'

const Suggestions = (props) => {
  // console.log(props)
  const options = Object.keys(props.results).map((r) => (
    <li key={r.id}>
      {r.title}
    </li>
  ))
  return <ul>{options}</ul>
}


export default Suggestions;