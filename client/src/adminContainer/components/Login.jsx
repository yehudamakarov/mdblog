import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { loginAction } from '../../store/actions/authActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    onChange = ({ target }) => {
        this.setState({
            [target.name]: target.value,
        });
    };

    onSubmit = event => {
        const { loginAction } = this.props;
        event.preventDefault();
        loginAction(this.state);
    };

    render() {
        const { email, password } = this.state;
        const { isLoggedIn } = this.props;
        const style = { width: '100%', marginRight: 'auto', marginLeft: 'auto', marginBottom: '12px' };
        if (isLoggedIn === true) {
            return <Redirect to="/admin" />;
        }
        return (
            <div style={{ height: '100vh' }}>
                <Grid style={{ height: '100%' }} container justify="center" alignItems="center">
                    <Grid item>
                        <form>
                            <TextField
                                style={style}
                                type="text"
                                label="Email Address"
                                value={email}
                                name="email"
                                onChange={this.onChange}
                            />
                            <TextField
                                style={style}
                                type="password"
                                label="Password"
                                value={password}
                                name="password"
                                onChange={this.onChange}
                            />
                            <Button style={style} color="primary" variant="contained" onClick={this.onSubmit}>
                                <input hidden type="submit" />
                                Log In
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
});

export default connect(
    mapStateToProps,
    { loginAction }
)(Login);
