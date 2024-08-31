import {Link} from "react-router-dom";
import React, {useState} from "react";
import './Menu.css';


const Menu = () => {
    const [activeMenu, setActiveMenu] = useState('crawling');

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };
    return (
      <div className="Menu">
          <nav>
              <ul className="Menu-nav nav flex-column">
                  <li className="Menu-item nav-item" onClick={()=>handleMenuClick('crawling')} >
                      <Link style={{color: '#00000088'}} className={`nav-link ${activeMenu==='crawling'? 'Menu-item-active':''}`}  to="/">Crawling</Link>
                  </li>
                  <li className="Menu-item nav-item" onClick={()=>handleMenuClick('label search')} >
                      <Link style={{color: '#00000088'}} className={`nav-link ${activeMenu==='label search'? 'Menu-item-active':''}`}  to="/label-search">Label search</Link>
                  </li>
                  <li className="Menu-item nav-item" onClick={()=>handleMenuClick('label')} >
                      <Link style={{color: '#00000088'}} className={`nav-link ${activeMenu==='label'? 'Menu-item-active':''}`}  to="/label">Label</Link>
                  </li>
              </ul>
          </nav>
      </div>
  )
}

export default Menu;