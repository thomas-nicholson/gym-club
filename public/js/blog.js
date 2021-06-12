const newBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#Title').value.trim();
    const description = document.querySelector('#Description').value.trim();
    if (title && description) {
        const response = await fetch('/api/blog/newpost', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

if (document.querySelector('#new-blog-button')) {
    document
      .querySelector('#new-blog-button')
      .addEventListener('click', newBlogHandler);
}