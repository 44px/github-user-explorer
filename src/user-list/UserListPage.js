import React, {Component} from 'react';
import SearchForm from '../core/SearchForm';
import Pagination from '../core/Pagination';
import UserList from './UserList';

export default class UserListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            query: {
                q: '',
                page: 1,
                per_page: 10,
                sort: 'updated'
            }
        };

        this.onSearchStringChange = this.onSearchStringChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    onSearchStringChange(q) {
        this.onQueryChange({q});
    }

    onPageChange(page) {
        this.onQueryChange({page});
    }

    onQueryChange(changes) {
        const query = Object.assign({}, this.state.query, changes);
        this.setState({query}, () => {
            const url = Object.keys(query).reduce((params, paramKey) => {
                return `${params}&${paramKey}=${query[paramKey]}`;
            }, 'https://api.github.com/search/users?type=all');
            fetch(url).then((response) => {
                return response.json();
            }).then((data) => {
                this.setState({data})
            });
        });
    }

    render() {
        let result = (
            <div>
                No results
            </div>
        );

        const users = this.state.data.items || [];
        if (users.length) {
            result = (
                <div>
                    <UserList list={users}
                              onSelect={()=>{}}
                    />
                    <Pagination totalCount={this.state.data.total_count}
                                perPage={this.state.query.per_page}
                                page={this.state.query.page}
                                onChange={this.onPageChange}
                    />
                </div>
            );
        }

        return (
            <div>
                <SearchForm onSubmit={this.onSearchStringChange} />
                <div style={{marginTop: '24px'}}>
                    {result}
                </div>
            </div>
        );
    }
}
