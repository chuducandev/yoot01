import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BackRegular from '../../assets/icons/back-regular.svg'
import QuestionRegular from '../../assets/icons/question-regular.svg'
import ChoiceCard from '../../components/quiz/choice-card';

const Quiz = () => {
	const choices = ['Most expensive', 'More expensive', 'Expensivest', 'As expensive']

	const [selection, setSelection] = useState(0)

  return (
		<SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <StatusBar barStyle="light-content" backgroundColor="#F8F9F8" />
				<View style={styles.container}>
					<View style={styles.header}>
						<BackRegular width={24} height={24} />
						<Text style={styles.headerText}>English for beginner</Text>
						<QuestionRegular width={24} height={24} />
					</View>
					<View style={styles.body}>
						<View style={styles.questionContainer}> 
							<Text style={styles.questionNumber}>Question 6/15</Text>
							<Text style={styles.question}>Motor racing is the ---- sport in the world.</Text>
						</View>
						<View>
							{choices.map((choice, index) => (
								<ChoiceCard 
									content={choice}
									index={index}
									selection={selection}
									setSelection={setSelection}
								/>
							))}
							<View style={{height: 30}} />
						</View>
						<View style={styles.nextButton}>
							<Text style={styles.nextButtonText}>Next</Text>
						</View>
					</View>
				</View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9F8',
    width: '100%',
    height: '100%',
		paddingHorizontal: 30,
  },  
	header: {
		marginTop: 20,
		marginBottom: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerText: {
		fontFamily: 'Nunito Bold',
    fontSize: 20,
    color: '#4A5462',
		marginBottom: 5,
	},
	body: {
		justifyContent: 'space-between',
		flex: 1,
		marginBottom: 30,
	},
	questionNumber: {
		fontFamily: 'Nunito Bold',
    fontSize: 18,
    color: '#F9AA2E',
		marginBottom: 5,
	},
	question: {
		fontFamily: 'Nunito Bold',
    fontSize: 26,
    color: '#4A5462',
		marginBottom: 5,
	},
	nextButton: {
		height: 80,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#8A7EB5',
	},
	nextButtonText: {
		fontFamily: 'Nunito Bold',
    fontSize: 26,
    color: '#ffffff',
		marginBottom: 5,
	}
});

export default Quiz;
