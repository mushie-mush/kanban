export async function getCsrfToken(): Promise<string> {
  await fetch('http://localhost:8000/api/csrf/', {
    credentials: 'include',
  });

  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1];

  return token ?? '';
}
