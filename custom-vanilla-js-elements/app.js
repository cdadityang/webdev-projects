const modal = document.getElementById('modal');
const backDrop = document.getElementById('backdrop');
const modalBtn = document.getElementById('modal-open-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');

function openModal(){
  modal.style.display = 'block';
  backDrop.style.display = 'block';
}

function closeModal(){
  modal.style.display = 'none';
  backDrop.style.display = 'none';
}

modalBtn.addEventListener('click', openModal);
backDrop.addEventListener('click', closeModal);
modalCancelBtn.addEventListener('click', closeModal);