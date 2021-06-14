
const searchHandler = async (event) => {

    const query = document.querySelector('#search-bar').value.trim();

    if (query) {
        const response = await fetch('/api/users/search', {
            method: 'POST',
            body: JSON.stringify({ query }),
            headers: { 'Content-Type': 'application/json' },
        });
        const res = response.json()
        res.then((body) => {
            console.log(body);
        });
    }
};

if (document.querySelector('#search-bar')) {
    document
      .querySelector('#search-bar')
      .addEventListener('keydown', searchHandler);
}