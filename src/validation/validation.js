const validation = (schema, userInput) => {
  let errorObjArr = {};

  const { error } = schema.validate(userInput, { abortEarly: false });
  if (!error) {
    return null;
  }
  const { details } = error;
  for (let item of details) {
    if (!errorObjArr[item.context.key]) {
      errorObjArr[item.context.key] = [];
    }
    errorObjArr[item.context.key] = [
      ...errorObjArr[item.context.key],
      item.message,
    ];
  }
  return errorObjArr;
};
export default validation;
