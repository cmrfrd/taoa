import React from 'react'
import PropTypes from 'prop-types'

const Header = (props) => (
    <header id="header" style={props.timeout ? {display: 'none'} : {}}>
        <div className="content">
            <div className="inner">
                <h1>Alexander Comerford</h1>
	            <p>I am a data scientist with a background in nanoscale engineering<br/><br/>I enjoy machine learning, data visualisations, parallel computing, <br/>physics, chemistry, and all things data science.</p>
            </div>
            <div>
	        <ul className="icons">
                    <li><a href="https://twitter.com/4l3x_c0m3rf0rd" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                    <li><a href="https://www.linkedin.com/in/ajcomerford/" className="icon fa-linkedin"><span className="label">Facebook</span></a></li>
                    <li><a href="https://www.instagram.com/cmrfrd/" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
                    <li><a href="https://github.com/cmrfrd" className="icon fa-github"><span className="label">GitHub</span></a></li>
                </ul>
            </div>
        </div>

        {/*
	// For blog stuff in the future
        <nav>
        <ul>
        <li><a href="javascript:;" onClick={() => {props.onOpenArticle('Blog')}}>Blog</a></li>
        </ul>
        </nav>*/}
    </header>
)

Header.propTypes = {
    onOpenArticle: PropTypes.func,
    timeout: PropTypes.bool
}

export default Header
