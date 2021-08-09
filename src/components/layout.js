import React from "react"
import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children }) => (
<div>
    <Header />

    {children}
    
    <Footer />
</div>
)

export default Layout