import { AppInitializer, AppRouter } from '@app/providers'

import { HeaderConfigProvider } from '@widgets/chatHeader'

import 'antd/dist/reset.css'

const App = () => {
  return (
    <>
      <AppInitializer />
      <HeaderConfigProvider>
        <AppRouter />
      </HeaderConfigProvider>
    </>
  )
}

export default App
