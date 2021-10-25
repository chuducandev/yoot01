import { useNavigation } from '@react-navigation/native'
import React, {useState, useEffect, useContext, FC } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	SafeAreaView, 
	StatusBar,
	TouchableOpacity,
	ToastAndroid,
	TextInput,
	Image,
} from 'react-native'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const {width, height} = Dimensions.get('window')

type DefaultTextInputProps = {
	width?: number | string, 
	height?: number | string, 
	placeholder?: string, 
	type?: string,
	onChangeText: (text: string) => void,
	style: Object,
	value: string,
}

type DefaultButtonProps = {
	width?: string | number, 
	height?: string | number, 
	text: string, 
	onPress: () => void,
	style: Object,
}

const DefaultTextInput: FC<DefaultTextInputProps> = ({
	width = '100%', 
	height = 50, 
	placeholder, 
	type,
	onChangeText,
	style,
	value,
}) => {
	return (
		<View
			style={[{
				width: width,
				height: height,
				backgroundColor: '#F2F5F7',
				borderRadius: 5,
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'center',
				paddingHorizontal: 10,
			}, style]} 
		>
			<TextInput 
				placeholder={placeholder}
				placeholderTextColor="#C9CCD0"
				secureTextEntry={type == "password"}
				onChangeText={onChangeText}
				textAlignVertical="center"
				keyboardType={type == 'email' ? 'email-address' : undefined}
				autoCapitalize={type == 'username' ? 'none' : undefined}
				value={value}
				style={{
					width: '100%',
					fontFamily: 'Nunito Regular',
					fontSize: 20,
				}}
			/>
		</View>
	)
}

const DefaultButton: FC<DefaultButtonProps> = ({
	width = "100%", 
	height = 50,
	text, 
	onPress,
	style,
}) => {
	return (
		<TouchableOpacity 
		style={[{
			width: width,
			height: height,
			backgroundColor: '#8A7EB5',
			borderRadius: 5,
			justifyContent: 'center',
			paddingHorizontal: 10,
		}, style]} 
			onPress={onPress} 
		>
			<Text 
				style={{
					fontFamily: 'Nunito Bold',
					fontSize: 20,
					color: '#ffffff',
					textAlign: 'center',
				}}
			>
				{text}
			</Text>
		</TouchableOpacity>
	)
}

