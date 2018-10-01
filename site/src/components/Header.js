import React from 'react'
import PropTypes from 'prop-types'

const Header = (props) => (
    <header id="header" style={props.timeout ? {display: 'none'} : {}}>
        <div className="content">
            <div className="inner">
                <h1>Alexander Comerford</h1>
                <p> I'm a data scientist living in Brooklyn NY<br />
                    I turn data into knowledge and information.
                </p>
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

        {/*<nav>
        <ul>
        <li><a href="javascript:;" onClick={() => {props.onOpenArticle('Blog')}}>Blog</a></li>
        </ul>
        </nav>*/}

        {/*<nav>
        <ul>
        <li><a href="javascript:;" onClick={() => {props.onOpenArticle('intro')}}>Intro</a></li>
        <li><a href="javascript:;" onClick={() => {props.onOpenArticle('work')}}>Work</a></li>
        <li><a href="javascript:;" onClick={() => {props.onOpenArticle('about')}}>About</a></li>
        <li><a href="javascript:;" onClick={() => {props.onOpenArticle('contact')}}>Contact</a></li>
        </ul>
        </nav>*/}

    </header>
)

Header.propTypes = {
    onOpenArticle: PropTypes.func,
    timeout: PropTypes.bool
}

export default Header
