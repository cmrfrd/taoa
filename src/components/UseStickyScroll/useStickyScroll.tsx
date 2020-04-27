import React, { useState, useEffect, useContext } from "react";
import throttle from "lodash/throttle";

/**
 *  useHideOnScrolled is a function to hold the state
 *  of where the scroll bar is located on the page.
 *
 *  When the scroll bar is close to '0' the state is set to true
 */
const useStickyOnScrolled = () => {
    const [sticky, setSticky] = useState(false);

    const handleScroll = () => {
        const top = window.pageYOffset || document.documentElement.scrollTop;
        setSticky(top > 1);
    };

    useEffect(() => {
        window.addEventListener("scroll", throttle(handleScroll, 20));
        return () => {
            window.removeEventListener("scroll", throttle(handleScroll, 20));
        };
    }, []);

    return sticky;
};

export default useStickyOnScrolled;
