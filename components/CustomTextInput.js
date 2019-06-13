import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';

class CustomTextInput extends Component {

    render() {
      const { label, labelStyle, maxLength, textInputStyle, stateHolder, 
          stateFieldName } = this.props;
      return(
        <View>
            <Text style = { [ styles.fieldLabel, labelStyle ] }> { label } </Text> 
            <TextInput maxLength={ maxLength } 
                onChangeText={ (inText) => stateHolder.setState(
                    () => {
                        const obj = { };
                        obj[stateFieldName] = inText;
                        return obj;
                    }
                ) } 
                style={[styles.textInput, textInputStyle ]} />
        </View>

      );
    }

}

CustomTextInput.propTypes = {
    label: PropTypes.string.isRequired,
    labelStyle: PropTypes.object,
    maxLength: PropTypes.number.isRequired,
    textInputStyle: PropTypes.object,
    stateHolder: PropTypes.object.isRequired,
    stateFieldName: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    fieldLabel: { marginLeft : 10 },

    textInput: {
        height: 40, 
        marginLeft: 10,
        width: '96%',
        marginBottom: 20,
        ...Platform.select({
            ios: { marginTop: 4, paddingLeft : 10, borderRadius : 8, 
                borderColor: '#c0c0c0', borderWidth : 2 },
            android: { }
        })
    }
});

export default CustomTextInput;
