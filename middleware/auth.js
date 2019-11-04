export default function ({ store, error }) {
	console.log('middleware', store.state.authUser);
	if (!store.state.authUser) {
		error({
			message: 'You are not connected',
			statusCode: 403
		})
	}
}
