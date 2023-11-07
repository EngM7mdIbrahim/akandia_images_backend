export default function validateUserFilePath(path: string): boolean {
  const regex = /^\/users\/[0-9a-f]{24}\/files\/.+$/;
  return regex.test(path);
}