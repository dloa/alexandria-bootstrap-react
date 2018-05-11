import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js'
import { bindActionCreators } from 'redux';

import NavbarSearchBar from './NavbarSearchBar'
import LoginButton from './LoginButton'
import UploadButton from './UploadButton'
import UserNav from './UserNav'

import {logout} from '../actions';

import {
    Link,
    Redirect
} from 'react-router-dom'

import LogoImg from '../assets/img/oip-basic.svg';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: "",
            search: false
        };

        this.searchForArtifacts = this.searchForArtifacts.bind(this);
        this.updateTextInput = this.updateTextInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.logout = this.logout.bind(this);
    }

    searchForArtifacts() {
        this.setState({search: true});
        let _this = this;
        setTimeout(function () {
            _this.setState({search: false});
        }, 100)
    }

    updateTextInput(e) {
        this.setState({
            search: false,
            searchTerm: e.target.value
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.searchForArtifacts();
        }
    }

    logout() {
        console.log("LOGOUT");
        try {
            this.props.store.dispatch(logout("test"));
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        let totalbalance = 0;

        if (this.props && this.props.Wallet) {
            let flobalance = 0, btcbalance = 0, ltcbalance = 0;

            if (this.props.Wallet.florincoin && this.props.Wallet.florincoin.usd)
                flobalance = parseFloat(this.props.Wallet.florincoin.usd);
            if (this.props.Wallet.bitcoin && this.props.Wallet.bitcoin.usd)
                btcbalance = parseFloat(this.props.Wallet.bitcoin.usd);
            if (this.props.Wallet.litecoin && this.props.Wallet.litecoin.usd)
                ltcbalance = parseFloat(this.props.Wallet.litecoin.usd);

            totalbalance = flobalance + btcbalance + ltcbalance;
        }

        return <nav className="navbar-header navbar navbar-expand-sm">
            {this.state.search ? <Redirect push to={"/search/" + this.state.searchTerm}/> : ""}
                <Link className="navbar-logo navbar-brand ml-3" to="/">
                    <img className="navbar-brand-img d-inline-block align-middle" src={LogoImg} alt=""/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>

                <div id="navbarSupportedContent" className="collapse navbar-collapse">
                    <NavbarSearchBar onChange={this.updateTextInput} onKeyPress={this.handleKeyPress} onClick={this.searchForArtifacts} />
                    <div className="user-container d-flex justify-content-end">
                        <UploadButton/>
                        {this.props.User.isLoggedIn ? <UserNav pubName={this.props.User.publisher.name}/> : <LoginButton/>}
                    </div>
                </div>
            </nav>
    }
}

const mapStateToProps = state => {
    return {
        User: state.User,
        Wallet: state.Wallet
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
