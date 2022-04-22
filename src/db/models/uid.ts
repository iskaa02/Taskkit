// export function uid(num = 8) {
//   return (
//     performance.now().toString(num) + Math.random().toString(num)
//   ).replace(/\./g, "");
// }

export function uid(num = 18) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
