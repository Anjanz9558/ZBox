// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  // For Local
  // WebAPIUrl: 'http://localhost:5000/v1/',
  WebAPIUrl: 'http://192.168.1.16:6010/v1/',
  // WebAPIUrl: 'http://192.168.1.32:5000/v1/',
  // WebAPIUrl: 'http://192.168.1.16:5000/v1/',

  // WebAPIUrl: 'https://tempspectrodevbackend.onrender.com/v1/',
  // uploadsUrl: 'https://tempspectrodevbackend.onrender.com/uploads/',
  uploadsUrl: 'http://192.168.1.16:6010/uploads/',
  uploadedUrl: 'http://192.168.1.21:5000/uploads/photos/',
  // uploadsUrl: 'http://192.168.1.32:5000/uploads/',
  // uploadsUrl: 'http://192.168.1.16:5000/uploads/',

  // uploap://122.170.0.3:5000/uploads/',
  
  // WebAPIUrl: 'http://localhost:5000/v1/',
  // uploadsUrl: 'http://localhost:5000/uploads/',

};
