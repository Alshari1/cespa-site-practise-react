import { Link, useRouteError } from 'react-router-dom'
import Seo from '../components/shared/Seo/Seo'

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <main className="grid min-h-screen place-items-center bg-paper px-4 text-center">
      <Seo title="Error" description="Page not found." />
      <section>
        <p className="font-poppins text-sm font-bold uppercase tracking-widest text-clay">404</p>
        <h1 className="font-display mt-3 text-6xl font-bold">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-ink/65">{error?.statusText || error?.message || 'The page you are looking for is not available.'}</p>
        <Link className="btn mt-8 bg-forest text-white hover:bg-forest/90" to="/">Back Home</Link>
      </section>
    </main>
  )
}


