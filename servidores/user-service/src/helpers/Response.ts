export function response<T>(ok: boolean, data: T, message: string) {
  return { ok, data, message };
}
