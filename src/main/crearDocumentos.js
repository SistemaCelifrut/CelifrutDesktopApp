/* eslint-disable prettier/prettier */
const ExcelJS = require("exceljs");

process.parentPort.once('message', async (data) => {
   try {
      const table = await JSON.parse(data.data.data)
      const workbook = new ExcelJS.Workbook();
      let worksheet = workbook.addWorksheet("Table")

      console.log(data.data.path)
      const headers = Object.keys(table[0]);

      worksheet.insertRow(1, headers);

      table.forEach(row => {
         worksheet.addRow(Object.values(row));
      });

      await workbook.xlsx.writeFile(data.data.path);

   } catch (error) {
      console.log(error)
   }

})