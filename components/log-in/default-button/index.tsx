import React, { FC } from 'react'
import {
	Text,
	TouchableOpacity,
} from 'react-native'

type DefaultButtonProps = {
	width?: string | number, 
	height?: string | number, 
	text: string, 
	onPress: () => void,
	style: Object,
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

export default DefaultButton