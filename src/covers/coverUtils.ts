export function toPascalCase(str: string) {
  const words = str.split(" ");
  let result = "";
  for (let i = 0; i < words.length; i++) {
    result += words[i][0].toUpperCase() + words[i].substring(1);
  }
  return result;
}
