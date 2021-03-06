/**
 * Create a new presentation for every row in a spreadsheet. This code assumes
 * that the data is in the first sheet (workbook) in the spreadsheet and has the
 * columns "Title", "Content", and "Emails" in that order, with multiple email
 * addresses separated by a comma.
 */
function createPresentationsFromSpreadsheet() {
  // Open the spreadsheet and get the data.
  var ss = SpreadsheetApp.openByUrl('ENTER SPREADSHEET URL HERE');
  var sheet = ss.getSheets()[0];
  var data = sheet.getDataRange().getValues();

  // Remove any frozen rows from the data, since they contain headers.
  data.splice(sheet.getFrozenRows());

  // Create a presentation for each row.
  data.forEach(function(row) {
    var title = row[0];
    var content = row[1];
    var emails = row[2];

    // Split the emails into an array and remove extra whitespace.
    emails = emails.split(',').map(function(email) {
      return email.trim();
    });

    // Create the presentation, insert a new slide at the start, append the content,
    // and share it out.
    var presentation = SlidesApp.create(title);
    var slide = presentation.insertSlide(0, SlidesApp.PredefinedLayout.MAIN_POINT);
    var textBox = slide.getShapes()[0];
    textBox.getText().appendParagraph(content);
    presentation.addEditors(emails);
  });
}
