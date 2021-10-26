import React, { FC } from 'react'
import {
	View,
	TextInput,
} from 'react-native'

type DefaultTextInputProps = {
	width?: number | string, 
	height?: number | string, 
	placeholder?: string, 
	type?: string,
	onChangeText: (text: string) => void,
	style: Object,
	value: string,
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

export default DefaultTextInput