import { Link } from 'react-router-dom'
// import { events } from '../../../data/siteData'
import './Blogs.css'
import { useBlog } from '../../../Hooks/Hooks';

export default function Blogs() {

  const {
    data: events = [],
    isLoading,
  } = useBlog();

  if (isLoading) {
    return <div className='text-center py-20'>Loading...</div>
  }
  
  return (
    <section class=" bg-cream1 py-28" id="blog">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="font-inter text-[12px] uppercase  text-gold1  tracking-wide font-medium mb-4 ">Stay Updated</p>
        <h2 class="font-cormorant text-black text-5xl my-6 ">Blog & News</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">

          {events.map((event) => (
            <div class="blog-card shadow-lg">
              <div class="blog-card-img-wrap">
                <img src={event.imageUrl} alt="CESPA campus" />
              </div>
              <div class="blog-card-body">
                <span class="blog-tag">{event.category}</span>
                <p class="blog-date">{event.date}</p>
                <h3 class="blog-title">{event.title}</h3>
                <p class="blog-excerpt">{event.excerpt}</p>
                <a href="#" class="blog-link">See All <span>→</span></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


