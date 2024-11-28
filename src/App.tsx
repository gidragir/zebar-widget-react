import React, { Suspense } from 'react';

const Left = React.lazy(() => import('./components/layout/left'))
const Right = React.lazy(() => import('./components/layout/right'))
const Center = React.lazy(() => import('./components/layout/center'))

function App() {
  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <Left />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Center />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Right />
      </Suspense>

    </div>
  )
}

export default App
