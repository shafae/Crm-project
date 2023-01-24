const paymentModel = require("../../db/models/payment.model")
const myHelper = require("../helper")
const fs = require("fs")
class payment {


}
    const generateBasicPdf = async (pdfName, data) => {
    const doc = new PDFDocument();
    doc.pipe(
        fs.createWriteStream(
            path.join(__dirname, `../../public/pdf/${pdfName}.pdf`),
        ),
    );
    doc.fontSize(25).text(JSON.stringify(data), 100, 100);
    doc.end();
    return doc;
        }