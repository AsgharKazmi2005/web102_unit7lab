import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'
import './EditPost.css'

const EditPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState({
    id: null,
    title: '',
    author: '',
    description: '',
  })
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  // ✅ Fetch the existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('Posts')
          .select()
          .eq('id', id)
          .single()

        if (error) throw error

        setPost({
          id: data.id,
          title: data.title,
          author: data.author,
          description: data.description,
        })
      } catch (error) {
        console.error('Fetch error:', error)
        setErrorMsg(error.message)
      }
    }

    fetchPost()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // ✅ Update post
  const updatePost = async () => {
    setErrorMsg(null)
    setSuccessMsg(null)

    const { error } = await supabase
      .from('Posts')
      .update({
        title: post.title,
        author: post.author,
        description: post.description,
      })
      .eq('id', id)

    if (error) {
      console.error('Update error:', error)
      setErrorMsg(error.message)
    } else {
      setSuccessMsg('✅ Post updated successfully!')
    }
  }

  // ✅ Delete post
  const deletePost = async () => {
    setErrorMsg(null)
    setSuccessMsg(null)

    const { error } = await supabase.from('Posts').delete().eq('id', id)

    if (error) {
      console.error('Delete error:', error)
      setErrorMsg(error.message)
    } else {
      setSuccessMsg('🗑️ Post deleted successfully!')
    }
  }

  return (
    <div className="EditPost">
      <h2>Edit Challenge</h2>

      {/* no <form> tag → no unwanted redirects */}
      <div className="edit-container">
        <label htmlFor="title">Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="author">Author</label> <br />
        <input
          type="text"
          id="author"
          name="author"
          value={post.author}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="description">Description</label> <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          name="description"
          value={post.description}
          onChange={handleChange}
        ></textarea>
        <br />

        <button type="button" onClick={updatePost}>
          Submit
        </button>

        <button type="button" className="deleteButton" onClick={deletePost}>
          Delete
        </button>

        {errorMsg && <p style={{ color: 'red' }}>⚠️ {errorMsg}</p>}
        {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      </div>
    </div>
  )
}

export default EditPost
