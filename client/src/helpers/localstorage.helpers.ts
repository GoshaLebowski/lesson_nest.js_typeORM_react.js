export function getTokenFromLocalStorage(): string {
	const data = localStorage.getItem("token");
	return data ? JSON.parse(data) : '';
}

export function setTokenToLocalStorage(key: string, token: string): void {
	localStorage.setItem(key, JSON.stringify(token))
}

export function removeTokenFromLocalStorage(key: string): void {
	localStorage.removeItem(key);
}