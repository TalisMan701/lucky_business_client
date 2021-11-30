import React, {useState} from 'react';
import { Document, Page } from 'react-pdf';

import oferta from '../PDFs/oferta.pdf'

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;



const options = {
	cMapUrl: 'cmaps/',
	cMapPacked: true,
};

const Pdf = (props) => {
	const [file, setFile] = useState(oferta);
	const [numPages, setNumPages] = useState(null);

	function onFileChange(event) {
		setFile(event.target.files[0]);
	}

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	return (
		<div>
			<Document
				file={file}
				onLoadSuccess={onDocumentLoadSuccess}
				options={options}
			>
				{Array.from(new Array(numPages), (el, index) => (
					<Page key={`page_${index + 1}`} pageNumber={index + 1} />
				))}
			</Document>
		</div>
	);
};

export default Pdf;
