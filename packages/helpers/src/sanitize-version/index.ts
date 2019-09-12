export default function sanitizeVersion(version: string) {
  return version.replace("^", "").replace("~", "");
}
