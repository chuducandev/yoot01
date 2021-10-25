export type QuestionState = {
	question: string;
	choices: string[]
	correctAnswer: number;
}

export type QuizState = {
	id: string,
	title: string;
	questions: QuestionState[];
}

export type ResultsState = number;

export type LeaderboardState = {
	quizId: string,
	name: string,
	score: number,
} []

export type UserState = {
	id?: string,
	firstName?: string,
	lastName?: string,
}