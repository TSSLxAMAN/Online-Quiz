import Navbar from './Navbar' 
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 container mx-auto p-4">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
export default Layout