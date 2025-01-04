# HTML to PDF service
This service built with Nest JS converts HTML to PDF with the help of Puppeteer.

# Dependencies
- Puppeteer
- Chromium
- NPM
- node
- Handlebars
- Multer
- Jest

# Execution

```sh
npm i
nest start #OR
npm run start # OR npm run start:dev

#for api endpoint and request response structure (Swagger)
http://localhost:3000/api


Endpoints:
1: http://localhost:3000/upload-template #upload template to your specified directory, see swagger for details
2: http://localhost:3000/htmltopdf #converts html string to pdf, see swagger for details
3: http://localhost:3000/generate-pdf #populate html tempalte and convert to pdf, see swagger for details
