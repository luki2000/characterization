export function parseUserForResponse (user: User) {
  const returnData = JSON.parse(JSON.stringify(user));
  delete returnData.password;
  return returnData;
}