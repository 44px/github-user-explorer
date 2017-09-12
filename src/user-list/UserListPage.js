import React, {Component} from 'react';
import SearchForm from '../core/SearchForm';
import Pagination from '../core/Pagination';
import SortingSelector from '../core/SortingSelector';
import SearchResult from '../core/SearchResult/SearchResult';
import UserList from './UserList';

export default class UserListPage extends Component {
    static SORT_OPTIONS = [{
        title: 'Best match',
        sort: null,
        order: null
    }, {
        title: 'Most followers',
        sort: 'followers',
        order: 'desc'
    }, {
        title: 'Fewest followers',
        sort: 'followers',
        order: 'asc'
    }];

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
                sorting: UserListPage.SORT_OPTIONS[0]
            }
        };

        this.onSearchStringChange = this.onSearchStringChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    }

    onSearchStringChange(q) {
        this.onQueryChange({q, page: 1});
    }

    onPageChange(page) {
        this.onQueryChange({page});
    }

    onSortChange(sorting) {
        this.onQueryChange({sorting});
    }

    onQueryChange(changes) {
        const query = Object.assign({}, this.state.query, changes);
        this.setState({query, isLoading: true}, () => {
            let url = ['q', 'page', 'per_page'].reduce((params, paramKey) => {
                return `${params}&${paramKey}=${query[paramKey]}`;
            }, 'https://api.github.com/search/users?type=user');

            if (query.sorting.sort && query.sorting.order) {
                url += `&sort=${query.sorting.sort}&order=${query.sorting.order}`;
            }

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
                <div style={{marginBottom: '24px'}}>
                    <SearchForm onSubmit={this.onSearchStringChange} />
                </div>

                <SearchResult isLoading={this.state.isLoading}
                              data={this.state.data}>
                    <div style={{marginBottom: '16px'}}>
                        <SortingSelector id='UserListPageSorting'
                                         options={UserListPage.SORT_OPTIONS}
                                         value={this.state.query.sorting}
                                         onChange={this.onSortChange}
                        />
                    </div>
                    <div style={{marginBottom: '16px'}}>
                        <UserList list={this.state.data.items}
                                  onSelect={()=>{}}
                        />
                    </div>
                    <Pagination totalCount={this.state.data.total_count}
                                perPage={this.state.query.per_page}
                                page={this.state.query.page}
                                onChange={this.onPageChange}
                    />
                </SearchResult>
            </div>
        );
    }
}
