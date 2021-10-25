import React, {useState, FC} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type ResultsCardProps = {
	score: number,
	results: number,
	numOfQuestions: number
}

const ResultsCard: FC<ResultsCardProps> = ({score, results, numOfQuestions}) => {
  

  return (
		<View style={styles.container}>
			<Text style={styles.header}>Congratulations! You have scored</Text>
			<View style={styles.scoreContainer}>
				<Text style={styles.scoreText} >{results}</Text>
				<Text style={styles.scoreText2}>Out of {numOfQuestions}</Text>
			</View>
			<Text style={styles.pointHeaderText}>You have earned</Text>
			<View style={styles.pointContainer}>
				<Text style={styles.pointText}>{score} point{score > 1 ? 's' : ''}</Text>
			</View>
		</View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    // elevation: 30,
  },
  header: {
    fontFamily: 'Nunito Bold',
    fontSize: 16,
		textAlign: 'center',
    color: '#4A5462'
  },
	scoreContainer: {
		width: 120,
		height: 120, 
		borderRadius: 60,
		backgroundColor: '#8A7EB5',
		marginTop: 20,
		alignSelf: 'center',
		justifyContent: 'center',
	},
	scoreText: {
		fontFamily: 'Nunito ExtraBold',
    fontSize: 46,
		textAlign: 'center',
    color: '#ffffff',
		marginTop: -12,
	},
	scoreText2: {
		fontFamily: 'Nunito Bold',
    fontSize: 16,
		textAlign: 'center',
    color: '#ffffff'
	},
	pointHeaderText: {
		fontFamily: 'Nunito Bold',
    fontSize: 16,
		textAlign: 'center',
    color: '#F9AA2E',
		marginTop: 20,
	},
	pointContainer: {
		paddingHorizontal: 10,
		paddingTop: 1,
		paddingBottom: 3,
		marginTop: 10,
		borderRadius: 20,
		borderColor: '#F9AA2E',
		borderWidth: 2,
		alignSelf: 'center',
	},
	pointText: {
		fontFamily: 'Nunito Bold',
    fontSize: 16,
		textAlign: 'center',
    color: '#F9AA2E'
	},
});

export default ResultsCard;
