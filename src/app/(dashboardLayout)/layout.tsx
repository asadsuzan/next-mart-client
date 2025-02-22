


interface IDashboardProps {
    children: React.ReactNode
}


const DashboardLayout = ({children}:IDashboardProps) => {
  return (
    <div>
        <h1>Dashboard layout</h1>
        {children}
    </div>
  )
}

export default DashboardLayout