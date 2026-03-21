export async function getCsrfToken(): Promise<string> {
  let token = getCookie('csrftoken');

  if (!token) {
    await fetch('http://localhost:8000/api/csrf/', {
      credentials: 'include',
    });

    token = getCookie('csrftoken');
  }

  return token ?? '';
}

function getCookie(name: string): string | null {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];

  return token || null;
}
