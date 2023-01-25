const fs = require("fs");
const { relative } = require("path");
const path = require("path");
const PDFDocument = require("pdfkit");

class MyHelper{
    static resHandler = (res, statusCode, apiStatus, data, message)=>{
        res.status(statusCode).send({
            apiStatus,
            data, 
            message
        })
    }

    static generatePdf = async (pdfName, data) => {
        const doc = new PDFDocument();
        doc.pipe(
            fs.createWriteStream(
                path.join(__dirname, `../uploads/pdf/${pdfName}.pdf`)
            ),
        );
        doc.fontSize(30).text(JSON.stringify(data), 100, 100);
        doc.end();
        return doc;
            }

    static getFilePath = (relativePath) => {
                return path.join(__dirname, relativePath).replaceAll("\\", "/");
            };
}
module.exports=MyHelper