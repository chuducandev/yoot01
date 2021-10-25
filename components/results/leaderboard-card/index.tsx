import React, {useState, FC} from 'react';
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
import { QuizState } from '../../../types';

type LeaderboardCardProps = {
	name: string,
	score: number,
}

const LeaderboardCard : FC<LeaderboardCardProps> = ({name, score}) => {
	const navigation = useNavigation()

  return (
		<View style={styles.container}>
			<Text style={styles.header}>{name}</Text>
			<View style={styles.pointContainer}>
				<Text style={styles.pointText}>{score} point{score > 1 ? 's' : ''}</Text>
			</View>
	</View>
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
		justifyContent: 'space-between',
		alignItems: 'center',
    // elevation: 10,
  },
  header: {
    fontFamily: 'Nunito Bold',
    fontSize: 20,
    color: '#4A5462',
		marginBottom: 5,
  },
	pointContainer: {
		paddingHorizontal: 10,
		paddingTop: 1,
		paddingBottom: 3,
		borderRadius: 20,
		borderColor: '#F9AA2E',
		borderWidth: 2,
		alignSelf: 'center',
	},
	pointText: {
		fontFamily: 'Nunito Bold',
    fontSize: 14,
		textAlign: 'center',
    color: '#F9AA2E'
	},
});

export default LeaderboardCard;
