import Footer from "@/components/ui/shared/Footer"
import Navbar from "@/components/ui/shared/NavBar"



interface ICommonLayoutProps {
    children: React.ReactNode
}


const CommonLayout = ({children}:ICommonLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
       <Navbar/>
      <main className="flex-grow">{children}</main>
        <Footer/>
    </div>
  )
}

export default CommonLayout