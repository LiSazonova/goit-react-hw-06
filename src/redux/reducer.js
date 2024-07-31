const initialState = {
    contacts: {
        items: []
    },
    filters: {
        name: ""
    }

}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};