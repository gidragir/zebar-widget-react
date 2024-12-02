import React, { Suspense } from 'react';

const Left = React.lazy(() => import('./components/layout/left'))
const Right = React.lazy(() => import('./components/layout/right'))
const Center = React.lazy(() => import('./components/layout/center'))

function App() {
  const commonProps = {
    icon_size: 15  
  }
  
  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <Left />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Center {...commonProps}/>
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Right {...commonProps}/>
      </Suspense>

    </div>
  )
}

export default App
