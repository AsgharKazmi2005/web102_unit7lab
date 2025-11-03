import { useState } from 'react'
import './CreatePost.css'
import { supabase } from '../client'   // ✅ connect Supabase

const CreatePost = () => {
  const [post, setPost] = useState({
    title: '',
    author: '',
    description: '',
  })
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      const { data, error } = await supabase
        .from('Posts')
        .insert({
          title: post.title,
          author: post.author,
          description: post.description,
        })
        .select()

      if (error) throw error

      console.log('Inserted data:', data)
      setSuccessMsg('✅ Challenge submitted successfully!')
      setPost({ title: '', author: '', description: '' }) // clear form

      // optional redirect after short delay
      // setTimeout(() => (window.location = '/'), 1000)
    } catch (err) {
      console.error('Insert error:', err)
      setErrorMsg(err.message)
    }
  }

  return (
    <div className="CreatePost">
      <h2>Submit a New Challenge</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          value={post.title}
          required
        />
        <br />
        <br />

        <label htmlFor="author">Author</label> <br />
        <input
          type="text"
          id="author"
          name="author"
          onChange={handleChange}
          value={post.author}
          required
        />
        <br />
        <br />

        <label htmlFor="description">Description</label> <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          name="description"
          onChange={handleChange}
          value={post.description}
          required
        ></textarea>
        <br />
        <br />

        <button type="submit">Submit</button>

        {/* feedback */}
        {errorMsg && <p style={{ color: 'red' }}>⚠️ {errorMsg}</p>}
        {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      </form>
    </div>
  )
}

export default CreatePost
