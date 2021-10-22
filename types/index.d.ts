export type QuestionState = {
	question: string;
	choices: string[]
	correctAnswer: number;
}

export type QuizState = {
	title: string;
	questions: QuestionState[];
}