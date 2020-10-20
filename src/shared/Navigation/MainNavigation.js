import React, { useState } from 'react';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

const MainNavigation = () => {

    const [ openDrawer, setOpenDrawer ] = useState(false);

    const toggleOpenDrawer = () => {
        setOpenDrawer(!openDrawer);
    }

    return (
        <React.Fragment>
            {openDrawer && <Backdrop onClick={toggleOpenDrawer}/>}
            <SideDrawer show={openDrawer} onCancel={toggleOpenDrawer}>
                <NavLinks />
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__button" onClick={toggleOpenDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <nav className="main-navigation__menu">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation
