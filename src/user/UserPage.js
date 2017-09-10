import React, {Component} from 'react';

export default class UserPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {username} = this.props.match.params;
        return <div>UserPage: {username}</div>
    }
}
