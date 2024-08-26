export const convertBase64ToFile = (base64String, fileName, fileType) => {
  const byteString = atob(base64String.split(",")[1]); // Split to get the base64 part only
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([arrayBuffer], { type: fileType });
  return new File([blob], fileName, { type: fileType });
};
