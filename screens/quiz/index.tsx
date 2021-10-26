import { RouteProp, useNavigation } from '@react-navigation/core';
import React, {useState, FC, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
	TouchableOpacity,
} from 'react-native';

import {decode} from 'html-entities'

import BackRegular from '../../assets/icons/back-regular.svg'
import QuestionRegular from '../../assets/icons/question-regular.svg'
import ChoiceCard from '../../components/quiz/choice-card';
import { QuizState } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addToResults, resetResults } from '../../store/results';

type QuizProps = {
	route: RouteProp<{params: {quiz: QuizState}}>;
}

const Quiz : FC<QuizProps> = ({route}) => {
	const {quiz} = route.params

	const [selection, setSelection] = useState<number>(0)
	const [currentQuestion, setCurrentQuestion] = useState<number>(0)
	const [startingTime, setStartingTime] = useState<number>(0)

	const dispatch = useDispatch<AppDispatch>()

	const navigation = useNavigation<NativeStackNavigationProp<{Results: {
		quizId: string,
		time: number,
		numOfQuestions: number,
	}}>>()

	function nextQuestion() {
		if (selection == quiz.questions[currentQuestion].correctAnswer) dispatch(addToResults(1))
		if (currentQuestion == quiz.questions.length-1) {
			navigation.pop()
			navigation.navigate('Results', {
				quizId: quiz.id,
				time: Date.now() - startingTime,
				numOfQuestions: quiz.questions.length,
			})
		} else
			setCurrentQuestion(oldCurrentQuestion => oldCurrentQuestion + 1)
	}

	useEffect(() => {
		dispatch(resetResults(0))
		setStartingTime(Date.now())
	}, [])

  return (
		<SafeAreaView style={{backgroundColor: '#F8F9F8'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9F8" />
				<ScrollView style={{backgroundColor: '#F8F9F8', minHeight: '100%'}}>
					<View style={styles.container}>
						<View style={styles.header}>
							<BackRegular width={24} height={24} />
							<Text style={styles.headerText}>{quiz.title}</Text>
							<QuestionRegular width={24} height={24} />
						</View>
						<View style={styles.body}>
							<View>
								<Text style={styles.questionNumber}>Question {currentQuestion + 1}/{quiz.questions.length}</Text>
								<Text style={styles.question}>{decode(quiz.questions[currentQuestion].question)}</Text>
							</View>
							<View>
								{quiz.questions[currentQuestion].choices.map((choice, index) => (
									<ChoiceCard
										content={choice}
										index={index}
										selection={selection}
										setSelection={setSelection}
									/>
								))}
								<View style={{height: 30}} />
							</View>
							<TouchableOpacity 
								style={styles.nextButton}
								onPress={() => nextQuestion()}
							>
								<Text style={styles.nextButtonText}>{currentQuestion == quiz.questions.length-1 ? 'Finish' : 'Next'}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9F8',
    width: '100%',
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
    fontSize: 22,
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
