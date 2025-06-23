// const baseUrl = 'http://122.170.0.3:5000';
const baseUrl = 'http://192.168.1.21:6010';
// const baseUrl = 'https://5c66-122-170-0-3.ngrok-free.app';
export const environment = {
  production: false,

  WebAPIUrl: `${baseUrl}/v1/`,
  uploadedUrl: `${baseUrl}/uploads/photos/`,
  uploadsUrl: `${baseUrl}/uploads/`,

  // For Local
  // WebAPIUrl: 'http://localhost:5000/v1/',
  // WebAPIUrl: 'http://192.168.1.16:6010/v1/',
  // WebAPIUrl: 'http://192.168.1.32:5000/v1/',
  // WebAPIUrl: 'http://192.168.1.16:5000/v1/',
  
  //#region Pratham URL
  // WebAPIUrl: 'http://192.168.1.21:6010/v1/',
  // uploadedUrl: 'http://192.168.1.21:6010/uploads/photos/',
  // uploadsUrl: 'http://192.168.1.21:6010/uploads/',

  //#region Localtunnel URL


  // WebAPIUrl: 'https://tempspectrodevbackend.onrender.com/v1/',
  // uploadsUrl: 'https://tempspectrodevbackend.onrender.com/uploads/',
  // uploadsUrl: 'http://192.168.1.16:6010/uploads/',
  // uploadsUrl: 'http://192.168.1.32:5000/uploads/',
  // uploadsUrl: 'http://192.168.1.16:5000/uploads/',

  // uploap://122.170.0.3:5000/uploads/',
  
  // WebAPIUrl: 'http://localhost:5000/v1/',
  // uploadsUrl: 'http://localhost:5000/uploads/',

};
