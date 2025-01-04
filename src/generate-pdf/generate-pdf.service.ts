import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import Handlebars from 'handlebars';

@Injectable()
export class GeneratePdfService {

  async readFile(filePath): Promise<any> {
    const file = fs.readFileSync(filePath, 'utf-8');
    return file;
  }

  async populateTemplate(htmlString, objdata, res): Promise<any> {
    try {
      Handlebars.registerHelper('toLowerCase', (value) => { return (value && typeof value === 'string') ? value.toLowerCase() : '' });
      const template = Handlebars.compile(htmlString);
      const data = objdata.data
      return template(data)
    }
    catch (ex) {
      res.status(400).json({ response: "Error in parsing the specified template!" });
    }
  }
}
