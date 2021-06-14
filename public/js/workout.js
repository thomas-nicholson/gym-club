const addWorkoutHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#Title').value.trim();
    const description = document.querySelector('#Description').value.trim();
    const id = event.target.getAttribute('data-id');

    if (title && description) {
        const response = await fetch('/api/workout/add', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/userWorkouts/${id}`)
        } else {
            alert(response.statusText);
        }
    }
};

if (document.querySelector('#new-workout-button')) {
    document
      .querySelector('#new-workout-button')
      .addEventListener('click', addWorkoutHandler);
}
/* No Need to Edit workouts at this time
const updateWorkoutHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();

    //const id;

    if (title && description) {
        const response = await fetch('/api/workout/update/'+id, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};*/

const deleteWorkoutHandler = async (event) => {
    event.preventDefault();
    
        if (event.target.hasAttribute('data-id')) {
            const id = event.target.getAttribute('data-id')

        const response = await fetch('/api/workout/delete/'+id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

if ($('.deleteWorkout')) {
    $('.deleteWorkout').on('click', deleteWorkoutHandler)
}
