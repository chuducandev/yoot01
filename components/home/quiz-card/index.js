import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import HashFill from '../../../assets/icons/hash-fill.svg'
import DoubleLeftFill from '../../../assets/icons/double-left-fill.svg'
import InrFill from '../../../assets/icons/inr-fill.svg'
import { useNavigation } from '@react-navigation/core';

const QuizCard = ({
	header,
	description,
	iconBackgroundColor,
	iconType,
}) => {
	const navigation = useNavigation()

  return (
		<TouchableOpacity 
			style={styles.container}
			onPress={() => navigation.navigate('Quiz')}	
		>
			<View style={[styles.iconContainer, {backgroundColor: iconBackgroundColor}]}>
				{iconType == 0 ? <HashFill width={40} height={40} /> :
				 iconType == 1 ? <DoubleLeftFill width={40} height={40} /> :
											 	 <InrFill width={40} height={40} />}
			</View>
			<View style={styles.contentContainer}>
				<Text style={styles.header}>{header}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</TouchableOpacity>
  );	
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
		marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
    // elevation: 10,
  },
	iconContainer: {
		width: 60,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 20,
	},
	contentContainer: {

	},
  header: {
    fontFamily: 'Nunito Bold',
    fontSize: 20,
    color: '#4A5462',
		marginBottom: 5,
  },
  description: {
    fontFamily: 'Nunito SemiBold',
    fontSize: 15,
    color: '#CBCFD3'
  },

});

export default QuizCard;
