import {
	CHANGE_PROFILE_TYPE,
	CREATE_TEAM_SUCCESS,
	EDIT_TEAM_SUCCESS,
	GET_PLAYER_SUCCESS,
	GET_TEAM_SUCCESS,
	SIGN_IN_SUCCESS,
	SIGN_OUT,
} from '../actions/actionTypes';

const initialState = {
	userIsLoggedIn: false,
	profileType: 'ONE', // ONE или COMMAND
	user: {
		EMAIL: '',
		ID: '',
		LOGIN: '',
		PHONE: '',
		PHOTO: '',
		COUNT_GAMES: '0',
		POINTS: 0,
		TOURNAMENT: [],
		COMMAND_CAPTAIN: '',
		COMMANDS: [],
	},
	team: {
		ID: '',
		NAME: '',
		PICTURE: '',
		POINTS: 0,
		COUNT_GAMES: '0',
		CAPTAIN: {},
		PLAYERS: [],
		TOURNAMENTS: [],
	},
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN_SUCCESS:
			return {...state, user: action.user, userIsLoggedIn: true};
		case GET_PLAYER_SUCCESS:
			const {COUNT_GAMES, POINTS, TOURNAMENT, COMMAND_CAPTAIN, COMMANDS, PICTURE} = action.data;
			return {
				...state,
				user: {
					...state.user,
					PHOTO: PICTURE,
					COUNT_GAMES,
					POINTS,
					TOURNAMENT,
					COMMAND_CAPTAIN,
					COMMANDS,
				},
			};
		case CHANGE_PROFILE_TYPE:
			return {...state, profileType: action.profileType === 'ONE' ? 'COMMAND' : 'ONE'};
		case CREATE_TEAM_SUCCESS:
			return {...state, team: {...state.team, ID: action.id}};
		case GET_TEAM_SUCCESS:
			return {...state, team: action.team};
		case EDIT_TEAM_SUCCESS:
			return {...state, team: {...state.team, NAME: action.team.NAME, PICTURE: action.team.PICTURE}};
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default userReducer;
