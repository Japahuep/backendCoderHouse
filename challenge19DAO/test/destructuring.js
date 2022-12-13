const testObj = { id: 1, data: "aser", etc: 1 };

const newProperties = { data: "new" };

const updatedObj = { ...testObj, ...newProperties };

console.log(updatedObj);