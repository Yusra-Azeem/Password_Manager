
import Manager from "./components/Manager"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
function App() {
  

  return (
    <>
    <div className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
    <Navbar />
    <div className="min-h-[130vh]">
    <Manager/>
    </div>
    <Footer/>
    </div>
    {/* <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div> */}
    </>
  )
}

export default App
