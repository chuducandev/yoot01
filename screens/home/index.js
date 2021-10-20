import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import QuizCode from '../../components/home/quiz-code';
import QuizCard from '../../components/home/quiz-card';

const Home = () => {
  const [quizCode, setQuizCode] = useState('')

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
              <View style={styles.avatar}>
                <Text style={styles.shortName}>LS</Text>
              </View>
            </View>
            <QuizCode />
            <Text style={styles.categoryTitle}>Recent Quiz</Text>
            <QuizCard
              header="Mathematic 2"
              description="10/10 Question"
              iconBackgroundColor="#FDF3DA"
              iconType={0}
            />
            <QuizCard
              header="English for beginner"
              description="15/15 Question"
              iconBackgroundColor="#E6FEF0"
              iconType={1}
            />
            <Text style={styles.categoryTitle}>Live Quiz</Text>
            <QuizCard
              header="English for work"
              description="1253 User playing"
              iconBackgroundColor="#EDEAFB"
              iconType={2}
            />
            <View style={{height: 50}}/>
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

export default Home;
