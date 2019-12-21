const url = 'https://imadityang.github.io/web-dev-projects/custom-pdf-viewer/docs/pdf.pdf';

let pdfDoc = null,
      pageNum = 1,
      pageIsRendering = false,
      pageNumIsPending = null;
      
const scale = 1.5,
      canvas = document.querySelector('#pdf-render'),
      ctx = canvas.getContext('2d');

// Render the page
const renderPage = (num) => {
  pageIsRendering = true;
  
  // Get the page
  pdfDoc.getPage(num).then((page) => {
    // console.log(page);
    // Set scale
    const viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    const renderCtx = {
      canvasContext: ctx,
      viewport: viewport
    };
    
    page.render(renderCtx).promise.then(() => {
      pageIsRendering = false;
      
      if(pageNumIsPending !== null){
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });
    
    // Output current page
    document.querySelector('#page-num').textContent = num;
  });
};

// Check for pages rendering
const queueRenderPage = (num) => {
  if(pageIsRendering){
    pageNumIsPending = num;
  } else{
    renderPage(num);
  }
};

// Show Prev Page
const showPrevPage = () => {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
};

// Show Next Page
const showNextPage = () => {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
};

// Get the document
pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
  pdfDoc = pdfDoc_;
  
  document.querySelector('#page-count').textContent = pdfDoc.numPages;
  
  renderPage(pageNum);
}).catch((err) => {
  // Display err
  const div = document.createElement('div');
  div.className = 'error';
  div.appendChild(document.createTextNode(err.message));
  document.querySelector('body').insertBefore(div, canvas);
  
  // Remove top bar
  document.querySelector('.top-bar').style.display = 'none';
});

// Button events
document.querySelector('#prev-page').addEventListener('click', showPrevPage);
document.querySelector('#next-page').addEventListener('click', showNextPage);