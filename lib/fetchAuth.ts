export async function fetchAuth(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response | null> {
  let res = await fetch(input, {
    ...init,
    credentials: "include", // để gửi cookie refreshToken
  });

  // nếu access token hết hạn
  if (res.status === 401) {
    const refresh = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!refresh.ok) {
      return null;
    }

    // gọi lại request cũ
    res = await fetch(input, {
      ...init,
      credentials: "include",
    });
  }

  return res;
}