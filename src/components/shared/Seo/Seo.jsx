import { Helmet } from 'react-helmet-async'

export default function Seo({ title, description }) {
  const pageTitle = title ? `${title} | CivicBridge` : 'CivicBridge'

  return (
    <Helmet>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  )
}


