import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Media} from 'react-bootstrap';

export default class UserList extends Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        onSelect: PropTypes.func.isRequired
    };

    render() {
        const users = this.props.list.map((user, index) => {
            return (
                <Media key={index}>
                    <Link to={`user/${user.login}`}>
                        <Media.Left align='top'>
                            <img src={user.avatar_url}
                                 alt={user.login}
                                 width={64}
                                 height={64}
                            />
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{user.login}</Media.Heading>
                        </Media.Body>
                    </Link>
                </Media>
            );
        });

        if (users.length === 0) {
            return <div className='UserList'>No users found</div>;
        }

        return <div className='UserList'>{users}</div>;
    }
}
