import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form,
    FormControl,
    FormGroup
} from 'react-bootstrap';

export default class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };

        this.onQueryChange = this.onQueryChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    onQueryChange(e) {
        this.setState({
            query: e.target.value
        });
    };

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.query);
    }

    render() {
        return (
            <Form inline
                  onSubmit={this.onSubmit}>
                <FormGroup>
                    <FormControl type='text'
                                 placeholder='Search'
                                 value={this.state.query}
                                 onChange={this.onQueryChange}
                    />
                </FormGroup>
                {' '}
                <Button type='submit'>Submit</Button>
            </Form>
        );
    }
}
