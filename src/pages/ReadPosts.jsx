import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'

const ReadPosts = () => {
  const [posts, setPosts] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('Posts')
          .select()
          .order('created_at', { ascending: true })

        if (error) throw error

        setPosts(data)
      } catch (error) {
        console.error('Fetch error:', error)
        setErrorMsg(error.message)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="ReadPosts">
      {errorMsg && <p style={{ color: 'red' }}>⚠️ {errorMsg}</p>}
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Card
            key={post.id}
            id={post.id}
            title={post.title}
            author={post.author}
            description={post.description}
          />
        ))
      ) : (
        <h2>{'No Challenges Yet 😞'}</h2>
      )}
    </div>
  )
}

export default ReadPosts
