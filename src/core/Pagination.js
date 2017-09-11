import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Pager} from 'react-bootstrap';

export default class Pagination extends Component {
    constructor(props) {
        super(props);

        this.onPrevSelect = this.onPrevSelect.bind(this);
        this.onNextSelect = this.onNextSelect.bind(this);
    }

    static propTypes = {
        totalCount: PropTypes.number.isRequired,
        perPage: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired
    };

    onPrevSelect() {
        this.props.onChange(this.props.page - 1);
    }

    onNextSelect() {
        this.props.onChange(this.props.page + 1);
    }

    render() {
        const totalPages = Math.ceil(this.props.totalCount / this.props.perPage);

        return (
            <Pager>
                <Pager.Item previous
                            href="#"
                            disabled={this.props.page === 1}
                            onSelect={this.onPrevSelect}>
                    &larr; Previous Page
                </Pager.Item>
                <Pager.Item next
                            href="#"
                            disabled={this.props.page === totalPages}
                            onSelect={this.onNextSelect}>
                    Next Page &rarr;
                </Pager.Item>
            </Pager>
        );
    }
}
