import { HttpStatus, HttpException } from '@nestjs/common';
import axios from "axios";

export async function callMediaApiToUpload(buffer, reqbody): Promise<any> {
  const bodyFormData: any = new FormData();
  const file: any = new Blob([buffer])
  bodyFormData.append('file', file, `${reqbody.pdfName}.pdf`);
  if (reqbody.expiryTime) {
    bodyFormData.append('expiryTime', reqbody.expiryTime);
  }
  const response = await axios({
    method: 'post',
    url: process.env.MEDIA_UPLOAD_URL,
    headers: { "Content-Type": "multipart/form-data" },
    data: bodyFormData
  }).then(function (response) {
    return response
  })
    .catch(function (response) {
      console.error('Error making Axios POST request:', response);
      throw new HttpException('Failed to make Axios POST request', HttpStatus.INTERNAL_SERVER_ERROR);
    });
  return response
}