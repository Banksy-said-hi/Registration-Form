import React from 'react'

const page = ({ params }) => {
  
  return (
    <h1>
      ID: {params.id}
      <br>
      </br>
      {/* {searchParams.content} */}
    </h1>
  )
}

export default page
