import AdvisoryPanel from '../components/home/AdvisoryPanel/AdvisoryPanel'
import Blogs from '../components/home/Blogs/Blogs'
import CommitteePanel from '../components/home/CommitteePanel/CommitteePanel'
import Hero from '../components/home/Hero/Hero'
import Marquee from '../components/home//Marquee/Marquee'
import WhatWeDo from '../components/home/WhatWeDo/WhatWeDo'
import WhoWeAre from '../components/home/WhoWeAre/WhoWeAre'
import Contacts from '../components/home/Contacts/Contacts'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee/>
      <WhoWeAre />
      <WhatWeDo />
      <AdvisoryPanel />
      <CommitteePanel />
      <Blogs />
      <Contacts />
    </>
  )
}


