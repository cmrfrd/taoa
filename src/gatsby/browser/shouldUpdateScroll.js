/* eslint-disable */

module.exports = ({ routerProps, prevRouterProps, getSavedScrollPosition }) => {
    const currentPosition = getSavedScrollPosition(routerProps.location,
                                                   routerProps.location.key);
    window.scrollTo(...(currentPosition || [0, 0]));
    return false;
};
