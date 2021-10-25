import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import axios from 'axios'

import { RootState, AppDispatch } from '../../store';

import QuizCode from '../../components/home/quiz-code';
import QuizCard from '../../components/home/quiz-card';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setQuizzes, addToQuizzes } from '../../store/quizzes';
import { QuizState } from '../../types';

const mapDispatch = {
  setQuizzes,
}

const Home = () => {
  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  async function fetchQuiz(id: string, title: string, url: string) {
    try {
      const { data } : any = await axios.get(url)
      if ('results' in data) {
        data.results.forEach((result: any) => console.log(result))
        const newQuiz: QuizState = {
          id: id,
          title: title,
          questions: data.results.map((result: any) => {
            const choices: string[] = [...result.incorrect_answers, result.correct_answer]
            shuffleArray(choices)
            let correctAnswer: number = -1
            for (let i = 0; i < choices.length; i++) {
              if (choices[i] == result.correct_answer) correctAnswer = i
            }

            return {
            question: result.question,
            choices: choices,
            correctAnswer: correctAnswer,
          }})
        }
        dispatch(addToQuizzes(newQuiz))
      } else {
        ToastAndroid.show('Something wrong happen.', ToastAndroid.SHORT)
      }
    } catch(error) {
      // ToastAndroid.show(error as string, ToastAndroid.SHORT)
    }
  }

  const [quizCode, setQuizCode] = useState<string>('')
  const [loaded, setLoaded] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()

  const quizzes: QuizState[] | null = useSelector((state: RootState) => state.quizzes)

  async function fetchQuizzes() {
    const newQuizzes = await (await firestore().collection('quizzes').get()).docs.map(doc => doc.data()) as QuizState[];
    dispatch(setQuizzes(newQuizzes))
    // console.log(quizzes)
  }

  async function handleSignOut() {
		auth()
			.signOut()
      .then(() => {
        dispatch(setQuizzes([]))
      })
			.catch (error => {
				console.log(error)
			})
	}

  useEffect(() => {
    // fetchQuizzes()
    if (!loaded) {
      fetchQuiz('1', 'Books', 'https://opentdb.com/api.php?amount=10&category=10')
      fetchQuiz('2', 'Films', 'https://opentdb.com/api.php?amount=10&category=11')
      fetchQuiz('3', 'Music', 'https://opentdb.com/api.php?amount=10&category=12')
      fetchQuiz('4', 'Board Games', 'https://opentdb.com/api.php?amount=10&category=16')
      setLoaded(true)
    }
  }, [])

  return (
		<SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <StatusBar barStyle="light-content" backgroundColor="#8A7EB5" />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.cover} />
            <View style={styles.header}>
              <View style={styles.slogan}>
                <Text style={styles.bigSloganText}>Lets play</Text>
                <Text style={styles.smallSloganText}>And be the first!</Text>
              </View>
              <TouchableOpacity
                style={styles.avatar}
                onPress={() => handleSignOut()}  
              >
                <Text style={styles.shortName}>LS</Text>
              </TouchableOpacity>
            </View>
            <QuizCode />
            {quizzes && quizzes.length > 0 && <View>
              <Text style={styles.categoryTitle}>Recent Quiz</Text>
              {quizzes.map((quiz: QuizState, index: number) => (
                <QuizCard 
                  quiz={quiz} 
                  iconBackgroundColor={["#FDF3DA", "#E6FEF0", "#EDEAFB"][index % 3]}
                  iconType={index % 3}
                />
              ))}
              <View style={{height: 50}}/>
            </View>}
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9F8',
    width: '100%',
    height: '100%',
  },  
  cover: {
    width: '100%',
    height: 200,
    backgroundColor: '#8A7EB5',
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    paddingHorizontal: 30,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  slogan: {
    flex: 1,
    alignItems: 'flex-start',
  },
  bigSloganText: {
    fontFamily: 'Nunito Bold',
    color: '#ffffff',
    fontSize: 40,
  },
  smallSloganText: {
    fontFamily: 'Nunito SemiBold',
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 2,
    marginTop: 5,
  },
  avatar: {
    width: 56, 
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -10, 
  },
  shortName: {
    fontFamily: 'Nunito Black',
    color: '#8A7EB5',
    fontSize: 20,
  },
  categoryTitle: {
    marginHorizontal: 30,
    marginTop: 40,
    fontFamily: 'Nunito Bold',
    fontSize: 20,
    color: '#495260'
  }

});

export default connect(null, mapDispatch)(Home);
