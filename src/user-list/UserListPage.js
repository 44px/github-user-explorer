import React, {Component} from 'react';
import SearchForm from '../core/SearchForm';
import UserList from './UserList';

export default class UserListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(query) {
        const URL = `https://api.github.com/search/users?type=all&sort=updated&per_page=100&q=${query}&page=1`;
        fetch(URL).then((response) => {
            return response.json();
        }).then((response) => {
            this.setState({
                users: response.items
            })
        });
    }

    render() {
        let result = (
            <div>
                No results
            </div>
        );

        if (this.state.users.length) {
            result = (
                <UserList list={this.state.users}
                          onSelect={()=>{}}
                />
            );
        }

        return (
            <div>
                <SearchForm onSubmit={this.onSearch} />
                <div style={{marginTop: '24px'}}>
                    {result}
                </div>
            </div>
        );
    }
}
