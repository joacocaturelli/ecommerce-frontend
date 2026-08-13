import { useSelector } from "react-redux"

function ProfilePage () {
  const {user, loading, error} = useSelector((state) => state.auth)

  return (
    <main className="page">
      <section className="container">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </section>
    </main>
  )
}

export default ProfilePage