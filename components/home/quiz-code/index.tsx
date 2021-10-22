import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const QuizCode = () => {
  const [quizCode, setQuizCode] = useState('')

  return (
		<View style={styles.container}>
			<Text style={styles.header}>Enter your quiz code</Text>
			<Text style={styles.description}>To play with your friends</Text>
			<View style={styles.inputContainer}>
				<TextInput 
					placeholder="Ex: cS09S"
					placeholderTextColor="#C9CCD0"
					onChangeText={newQuizCode => setQuizCode(newQuizCode)}
					textAlignVertical="center"
					value={quizCode}
					style={{
						flex: 1,
						marginBottom: -5,
						fontFamily: 'Nunito SemiBold',
						fontSize: 16,
					}}
				/>
				<TouchableOpacity style={styles.submitButton}>
					<Text style={styles.submitText}>Enter</Text>
				</TouchableOpacity>
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
    fontSize: 20,
    color: '#4A5462'
  },
  description: {
    fontFamily: 'Nunito SemiBold',
    fontSize: 15,
    color: '#CBCFD3'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F5F7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#8A7EB5',
    borderRadius: 3,
    height: 36,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  submitText: {
    fontFamily: 'Nunito Bold',
    color: '#ffffff',
    fontSize: 16,
  }

});

export default QuizCode;
