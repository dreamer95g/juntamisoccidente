import Vue from "vue";
import VueApollo from "vue-apollo";
import {
    createApolloClient
} from "vue-cli-plugin-apollo/graphql-client";

Vue.use(VueApollo);

const httpEndpoint = "http://graphoikos.oikos/graphql";

// Config
const defaultOptions = {
    httpEndpoint,
    persisting: false,
    ssr: false,
};



// Call this in the Vue app file
export function createProvider(options = {}) {

    const {
        apolloClient
    } = createApolloClient({
        ...defaultOptions,
        ...options,
    });

    // Create vue apollo provider
    return new VueApollo({
        defaultClient: apolloClient,
        defaultOptions: {},
        errorHandler(error) {
            console.log(
                "%cError",
                "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
                error.message
            );
        },
    });
}
