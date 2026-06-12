
import './Blogs.css'
import { useBlog } from '../../../Hooks/Hooks';
import { EventCard } from '../../../pages/Eventcard';
import { Link } from 'react-router-dom';

export default function Blogs() {
  const {
    data: events = [],
    isLoading,
  } = useBlog();

  if (isLoading) {
    return <div className='text-center py-20'>Loading...</div>
  }

  return (
    <section className=" bg-cream1 py-28" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div  className='flex justify-between ' >
          <div>
            <p className="font-inter text-[12px] uppercase  text-gold1  tracking-wide font-medium mb-4 ">Stay Updated</p>
            <h2 className="font-cormorant text-black text-5xl my-6 ">Blog & News</h2>
          </div>
          <Link to={'/events'} >See all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">

          {events.map((e, idx) => (
            <EventCard key={idx} event={e} />
          ))}
        </div>
      </div>
    </section>
  )
}


