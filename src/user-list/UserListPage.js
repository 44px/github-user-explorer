import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import UserList from './UserList';

export default class UserListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            users: []
        };

        this.onQueryChange = this.onQueryChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onQueryChange(e) {
        this.setState({
            query: e.target.value
        });
    }

    onSearch(e) {
        e.preventDefault();
        const URL = `https://api.github.com/search/users?type=all&sort=updated&per_page=100&q=${this.state.query}&page=1`;
        fetch(URL).then((response) => {
            return response.json();
        }).then((response) => {
            this.setState({
                users: response.items
            })
        });
    }

    render() {
        return (
            <div>
                <Form inline
                      onSubmit={this.onSearch}>
                    <FormGroup>
                        <FormControl type="text"
                                     placeholder="Search"
                                     value={this.state.query}
                                     onChange={this.onQueryChange}
                        />
                    </FormGroup>
                    {' '}
                    <Button type="submit">Submit</Button>
                </Form>

                <div style={{marginTop: '24px'}}>
                    <UserList list={this.state.users}
                              onSelect={()=>{}}
                    />
                </div>
            </div>
        );
    }
}
