import {Component} from 'react'
import './blog.css'
import BlogItems from '../components/BlogItems/BlogItems'
import AllBlogItems from '../components/AllBlogItems/AllBlogItems'

class App extends Component {
  state = {
    blogItems: [
      {
        id: 1,
        author: 'Olivia Rhye',
        title: 'Product review presentations',
        date: '1 Jan 2023',
        description:
          'How do you create compelling presentations that wow your colleagues and impress your managers?',
        imageUrl: 'https://i.imghippo.com/files/S3txC1719209441.png',
        buttons: ['Design', 'Research', 'Presentation'],
      },
      {
        id: 2,
        author: 'Phoenix Baker',
        title: 'Migrating to Linear 101',
        date: '1 Jan 2023',
        description:
          'Linear helps streamline software projects, sprints, tasks, and bug tracking. Heres how to get...',
        imageUrl: 'https://i.imghippo.com/files/Hlr0I1719209580.png',
        buttons: ['Design', 'Research'],
      },
      {
        id: 3,
        author: 'Phoenix Baker',
        title: 'Building your API Stack',
        date: '1 Jan 2023',
        description:
          'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing...',
        imageUrl: 'https://i.imghippo.com/files/xt1tA1719209718.png',
        buttons: ['Design', 'Research'],
      },
      {
        id: 4,
        author: 'Olivia Rhye',
        title: 'Grid system for better Design User Interface',
        date: '1 Jan 2023',
        description:
          'A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points, Grid systems are used to create a consistent look and feel across a website, and can help to make the layout more visually appealing and easier to navigate.',
        imageUrl: 'https://i.imghippo.com/files/vh9BU1719209777.png',
        buttons: ['Design', 'Interface'],
      },
    ],
    allBlogItems: [
      {
        id: 5,
        author: 'Alec Whitten',
        title: 'Bill Walsh leadership lessons',
        date: '1 Jan 2023',
        description:
          'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?',
        imageUrl: 'https://i.imghippo.com/files/RM2oE1719209834.png',
        buttons: ['Leadership', 'Management'],
      },
      {
        id: 6,
        author: 'Demi Wilkinson',
        title: 'PM mental models',
        date: '1 Jan 2023',
        description:
          'Mental models are simple expressions of complex processes or relationships',
        imageUrl: 'https://i.imghippo.com/files/593lR1719209887.png',
        buttons: ['Product', 'Research', 'Frameworks'],
      },
      {
        id: 7,
        author: 'Candice Wu',
        title: 'What is Wireframing?',
        date: '1 Jan 2023',
        description:
          'Introduction to Wireframing and its Principles. Learn from the best in the industry.',
        imageUrl: 'https://i.imghippo.com/files/x77sL1719209961.png',
        buttons: ['Design', 'Research'],
      },
      {
        id: 8,
        author: 'Natali Craig',
        title: 'How collaboration makes us better designers',
        date: '1 Jan 2023',
        description:
          'Collaboration can make our teams stronger, and our individual designs better.',
        imageUrl: 'https://i.imghippo.com/files/ArwVD1719209994.png',
        buttons: ['Design', 'Research'],
      },
      {
        id: 9,
        author: 'Drew Cano',
        title: 'Our top 10 Javascript frameworks to use',
        date: '1 Jan 2023',
        description:
          'JavaScript frameworks make development easy with extensive features and functionalities.',
        imageUrl: 'https://i.imghippo.com/files/aXoLp1719210080.png',
        buttons: ['Software Development', 'Tools', 'SaaS'],
      },
      {
        id: 10,
        author: 'Orlando Diggs',
        title: 'Podcast: Creating a better CX Community',
        date: '1 Jan 2023',
        description:
          'Starting a community doesnt need to be complicated, but how do you get started?',
        imageUrl: 'https://i.imghippo.com/files/a8GJT1719210157.png',
        buttons: ['Podcasts', 'Customer Success'],
      },
    ],
  }

  render() {
    const {blogItems, allBlogItems} = this.state

    return (
        <div className="Adpp">
            
                <>
                  <hr className="hr" />
                  <h1 className="heading1">THE BLOG</h1>
                  <hr className="hr" />
                  <div className="recentBlogs">
                    <h2 className="heading2">Recent blog posts</h2>
                    <div className="blog-list">
                      <div className="blog-row">
                        <BlogItems blog={blogItems[0]} isFirst />
                        <div className="blog-column">
                          <BlogItems blog={blogItems[1]} />
                          <BlogItems blog={blogItems[2]} />
                        </div>
                      </div>
                      <BlogItems blog={blogItems[3]} isFullWidth />
                    </div>
                  </div>
                  <hr className="hr" />
                  <div className="allBlogs">
                    <h2 className="heading2">All Blog Items</h2>
                    <div className="blog-list">
                      <AllBlogItems allBlogItems={allBlogItems} />
                    </div>
                  </div>
                </>
              
           
        </div>
    )
  }
}

export default App
