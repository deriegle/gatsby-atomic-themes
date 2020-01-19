import React, {
	Fragment,
	useCallback,
	useEffect,
	useState,
	useRef,
} from 'react'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
import oktaSignInFromProps from '../utils/okta-sign-in-from-props'
import { AuthContextProvider } from './auth-context'

/*
 * Component: AuthWrapper
 * props:
 *  oktaBaseUrl: String [default: process.env.OKTA_BASE_URL]
 *  logo: String [default: process.env.OKTA_LOGO]
 *  clientId: String [default: process.env.OKTA_CLIENT_ID]
 *  redirectUri: String
 *  allowRegistration: Boolean [default: false]
 *  oktaElementId: Boolean [default: '#okta']
 *  rememberMe: Boolean [default: true]
 *  selfServiceUnlock: Boolean [default: false]
 */
export default function AuthWrapper(props) {
	const oktaWidgetRef = useRef(oktaSignFromProps(props))
	const checkingSessionRef = useRef(false)
	const [user, setUser] = useState(false)

	function showSignIn() {
		const widget = oktaWidgetRef.current
		if (typeof widget === 'undefined') {
			return
		}

		widget.remove()
		widget.renderEl({
			el: `#${props.oktaElementId || 'okta'}`,
		})
	}

	const validateUser = useCallback(async () => {
		const widget = oktaWidgetRef.current
		if (typeof widget === 'undefined') {
			return
		}

		const result = await widget.authClient.session.exists()
		if (!result) {
			return showSignIn()
		}

		const session = await widget.authClient.session.get().catch(console.error)

		if (!session || typeof session.login === 'undefined') {
			return showSignIn()
		}

		setUser(session.login)
	}, [setUser, oktaWidgetRef])

	const logoutUser = useCallback(async () => {
		const widget = oktaWidgetRef.current

		try {
			await widget.authClient.signOut()
			widget.show()
			setUser(false)
			window.location.reload()
		} catch (err) {
			console.error(err)
		}
	}, [setUser, oktaWidgetRef])

	useEffect(() => {
		validateUser().then(async res => {
			const widget = oktaWidgetRef.current

			if (!widget.hasTokensInUrl()) {
				return
			}

			// Store the ID and Access Token
			const [
				idToken,
				accessToken,
			] = await widget.authClient.token.parseFromUrl()

			widget.authClient.tokenManager.add('id_token', idToken)
			widget.authClient.tokenManager.add('access_token', accessToken)
		})
	}, [])

	return (
		<AuthContextProvider
			user={user}
			logoutUser={logoutUser}
			validateUser={validateUser}
		>
			<Fragment>{children}</Fragment>
		</AuthContextProvider>
	)
}
