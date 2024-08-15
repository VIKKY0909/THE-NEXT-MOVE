import {useNavigate} from 'react-router-dom'
import './BlogItems.css'

const BlogItems = ({blog, isFirst, isFullWidth}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/blog/${blog.id}`)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }

  const classNames = [
    'blog-item',
    isFirst ? 'first-item' : '',
    isFullWidth ? 'full-width-item' : '',
  ].join(' ')

  return (
    <div
      className={classNames}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{cursor: 'pointer'}}
    >
      <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
      <div className="blog-content">
        <div className="blog-info">
          <span className="author">{blog.author}</span>
          <span className="date">{blog.date}</span>
        </div>
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-description">{blog.description}</p>
        <div className="blog-tags">
          {blog.buttons.map(button => (
            <span key={button} className="tag">
              {button}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogItems
