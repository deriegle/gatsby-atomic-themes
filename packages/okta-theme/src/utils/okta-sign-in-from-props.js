import OktaSignIn from '@okta/okta-signin-widget'

export default function oktaSignInFromProps(props = {}) {
	return new OktaSignIn({
		baseUrl: props.oktaBaseUrl || process.env.OKTA_BASE_URL,
		logo: props.logo || process.env.OKTA_LOGO,
		redirectUri: props.redirectUri || window.location.origin,
		authParams: {
			issuer: 'default',
			responseType: ['id_token', 'token'],
			display: 'page',
		},
		features: {
			registration: props.allowRegistration, // Enable self-service registration flow
			rememberMe: props.rememberMe, // Setting to false will remove the checkbox to save username
			selfServiceUnlock: props.selfServiceUnlock,
		},
		clientId: props.clientId || process.env.OKTA_CLIENT_ID,
		// Return an access token from the authorization server
		getAccessToken: true,
		// Return an ID token from the authorization server
		getIdToken: true,
	})
}
