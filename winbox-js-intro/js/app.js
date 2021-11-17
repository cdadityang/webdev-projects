const about = document.getElementById("about");
const contact = document.getElementById("contact");
const aboutContent = document.getElementById("about-content");
const contactContent = document.getElementById("contact-content");

about.addEventListener('click', () => {
  const aboutBox = new WinBox({
    title: 'About Me',
    // modal: true,
    width: '400px',
    height: '500px',
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    mount: aboutContent,
    onfocus: function () {
      this.setBackground('#00AA00')
    },
    onblur: function () {
      this.setBackground('#777777')
    }
  });
});

contact.addEventListener('click', () => {
  const contactBox = new WinBox({
    class: "modern",
    title: 'Contact Me',
    // modal: true,
    width: '400px',
    height: '400px',
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    mount: contactContent,
    onfocus: function () {
      this.setBackground('linear-gradient(90deg,#ff00f0,#0050ff)')
    },
    onblur: function () {
      this.setBackground('#777777')
    }
  });
});