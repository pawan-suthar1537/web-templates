import React from 'react'
import { Card, CardContent } from '../ui/card'

const DashboardContent = () => {
  return (
    <div>
      <Card className="w-[200px] h-auto bg-gray-100 cursor-pointer mb-3 hover:bg-white" onClick={()=>{window.location.href = "/dashboard/projects/new"}}>
        <CardContent className='flex flex-col items-center justify-center mt-2 text-center'>
          <h1>New Template</h1>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardContent