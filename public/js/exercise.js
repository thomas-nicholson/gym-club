const addExerciseHandler = async (event) => {
    event.preventDefault();

    const exercise = document.querySelector('#Exercise').value.trim();
    const reps = document.querySelector('#Reps').value.trim();
    const sets = document.querySelector('#Sets').value.trim();
    const id = document.querySelector('#new-exercise-button').getAttribute("data-post-id")
    if (exercise && reps && sets && id) {
        const response = await fetch('/api/exercise/add/'+id, {
            method: 'POST',
            body: JSON.stringify({ exercise, reps, sets }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

const updateExerciseHandler = async (event) => {
    event.preventDefault();

    const exercise = document.querySelector('#exercise').value.trim();
    const reps = document.querySelector('#reps').value.trim();
    const sets = document.querySelector('#sets').value.trim();
    //const id;
    if (exercise && reps && sets && id) {
        const response = await fetch('/api/exercise/update/'+ id, {
            method: 'PUT',
            body: JSON.stringify({ exercise, reps, sets }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

const deleteExerciseHandler = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id')
    if (id) {
        const response = await fetch('/api/exercise/delete/'+ id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

if (document.querySelector('#new-exercise-button')) {
    document
      .querySelector('#new-exercise-button')
      .addEventListener('click', addExerciseHandler);
}

if ($('.deleteExercise')) {
    $('.deleteExercise').on('click', deleteExerciseHandler)
}