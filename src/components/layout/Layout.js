import MainNavigation from "./MainNavigation"
import Footer from "./Footer"

const Layout = (props) => {
    return (
        <div id="main_container">
            <MainNavigation />
            <main>{props.children}</main>
            <Footer />
        </div>
    )
}

export default Layout