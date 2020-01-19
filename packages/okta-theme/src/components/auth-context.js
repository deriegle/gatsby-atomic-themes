import React, { useEffect } from 'react'

const defaultState = {
	user: false, // user has not logged in
	logoutUser: () => {}, // get the publish ID from the Campaign ID
	validateUser: () => {}, // get the publish ID from the Campaign ID
}

const AuthContext = React.createContext(defaultState)

export function useAuthContext() {
	const context = useContext(AuthContext)

	if (context === undefined) {
		throw new Error(
			'useAuthContext must be used inside of an AuthContext.Provider'
		)
	}

	return context
}

export function AuthContextConsumer({ children }) {
	const context = useAuthContext()

	return children(context)
}

export function AuthContextProvider({
	user,
	logoutUser,
	validateUser,
	children,
}) {
	const [state, setState] = useState(defaultState)

	useEffect(() => {
		setState(s => ({
			...s,
			user,
			logoutUser,
			validateUser,
		}))
	}, [user, logoutUser, validateUser])

	return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
