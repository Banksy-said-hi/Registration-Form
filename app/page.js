import React from 'react'

const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      cache: "no-store",
    })

    if(!res.ok) {
      throw new Error("Failed to fetch users")
    }

    return res.json()

  } catch (e) {
    console.log("Error loading users:", e);
  }
}

const page = async () => {
  const { users } = await getUsers();

  return (
    <>
      <div>
        Hi
        SINA
        {users.map((user) => {
          return (
          <div>
            <h1>{user.username}</h1>
            <p>{user.password}</p>
            <p>{user.email}</p>
          </div>          
          )
        })}
      </div>
    </>
  )
}

export default page



