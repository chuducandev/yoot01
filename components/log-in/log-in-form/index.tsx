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

type LoginFormData = {
	email: string,
	password: string,
}

type LoginFormProps = {
	setMode: (mode: number) => void,
}

const LoginForm: FC<LoginFormProps> = ({setMode}) => {
	const { handleSubmit, control, formState: { errors } } = useForm<LoginFormData>()

	const onSubmit = async (data: LoginFormData) => {
		if (data.email == '') {
			ToastAndroid.show('Email must not be empty.', ToastAndroid.SHORT)
			return
		}

		if (data.password == '') {
			ToastAndroid.show('Password must not empty.', ToastAndroid.SHORT)
			return
		}

		auth()
			.signInWithEmailAndPassword(data.email, data.password)
			.then(() => {
				console.log('Logged in successfully.')
				fetchUser()
			})
			.catch(error => {
				if (error.code == "auth/wrong-password") {
					ToastAndroid.show("You have typed a wrong password.", ToastAndroid.SHORT);
				}
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
		<View style={styles.container} >
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
					text="Sign in"
					onPress={handleSubmit(onSubmit)}
					style={{
						marginBottom: 3,
					}}
				/>
			</View>
			<View style={{flexDirection: 'row', justifyContent: 'center'}}>
					<Text style={styles.text3}>I'm a new user.</Text>
					<TouchableOpacity onPress={()=>setMode(1)}>
						<Text style={styles.text4}> Sign Up</Text>
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

export default LoginForm