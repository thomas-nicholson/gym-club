const newCommentHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment-box').value.trim();
    const id = document.querySelector('#comment-button').getAttribute("data-post-id");
    console.log(comment, id);
    if (comment && id) {
        const response = await fetch('/api/blog/comment/'+id, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

if (document.querySelector('#comment-button')) {
    document
      .querySelector('#comment-button')
      .addEventListener('click', newCommentHandler);
}

if (document.querySelector('#comment-form')) {
    document
      .querySelector('#comment-form')
      .addEventListener('submit', newCommentHandler);
}