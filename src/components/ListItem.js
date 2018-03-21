import React, { Component } from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    View,
    UIManager,
    LayoutAnimation
} from 'react-native';
import { CardSection } from './common';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ListItem extends Component {

    componentWillUpdate() {
        console.log('rex');
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    renderDescription() {
        const { expanded, library, selectedLibraryId } = this.props;
        if (expanded){
            return (
                <CardSection>
                    <Text style={{ flex: 1 }}>{library.description}</Text>
                </CardSection>
            );
        }
    }

    render() {
        const { titleStyle } = styles;
        const { id, title } = this.props.library;
        return(
            <TouchableWithoutFeedback
                onPress={() => this.props.selectLibrary(id)}
            >
                <View>
                    <CardSection>
                        <Text style={titleStyle}>{title}</Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles ={
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

const mapStateToProps = (state, ownProps) => {
    const expanded = (ownProps.library.id === state.selectedLibraryId);
    return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
