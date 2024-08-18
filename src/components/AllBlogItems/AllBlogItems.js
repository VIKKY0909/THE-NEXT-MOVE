import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './AllBlogItems.css'

const AllBlogItems = ({ allBlogItems }) => {
  const navigate = useNavigate()

  const handleClick = id => {
    navigate(`/all-blog/:${id}`)
  }

  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/all-blog/:${id}`)
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true /* Enable center mode to make the margins visible */,
    centerPadding: '10px' /* Padding around the centered slide */,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: '10px' /* Ensure center padding for smaller screens */,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '10px' /* Ensure center padding for mobile screens */,
        },
      },
    ],
  }

  return (
    <Slider {...settings} className="all-blog-items">
      {allBlogItems.map(blog => (
        <div
          key={blog.id}
          className="blog-card"
          onClick={() => handleClick(blog.id)}
          onKeyDown={event => handleKeyDown(event, blog.id)}
          role="button"
          tabIndex={0}
        >
          <div className="image-wrapper">
            <img src={blog.imageUrl} alt={blog.title} />
          </div>
          <div className="blog-content">
            <div className="blog-info">
              <span>{blog.author}</span>
              <span>{blog.date}</span>
            </div>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <div className="blog-tags">
              {blog.buttons.map(button => (
                <span key={button} className="tag">
                  {button}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default AllBlogItems
