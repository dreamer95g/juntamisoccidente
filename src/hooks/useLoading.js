

//state
const state = {
    loading: false
};

//getter
const isLoading = (() => state.loading);

//setter
function setLoading(newState) {
    state.loading = newState;
}

export default {state, isLoading, setLoading}