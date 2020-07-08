export function padzeros(s: string, minlength: number) {
  const n = s.length
  let out = s
  if (n < minlength) {
    out = `${"0".repeat(minlength - n)}${s}`
  }
  return out
}
