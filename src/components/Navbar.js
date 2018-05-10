import React, {Component} from 'react';

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
            dropdownOpen: false,
            dropdown2Open: false,
            navDropdownOpen: false,
            User: {},
            Wallet: {
                florincoin: {balance: 0, usd: 0},
                bitcoin: {balance: 0, usd: 0},
                litecoin: {balance: 0, usd: 0}
            },
            searchTerm: "",
            search: false
        };

        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.searchForArtifacts = this.searchForArtifacts.bind(this);
        this.updateTextInput = this.updateTextInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onNavbarToggleClick = this.onNavbarToggleClick.bind(this);
        this.logout = this.logout.bind(this);
        this.stateDidUpdate = this.stateDidUpdate.bind(this);

        let _this = this;

        this.unsubscribe = this.props.store.subscribe(() => {
            _this.stateDidUpdate();
        });
    }

    stateDidUpdate() {
        let newState = this.props.store.getState();

        let User = newState.User;
        let Wallet = newState.Wallet;

        this.setState({
            User,
            Wallet
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentDidMount() {
        this.stateDidUpdate();
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggle2() {
        this.setState({
            dropdown2Open: !this.state.dropdown2Open
        });
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

    onNavbarToggleClick() {
        this.setState({
            navDropdownOpen: !this.state.navDropdownOpen
        })
    }

    render() {
        let totalbalance = 0;

        if (this.state && this.state.Wallet) {
            let flobalance = 0, btcbalance = 0, ltcbalance = 0;

            if (this.state.Wallet.florincoin && this.state.Wallet.florincoin.usd)
                flobalance = parseFloat(this.state.Wallet.florincoin.usd);
            if (this.state.Wallet.bitcoin && this.state.Wallet.bitcoin.usd)
                btcbalance = parseFloat(this.state.Wallet.bitcoin.usd);
            if (this.state.Wallet.litecoin && this.state.Wallet.litecoin.usd)
                ltcbalance = parseFloat(this.state.Wallet.litecoin.usd);

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
                    <div className="user-container d-flex">
                        <UploadButton/>
                        {this.state.User.isLoggedIn ? <UserNav/> : <LoginButton/>}
                    </div>
                </div>
            </nav>
    }
}

export default Navbar;