const Login = () => {
	const [mode, setMode] = useState(0) //0 - log in, 1 - sign up

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");	
	const [feedLoaded, setFeedLoaded] = useState(false)

	const navigation = useNavigation<NativeStackNavigationProp<{Main: {}}>>()

	useEffect(() => {
		if (feedLoaded) {
			setTimeout(() => navigation.replace('Main', {}), 1000)
		}
	}, [feedLoaded])

	const handleChangeEmail = (newEmail: string) => {
		setEmail(newEmail)
	}

	const handleChangePassWord = (newPassWord: string) => {
		setPassword(newPassWord)
	}

	const handleChangeFirstName = (newFirstName: string) => {
		setFirstName(newFirstName)
	}

	const handleChangeLastName = (newLastName: string) => {
		setLastName(newLastName)
	}

	function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
	}

	const handleLogIn = async (email: string, password: string) => {
		if (email == '') {
			ToastAndroid.show('Email must not be empty.', ToastAndroid.SHORT)
			return
		}

		if (password == '') {
			ToastAndroid.show('Password must not empty.', ToastAndroid.SHORT)
			return
		}

		auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log('Logged in successfully.')
			})
			.catch(error => {
				if (error.code == "auth/wrong-password") {
					ToastAndroid.show("You have typed a wrong password.", ToastAndroid.SHORT);
				}
			})
	}

	const handleSignup = async (email: string, firstName: string, lastName: string, password: string) => {

		if (email == '') {
			ToastAndroid.show('Email must not be empty.', ToastAndroid.SHORT)
			return
		}

		if (firstName == '') {
			ToastAndroid.show('First name must not be empty.', ToastAndroid.SHORT)
			return
		}

		if (lastName == '') {
			ToastAndroid.show('Last name must not be empty.', ToastAndroid.SHORT)
			setMode(3)
			return
		}

		if (password == '') {
			ToastAndroid.show('Password must not be empty.', ToastAndroid.SHORT)
			return
		}

		if (!validateEmail(email)) {
			ToastAndroid.show('This email is invalid.', ToastAndroid.SHORT)
			return
		}

		auth()
			.createUserWithEmailAndPassword(email, password)
			.then(data => {
				console.log('New user signed in with id', data.user.uid)
				firestore()
					.collection('users')
					.doc(data.user.uid)
					.set({
						firstName: firstName,
						lastName: lastName,
					})
					.then(() => {
						console.log('New user data retrieved')
					})
			})
			.catch(error => {
				if (error.code === 'auth/email-already-in-use') {
					ToastAndroid.show('That email address is already in use!', ToastAndroid.SHORT);
				}
				if (error.code === 'auth/invalid-email') {
					ToastAndroid.show('That email address is invalid!', ToastAndroid.SHORT);
				}
				if (error.code === 'auth/weak-password') {
					ToastAndroid.show('That password is too weak!', ToastAndroid.SHORT);
				}
				console.error(error);
			})
	}

	return (
		<SafeAreaView style={{backgroundColor: '#000000'}}>
			<StatusBar barStyle={'dark-content'} backgroundColor='#ffffff'/>
			<View style={styles.main}>
				{mode == 0 && <View style={styles.container} >
					<View style={styles.headerContainer}>
						<Text style={styles.header}>Welcome,</Text>
						<Text style={styles.description}>Sign in to continue!</Text>
					</View>
					<View 
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%'
						}}
					>
						<DefaultTextInput 
							placeholder="Email"
							type="email"
							onChangeText={newEmail => handleChangeEmail(newEmail)}
							value={email}
							style={{
								marginBottom: 10,
							}}
						/>
						<DefaultTextInput 
							placeholder="Password"
							type="password"
							onChangeText={newPassWord => handleChangePassWord(newPassWord)}
							value={password}
							style={{
								marginBottom: 10,
							}}
						/>
						<View style={{height: 30}} />
						<DefaultButton 
							text="Đăng nhập"
							onPress={()=>handleLogIn(email, password)}
							style={{
								marginBottom: 3,
							}}
						/>
						
						{/* <View style={{height: 40, backgroundColor: '#f1f1f1'}} /> */}
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center'}}>
							<Text style={styles.text3}>I'm a new user.</Text>
							<TouchableOpacity onPress={()=>setMode(1)}>
								<Text style={styles.text4}> Sign Up</Text>
							</TouchableOpacity>
						</View>
				</View>}

				{mode == 1 && <View style={styles.container}>
					<View style={styles.headerContainer}>
						<Text style={styles.header}>Create Account,</Text>
						<Text style={styles.description}>Sign up to get started!</Text>
					</View>
				 	<View 
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%'
						}}
					>
						<DefaultTextInput 
							placeholder="Email"
							type="email"
							onChangeText={newEmail => handleChangeEmail(newEmail)}
							value={email}
							style={{
								marginBottom: 10,
							}}
						/>
						<DefaultTextInput 
							placeholder="First Name"
							type="firstname"
							onChangeText={newFirstname => handleChangeFirstName(newFirstname)}
							value={firstName}
							style={{
								marginBottom: 10,
							}}
						/>
						<DefaultTextInput 
							placeholder="Last Name"
							type="lastname"
							onChangeText={newLastName => handleChangeLastName(newLastName)}
							value={lastName}
							style={{
								marginBottom: 10,
							}}
						/>
						<DefaultTextInput 
							placeholder="Password"
							type="password"
							onChangeText={newPassWord => handleChangePassWord(newPassWord)}
							value={password}
							style={{
								marginBottom: 10,
							}}
						/>
						<View style={{height: 30}} />
						<DefaultButton 
							text="Đăng ký"
							onPress={()=>handleSignup(email, firstName, lastName, password)}
							style={{
								marginBottom: 3,
							}}
						/>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center'}}>
						<Text style={styles.text3}>I'm already a memner.</Text>
						<TouchableOpacity onPress={()=>setMode(0)}>
							<Text style={styles.text4}> Sign In</Text>
						</TouchableOpacity>
					</View>
				</View>}
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
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flex: 1,
		paddingHorizontal: 30,
	},
	headerContainer: {
		alignItems: 'flex-start', 
		// backgroundColor: '#000000', 
		width: '100%',
	},
	header: {
		fontFamily: 'Nunito Bold',
		fontSize: 32,
		color: '#495260',
		marginTop: 20,
		alignSelf: 'flex-start',
	},
	description: {
		fontFamily: 'Nunito Regular',
		fontSize: 24,
		color: '#CBCFD3',
		alignSelf: 'flex-start',
		marginTop: -5,
	},
	textInput: {
		height: 100,
		marginHorizontal: 40,
	},
	logInButton: {
		width: "70%",
		height: 40,
		backgroundColor: '#3A86FF',
		justifyContent: 'center',
		borderRadius: 5,
		marginBottom: 5,
	},
	text3: {
		fontFamily: 'Nunito Regular',
		fontSize: 16,
		color: '#495260',
		textAlign: 'center',
		marginBottom: 20,
	},
	text4: {
		fontFamily: 'Nunito Bold',
		fontSize: 16,
		color: '#8A7EB5',
		textAlign: 'center',
		marginBottom: 20,
	},
})

export default Login