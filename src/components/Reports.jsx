import React from "react";

function Reports() {
  function createPDF() {
    // get elements of report data
    var report1 = document.getElementById("report1").innerHTML;

    var style = "<style>";
    style =
      style +
      "table {width: 100%;font: 17px Calibri;} body{font-size:12px; margin: 'auto'}";
    style =
      style +
      "table, th, td {border: solid 1px #DDD;color: black ;border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open("", "", "height=700,width=700");

    win.document.write("<title>Ninetees Report</title>"); // <title> FOR PDF HEADER.
    win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write("</head>");
    win.document.write(report1);
    // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write("</body></html>");

    win.document.close(); // CLOSE THE CURRENT WINDOW.

    win.print(); // PRINT THE CONTENTS.
  }
  const buttonStyleC = {
    boxShadow: "0px 5px 10px black",
    fontWeight: "bold",
    backgroundColor: "#005336",
    borderRadius: "30px",
  };
  return (
    <div>
      <div className="row float-right mr-5">
        <button
          className="btn btn-success pr-4 pl-4 mb-2"
          style={buttonStyleC}
          onClick={createPDF}
        >
          Download
        </button>
      </div>
      <div id="report1">
        <iframe
          title="report"
          width="100%"
          height="500"
          src="https://app.powerbi.com/reportEmbed?reportId=aeb9f0cd-0705-437c-b6e9-328826d12b81&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
}

export default Reports;
