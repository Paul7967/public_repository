import {useState, useCallback} from 'react';

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(
		async (
			url, 
			method = 'GET', 
			body = null, 
			headers = {}
		) => {
			setLoading(true);

			try {
				if (body) {
					body = JSON.stringify(body);
					headers['Content-Type'] = 'application/json';
				}
				const response = await fetch(url, {method, body, headers});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message || 'Что-то пошло не так')
				};

				setLoading(false);

				return data;

			} catch (e) {
				setLoading(false);
				setError(e.message);
				throw e;
			}
		}, 
	[]);

	const clearError = () => setError(null);
	
	return { loading, request, error, clearError };
}

/*
свой хук, который позволяет работать с асинхронными запросами на сервер, 
используя нативный api браузера fetch
содержит в стейт значение loading, который показывает состояние запроса
содержит в стейт значение error, который показывает есть ли ошибка и ее значение
используем хук useCallback, чтобы react не уходил в рекурсию
*/