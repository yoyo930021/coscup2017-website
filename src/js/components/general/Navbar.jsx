import React, { Component } from 'react'
import Radium from 'radium'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { Link } from 'react-router'

@Radium
export default CSSModules(class extends Component {
    constructor (props) {
        super(props)
        this.handleScroll = this.handleScroll.bind(this)
        this.MenuWidth = this.MenuWidth.bind(this)
        this.MenuTopOffset = this.MenuTopOffset.bind(this)
        this.state = {
            offsetY: 0
        }
    }

    componentDidMount () {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll (event) {
        this.setState({
            offsetY: window.pageYOffset
        })
    }

    MenuWidth () {
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        if (width < 720) {
            return ''
        }
        if (this.state.offsetY / 1000 > 1) {
            return '100%'
        }
        let returnWidth = (80 + (20 * this.state.offsetY / 1000)) + '%'
        return returnWidth
    }

    MenuTopOffset () {
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        if (width < 720) {
            return ''
        }
        if (this.state.offsetY / 1000 > 1) {
            return '0%'
        }
        let returnWidth = (70 - (70 * this.state.offsetY / 1000)) + '%'
        return returnWidth
    }

    render () {
        const language = this.props.language
        return (
            <div
                className={ classNames('navbar', {'navbar--fixed': this.state.offsetY > 1000}, {'navbar--abs': this.state.offsetY < 1000})}
                style={{
                    top: this.MenuTopOffset(),
                    width: this.MenuWidth()
                }}>
                <div className="logo">
                    <Link to={'/'}>
                        <img src={require('static/logo.png')}/>
                    </Link>
                </div>
                <div className="menu-list">
                    <ul className="tag-selector">
                        <li className="active">
                            <Link to={'/intro'}>{ this.props.translate['intro'][language] }</Link>
                        </li>
                        <li className="noactive">
                            <Link to={'/schedule'}>{ json.translate['schedule'][language] }</Link>
                        </li>
                        <li className="noactive">
                            <Link to={'/transport'}>{ json.translate['transport'][language] }</Link>
                        </li>
                        <li className="noactive">
                            <Link to={'/map'}>{ json.translate['map'][language] }</Link>
                        </li>
                        <li className="noactive">
                            <Link to={'/sponsor'}>{ json.translate['sponsor'][language] }</Link>
                        </li>
                        <li className="noactive">
                            <Link to={'/staff'}>{ json.translate['staff'][language] }</Link>
                        </li>
                        <li className="noactive">
                            <Link to={'/news'}>{ json.translate['news'][language] }</Link>
                        </li>
                    </ul>
                    <ul className="lang-selector">
                        <span className="separator"></span>
                        <li className={classNames({'active': language === 'en'})} onClick={() => this.props.putLanguage('en')}>EN</li>
                        <li className={classNames({'active': language === 'zh'})} onClick={() => this.props.putLanguage('zh')}>繁</li>
                    </ul>
                </div>
            </div>
        )
    }
}, require('css/general/Navbar.styl'))
