export default function ({ store, redirect }) {
	if (store.state.authUser !== 'admin') {
		return redirect('/');
	}
}
