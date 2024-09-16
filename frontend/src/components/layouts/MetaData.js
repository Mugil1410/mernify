import {Helmet} from 'react-helmet-async'

const MetaData = ({title}) => {
  return (
    <Helmet>
      <title>{`${title} | Mernify`}</title>
      <meta name="description" content="Build a full-stack e-commerce application using MongoDB, Express, React, and Node.js" />
      <meta name="keywords" content="e-commerce, react, node, mongodb, express" />
    </Helmet>
  )
}

export default MetaData
