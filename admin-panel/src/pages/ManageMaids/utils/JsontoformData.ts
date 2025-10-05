export const jsonToFormData = (jsonObject: any) => {
  // Create a new FormData object to store the form data
  const formData = new FormData();

  // Loop through each key in the JSON object
  for (const key in jsonObject) {
    // Check if the key exists on the object itself (not on the prototype chain)
    if (jsonObject.hasOwnProperty(key)) {
      // Get the value of the current key
      const value = jsonObject[key];

      // Check if the value is an array
      if (Array.isArray(value)) {
        // If the value is an array, loop through each element in the array
        for (let i = 0; i < value.length; i++) {
          const element = value[i];
          // Check if the current element is an array or an object
          if (Array.isArray(element) || typeof element === 'object') {
            // If the current element is an array or object, create a new FormData object recursively
            const nestedFormData: any = jsonToFormData(element);
            // Loop through each key in the nested FormData object and append the key-value pairs to the main FormData object
            for (const nestedKey of nestedFormData.keys()) {
              formData.append(
                `${key}[${i}][${nestedKey}]`,
                nestedFormData.get(nestedKey)
              );
            }
          } else {
            // If the current element is not an array or object, append the element to the FormData object
            formData.append(`${key}[${i}]`, element);
          }
        }
      } else if (typeof value === 'object' && !(value instanceof File)) {
        // If the value is an object (but not a File object), loop through each key in the object and append the key-value pairs to the FormData object
        for (const nestedKey in value) {
          if (value.hasOwnProperty(nestedKey)) {
            formData.append(`${key}.${nestedKey}`, value[nestedKey]);
          }
        }
      } else if (value instanceof File) {
        // If the value is a File object, append it to the FormData object using the current key as the field name;

        formData.append(key, value);
      } else {
        // If the value is not an array, object, or File object, append it to the FormData object using the current key as the field name
        formData.append(key, value);
      }
    }
  }

  // Return the completed FormData object
  return formData;
};
