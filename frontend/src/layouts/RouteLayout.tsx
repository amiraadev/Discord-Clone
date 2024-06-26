import React from 'react'
import { Outlet } from 'react-router-dom'

const RouteLayout = () => {
  return (
    <div>RouteLayout
        <Outlet/>
    </div>
  )
}

export default RouteLayout