import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    DropdownButton,
    MenuItem
} from 'react-bootstrap';

export default class SortingSelector extends Component {
    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this);
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
        value: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired
    };

    renderItem(option, i) {
        return (
            <MenuItem key={i}
                      eventKey={i}>
                {option.title}
            </MenuItem>
        );
    }

    onSelect(index) {
        this.props.onChange(this.props.options[index]);
    }

    render() {
        return (
            <DropdownButton bsStyle='default'
                            title={this.props.value.title}
                            id={this.props.id}
                            onSelect={this.onSelect}>
                {this.props.options.map(this.renderItem)}
            </DropdownButton>
        );
    }
}
