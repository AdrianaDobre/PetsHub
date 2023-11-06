import { ADD_TODO } from "../types";

const initialState = {
    todos: [],
};

const testReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_TODO: {
            const { id } = action.payload;
            return {
                ...state,
                todos: [...state.todos, { id }],
            };
        }
        default:
            return state;
    }
};

export default testReducer;
