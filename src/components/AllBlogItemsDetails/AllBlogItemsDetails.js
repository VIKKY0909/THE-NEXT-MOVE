import {useParams} from 'react-router-dom'
import './AllBlogItemsDetails.css' // Ensure this CSS file is properly defined
const state = {
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


const AllBlogItemsDetails = () => {
  const {id} = useParams()
  const { allBlogItems} = state
  const blogItem = allBlogItems.find(item => item.id.toString() === id.slice(1))
  if (!blogItem) {
    return <div>Blog item not found</div>
  }

  return (
    <div className="blog-item-details">
      {' '}
      {/* Use the same class as in BlogItemDetails */}
      <img
        src={blogItem.imageUrl}
        alt={blogItem.title}
        className="blog-details-image" // Use the same image class
      />
      <div className="blog-details-content">
        {' '}
        {/* Use the same content class */}
        <h3 className="blog-details-title">{blogItem.title}</h3>
        <div className="blog-details-info">
          <span className="author">{blogItem.author}</span>
          <span className="date">{blogItem.date}</span>
        </div>
        <p className="blog-details-description">{blogItem.description}</p>
        <p className="blog-details-description">
          The emergence and growth of blogs in the late 1990s coincided with the
          advent of web publishing tools that facilitated the posting of content
          by non-technical users who did not have much experience with HTML or
          computer programming. Previously, knowledge of such technologies as
          HTML and File Transfer Protocol had been required to publish content
          on the Web, and early Web users therefore tended to be hackers and
          computer enthusiasts. As of the 2010s, the majority are interactive
          Web 2.0 websites, allowing visitors to leave online comments, and it
          is this interactivity that distinguishes them from other static
          websites.[2] In that sense, blogging can be seen as a form of social
          networking service. Indeed, bloggers not only produce content to post
          on their blogs but also often build social relations with their
          readers and other bloggers.[3] Blog owners or authors often moderate
          and filter online comments to remove hate speech or other offensive
          content. There are also high-readership blogs which do not allow
          comments.Many blogs provide commentary on a particular subject or
          topic, ranging from philosophy, religion, and arts to science,
          politics, and sports. Others function as more personal online diaries
          or online brand advertising of a particular individual or company. A
          typical blog combines text, digital images, and links to other blogs,
          web pages, and other media related to its topic. Most blogs are
          primarily textual, although some focus on art (art blogs), photographs
          (photoblogs), videos (video blogs or vlogs), music (MP3 blogs), and
          audio (podcasts). In education, blogs can be used as instructional
          resources; these are referred to as edublogs. Microblogging is another
          type of blogging, featuring very short posts.
        </p>
        <div className="blog-details-tagss">
          {' '}
          {/* Use the same tags class */}
          {blogItem.buttons.map(button => (
            <span key={button} className="tag">
              {button}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllBlogItemsDetails
