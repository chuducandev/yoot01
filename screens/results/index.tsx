import { RouteProp, useNavigation } from '@react-navigation/core';
import React, {useState, FC} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native';

import {decode} from 'html-entities'

import firestore from '@react-native-firebase/firestore';

import BackRegular from '../../assets/icons/back-regular.svg'
import QuestionRegular from '../../assets/icons/question-regular.svg'
import ChoiceCard from '../../components/quiz/choice-card';
import { LeaderboardState, QuizState } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import ResultsCard from '../../components/results/results-card';
import NameCard from '../../components/results/name-card';
import LeaderboardCard from '../../components/results/leaderboard-card';

type ResultsProps = {
	route: RouteProp<{params: {
		quizId: string, 
		time: number,
		numOfQuestions: number,
	}}>,
}

const Results : FC<ResultsProps> = ({route}) => {
	const [mode, setMode] = useState(0)
	const [leaderboard, setLeaderboard] = useState<LeaderboardState | null>(null)

	const results = useSelector((state: RootState) => state.results)
	const dispatch = useDispatch<AppDispatch>()

	const {time, numOfQuestions, quizId} = route.params

	const a = -0.00625 * results / numOfQuestions
	const b = 50 * results - 10000 * numOfQuestions * a
	const calculatedTime: number = Math.max(Math.min(time, 10000 * numOfQuestions), 2000 * numOfQuestions)
	const score = Math.floor(calculatedTime * a + b)

	const navigation = useNavigation()

	async function fetchLeaderboard() {
		const newLeaderboard = await(
			await firestore()
				.collection('results')
				.where(new firestore.FieldPath('quizId'), '==', quizId)
				.orderBy(new firestore.FieldPath('score'), 'desc')
				.get())
			.docs
			.map(doc => doc.data()) as LeaderboardState
		setLeaderboard(newLeaderboard)
		console.log(newLeaderboard)
	}

	function handleSubmitResults(name: string) {
		setMode(1)

		// console.log(results, numOfQuestions, a, b, time, calculatedTime, Math.floor(a * calculatedTime + b))
		
		firestore()
			.collection('results')
			.add({
				name: name,
				quizId: quizId,
				score: score,
			})
			.then(() => {
				fetchLeaderboard()
			})
			.catch(error => {
				ToastAndroid.show(error, ToastAndroid.SHORT)
			})
	}

  return (
		<SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <StatusBar barStyle="light-content" backgroundColor="#8A7EB5" />
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.cover} />
				<View style={styles.header}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<BackRegular width={24} height={24} />
					</TouchableOpacity>
					<Text style={styles.headerText}>Quiz Results</Text>
					<QuestionRegular width={24} height={24} opacity={0} />
				</View>
				<ResultsCard 
					score={score}
					results={results}
					numOfQuestions={numOfQuestions}
				/>
				<View style={{height: 30}} />
				{mode == 0 && <NameCard handleSubmitResults={handleSubmitResults} />}
				{mode == 1 && leaderboard && <View>
					<Text style={styles.categoryTitle}>See where you stand</Text>
					{leaderboard.map(item => (
						<LeaderboardCard 
							name={item.name}
							score={item.score}
						/>
					))}
					<View style={{height: 30}} />
				</View>}
			</ScrollView>
		</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9F8',
    width: '100%',
    minHeight: '100%',
  },  
	cover: {
    width: '100%',
    height: 240,
    backgroundColor: '#8A7EB5',
    ...StyleSheet.absoluteFillObject,
  },
	header: {
		paddingHorizontal: 30,
		marginTop: 20,
		marginBottom: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerText: {
		fontFamily: 'Nunito Bold',
    fontSize: 20,
    // color: '#4A5462',
		color: '#ffffff',
		marginBottom: 5,
	},
	categoryTitle: {
    marginHorizontal: 30,
    fontFamily: 'Nunito Bold',
    fontSize: 20,
    color: '#495260'
  }
});

export default Results;
// score = a * time + b
// time = 2000 * numOfQuestions => results * 100 = 2000 * numOfQuestions * a + b
// time = 10000 * numOfQuestions => results * 50 = 10000 * numOfQuestions * a + b
// ==> -50 * results = 8000 * numOfQuestions * a ==> a = -0.00625 * results / numOfQuestions
// ==> b = 50 * results - 10000 * numOfQuestions * a