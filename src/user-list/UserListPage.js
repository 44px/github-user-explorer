import React, {Component} from 'react';
import SearchForm from '../core/SearchForm';
import Pagination from '../core/Pagination';
import SearchResult from '../core/SearchResult/SearchResult';
import UserList from './UserList';

export default class UserListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: {
                items: [],
                total_count: 0
            },
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
        this.setState({query, isLoading: true}, () => {
            const url = Object.keys(query).reduce((params, paramKey) => {
                return `${params}&${paramKey}=${query[paramKey]}`;
            }, 'https://api.github.com/search/users?type=all');
            fetch(url).then((response) => {
                return response.json();
            }).then((data) => {
                this.setState({
                    data,
                    isLoading: false
                });
            }).catch(() => {
                this.setState({
                    isLoading: false
                });
            });
        });
    }

    render() {
        return (
            <div>
                <SearchForm onSubmit={this.onSearchStringChange} />
                <div style={{marginTop: '24px'}}>
                    <SearchResult isLoading={this.state.isLoading}
                                  data={this.state.data}>
                        <UserList list={this.state.data.items}
                                  onSelect={()=>{}}
                        />
                        <Pagination totalCount={this.state.data.total_count}
                                    perPage={this.state.query.per_page}
                                    page={this.state.query.page}
                                    onChange={this.onPageChange}
                        />
                    </SearchResult>
                </div>
            </div>
        );
    }
}
