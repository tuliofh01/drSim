import { Link } from "react-router-dom";
import "./MainHeader.css"

function MainHeader(props){
    
    const urls = props.urls
    
    return (
        <header id="headerHD">
            <nav>
            <ul id="navListHD">
                {urls.map((url) => (
                    <li id="navItem1HD">{<Link to={`/${url[1]}`}>{url[0]}</Link>}</li>
                ))}  
            </ul>
            </nav>
        </header>
    );
}

export default MainHeader;