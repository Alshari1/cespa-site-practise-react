import { Outlet } from 'react-router-dom'
import Nav from '../components/shared/Nav/Nav'
import Footer from '../components/shared/Footer/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}


