const getToken = async (user) => {
  if (!user) return null
  return user.getIdToken()
}

export const fetchCommittee = async (user) => {
  const token = await getToken(user)
  const res = await fetch("http://localhost:5000/committee", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}


export const fetchBlog = async (user) => {
  const token = await getToken(user)
  const res = await fetch("http://localhost:5000/blog", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

export const deleteBlog = async (id, user) => {
  const token = await getToken(user)
  const res = await fetch(`http://localhost:5000/blog/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  if (!res.ok) {
     alert("Blog delete unuccessfully")
    throw new Error("Failed to delete blog")
  }
  alert("Blog deleted successfully")
  return res.json()
}

export const saveUser = async (userData) => {
  const res = await fetch("http://localhost:5000/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })
  if (!res.ok) throw new Error("Failed to save user")
  return res.json()
}