import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer({ report }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(window.innerWidth * 0.8);

  // Adjust page width on window resize
  useEffect(() => {
    const handleResize = () => setPageWidth(window.innerWidth * 0.8);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function goToNextPage() {
    if (pageNumber < numPages)
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function goToPreviousPage() {
    if (pageNumber > 1) setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }

  return (
    <div className="flex flex-col items-center">
      <Nav
        pageNumber={pageNumber}
        numPages={numPages}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
      />

      <div
        className="flex justify-center items-center mt-4"
        style={{ width: "100%", height: "calc(100vh - 200px)" }}
      >
        <Document
          file={report.pdf}
          onLoadSuccess={onDocumentLoadSuccess}
          renderMode="canvas"
        >
          <Page
            pageNumber={pageNumber}
            width={pageWidth}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}

function Nav({ pageNumber, numPages, goToNextPage, goToPreviousPage }) {
  return (
    <nav className="flex justify-between items-center w-full px-6 py-4 bg-gray-900 text-white">
      <button
        onClick={goToPreviousPage}
        disabled={pageNumber === 1}
        className="p-2"
      >
        <BiChevronLeft size={30} />
      </button>
      <span className="text-center text-sm font-medium">
        Page {pageNumber} of {numPages}
      </span>
      <button
        onClick={goToNextPage}
        disabled={pageNumber === numPages}
        className="p-2"
      >
        <BiChevronRight size={30} />
      </button>
    </nav>
  );
}
