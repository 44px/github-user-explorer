import React, {Component} from 'react';
import {Media} from 'react-bootstrap';

export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: {}
        }
    }

    componentDidMount() {
        const {username} = this.props.match.params;
        fetch(`https://api.github.com/users/${username}`).then((response) => {
            if (!response.ok) {
                throw new Error('Not found');
            }
            return response.json();
        }).then((user) => {
            this.setState({
                isLoading: false,
                user
            });
        }).catch((e) => {
            this.setState({
                isLoading: false,
                user: {}
            });
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>Loading...</div>
            );
        }

        const user = this.state.user;
        if (!user.id) {
            return (
                <div>Not found</div>
            );
        }

        return (
            <Media>
                <Media.Left align='top'>
                    <img src={user.avatar_url}
                         alt={user.login}
                         width={128}
                         height={128}
                    />
                </Media.Left>
                <Media.Body>
                    <Media.Heading>
                        {`${user.login} ${user.name || ''}`}
                    </Media.Heading>
                    <div>Bio: {user.bio || '–'}</div>
                    <div>Location: {user.location || '–'}</div>
                </Media.Body>
            </Media>
        );
    }
}
