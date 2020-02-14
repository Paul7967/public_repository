import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [ready, setReady] = useState(false);
	const [userId, setUserId] = useState(null);
	const [userEmail, setUserEmail] = useState(null);

	const login = useCallback((jwtToken, id, email='') => {
		setToken(jwtToken);
		setUserId(id);
		setUserEmail(email)
		// добавить проверку на то что не вышел срок действия токена
		localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken, userEamil: email}));
	}, []);
		
	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);

		localStorage.removeItem(storageName);
	}, []);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName));

		if (data && data.token) {
			login(data.token, data.userId, data.userEamil)
		}
		setReady(true);
	}, [login])

	return {login, logout, token, userId, ready, userEmail}
}