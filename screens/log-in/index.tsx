import { useNavigation } from '@react-navigation/native'
import React, {useState, useEffect, FC } from 'react'
import {
	View,
	StyleSheet,
	SafeAreaView, 
	StatusBar,
} from 'react-native'

import LoginForm from '../../components/log-in/log-in-form'
import SignupForm from '../../components/log-in/sign-up-form'

const Login = () => {
	const [mode, setMode] = useState(0) //0 - log in, 1 - sign up

	return (
		<SafeAreaView style={{backgroundColor: '#000000'}}>
			<StatusBar barStyle={'dark-content'} backgroundColor='#ffffff'/>
			<View style={styles.main}>
				{mode == 0 && <LoginForm setMode ={setMode}/>}
				{mode == 1 && <SignupForm setMode={setMode}/>}
			</View>
		</SafeAreaView>
	)

}

const styles = StyleSheet.create({
	main: {
		height: '100%',
		backgroundColor: '#ffffff',
		// flexDirection: 'row',
	},
})

export default Login