// Front end icon javascript that connect to backend
// Handlebars will have to have a selection of which image they want
// Then depending on the image they choose the url of that images will be passed as JSON in here to the back PUT request which changes the image

const updateIcon = async (event) => {
    // event.preventDefault();
    // This data id will come from the picture update button
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const picture = event.target.getAttribute('value');
      

        const response = await fetch(`/api/users/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ picture }),
            headers: { 'Content-Type': 'application/json' },
          });
    
          if (response.ok) {
            document.location.replace(`/user/${id}`);
          } else {
            console.log('ERROR')
          }
      }
  };

  function noScroll() {
    window.scrollTo(0, 0);
  }
  
  $('.chooseImage').on('click', updateIcon);
  $('.change-image').on('click', () => {
    $('.icon-model').css('display', 'flex')
    window.addEventListener('scroll', noScroll);
  })
  $('.back-button').on('click', () => {
    $('.icon-model').css('display', 'none')
    window.removeEventListener('scroll', noScroll);
  })
