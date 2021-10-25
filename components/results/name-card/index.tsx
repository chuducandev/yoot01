import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type NameCardProps = {
  handleSubmitResults: (name: string) => void,
}

const NameCard: FC<NameCardProps> = ({handleSubmitResults}) => {
  const [name, setName] = useState('')

  return (
		<View style={styles.container}>
			<Text style={styles.header}>Enter your name</Text>
			<Text style={styles.description}>To be shown on the leaderboard</Text>
			<View style={styles.inputContainer}>
				<TextInput 
					placeholder="Ex: Anderson Chu"
					placeholderTextColor="#C9CCD0"
					onChangeText={newName => setName(newName)}
					textAlignVertical="center"
					value={name}
					style={{
						flex: 1,
						marginBottom: -5,
						fontFamily: 'Nunito SemiBold',
						fontSize: 16,
					}}
				/>
				<TouchableOpacity 
          style={styles.submitButton}
          onPress={() => handleSubmitResults(name)}
        >
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

export default NameCard;
