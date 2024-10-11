import CryptoJS from 'crypto-js';
const useEncryption = (sharedSecretKey:string) => {
  const encryptData =(data:any)=> {
    return CryptoJS.AES.encrypt(JSON.stringify(data), sharedSecretKey).toString();
  }
  const decryptData = (data:any) => {
    const decrypted = CryptoJS.AES.decrypt(data, sharedSecretKey).toString(CryptoJS.enc.Utf8);
    if(decrypted){
      return JSON.parse(decrypted) ;
    }
  }

  return { encryptData, decryptData };
};

export default useEncryption;