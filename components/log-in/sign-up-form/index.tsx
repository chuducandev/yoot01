import React, { FC } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { UserState } from '../../../types'
import { AppDispatch, RootState } from '../../../store'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../store/user'
import { Controller, useForm } from 'react-hook-form'
import DefaultTextInput from '../default-text-input'
import DefaultButton from '../default-button'

type SignupFormData = {
	email: string,
	firstName: string,
	lastName: string,
	password: string,
}

type SignupFormProps = {
	setMode: (mode: number) => void,
}

const SignupForm: FC<SignupFormProps> = ({setMode}) => {
	const { handleSubmit, control, formState: { errors } } = useForm<SignupFormData>()

	function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
	}

	const onSubmit = async (data: SignupFormData) => {

		if (data.email == '') {
			ToastAndroid.show('Email must not be empty.', ToastAndroid.SHORT)
			return
		}

		if (data.firstName == '') {
			ToastAndroid.show('First name must not be empty.', ToastAndroid.SHORT)
			return
		}

		if (data.lastName == '') {
			ToastAndroid.show('Last name must not be empty.', ToastAndroid.SHORT)
			setMode(3)
			return
		}

		if (data.password == '') {
			ToastAndroid.show('Password must not be empty.', ToastAndroid.SHORT)
			return
		}

		if (!validateEmail(data.email)) {
			ToastAndroid.show('This email is invalid.', ToastAndroid.SHORT)
			return
		}

		auth()
			.createUserWithEmailAndPassword(data.email, data.password)
			.then(userData => {
				console.log('New user signed in with id', userData.user.uid)
				firestore()
					.collection('users')
					.doc(userData.user.uid)
					.set({
						firstName: data.firstName,
						lastName: data.lastName,
					})
					.then(() => {
						console.log('New user data retrieved')
						fetchUser()
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

	async function fetchUser() {
    try {
      const newUser: any = await (await firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .get()).data()
			dispatch(setUser({
				id: auth().currentUser?.uid,
				firstName: newUser?.firstName,
				lastName: newUser?.lastName,
			}))
			console.log('Fetch user: ')
			console.log(newUser)
    } catch(error) {
      console.log(error)
    }
    
  }

	const dispatch = useDispatch<AppDispatch>()
  const user: UserState = useSelector((state: RootState) => state.user)

	return (
		<View style={styles.container}>
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
				<Controller
					control={control}
					rules={{
					required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<DefaultTextInput 
							placeholder="Email"
							type="email"
							onChangeText={onChange}
							value={value}
							style={{
								marginBottom: 10,
							}}
						/>
					)}
					name="email"
					defaultValue=""
				/>
				<Controller
					control={control}
					rules={{
					required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<DefaultTextInput 
							placeholder="First Name"
							type="firstname"
							onChangeText={onChange}
							value={value}
							style={{
								marginBottom: 10,
							}}
					/>
					)}
					name="firstName"
					defaultValue=""
				/>		
				<Controller
					control={control}
					rules={{
					required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<DefaultTextInput 
							placeholder="Last Name"
							type="lastname"
							onChangeText={onChange}
							value={value}
							style={{
								marginBottom: 10,
							}}
						/>
					)}
					name="lastName"
					defaultValue=""
				/>
				<Controller
					control={control}
					rules={{
					required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<DefaultTextInput 
							placeholder="Password"
							type="password"
							onChangeText={onChange}
							value={value}
							style={{
								marginBottom: 10,
							}}
						/>
					)}
					name="password"
					defaultValue=""
				/>
				<View style={{height: 30}} />
				<DefaultButton 
					text="Sign up"
					onPress={handleSubmit(onSubmit)}
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
		</View>
	)

}

const styles = StyleSheet.create({
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

export default SignupForm