import '../css/Header.css'

import chefClaudeLogo from '/Chef 1.png'

function Header() {
    return (
      <header>
        <img className="nav-image" src={chefClaudeLogo} alt="Chef image"/>
        <h1>Chef Claude</h1>
      </header>
    );
  }  
  
  export default Header;
