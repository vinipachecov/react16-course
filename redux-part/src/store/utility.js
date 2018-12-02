export const updatedObject = (odlObject, updatedValues) => {
  return { 
    ...odlObject, 
    ...updatedValues
  };    
}