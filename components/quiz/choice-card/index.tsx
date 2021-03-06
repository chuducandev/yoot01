import React, {useState, FC} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {decode} from 'html-entities'

type ChoiceCardProps = {
	content: string,
	index: number,
	selection: number,
	setSelection: (value: number | ((oldValue: number) => number)) => void,
}

const ChoiceCard : FC<ChoiceCardProps> = ({content, index, selection, setSelection}) => {

  return (
		<TouchableOpacity 
			style={[styles.container, {
				backgroundColor: selection == index ? '#8A7EB5' : '#ffffff',
				elevation: selection == index ? 20 : 0,
			}]}
			onPress={() => setSelection(index)}	
		>
			<View style={[styles.iconContainer, {
				borderColor: selection == index ? '#ffffff' : '#8A7EB5'
			}]}>
				<View style={styles.icon} />
			</View>
			<Text style={[styles.content, {
				color: selection == index ? '#ffffff' : '#000000',
			}]}>{decode(content)}</Text>
		</TouchableOpacity>
  );	
};

const styles = StyleSheet.create({
  container: {
		marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 26,
    backgroundColor: '#ffffff',
    borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
    // elevation: 10,
  },
	iconContainer: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 30,
	},
	icon: {
		width: 16,
		height: 16,
		borderRadius: 10,
		backgroundColor: '#ffffff',
	},	
	content: {
		fontFamily: 'Nunito Bold',
    fontSize: 20,
    color: '#4A5462',
		marginBottom: 5,
	},
});

export default ChoiceCard;
