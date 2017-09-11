import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SearchResult.css';

export default class SearchResult extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    render() {
        const items = this.props.data.items || [];
        if (items.length === 0) {
            return (
                <div className='SearchResult'>
                    No results
                </div>
            );
        }

        const className = this.props.isLoading
            ? 'SearchResult SearchResult--loading'
            : 'SearchResult';

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}
