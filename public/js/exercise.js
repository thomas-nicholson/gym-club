const addExerciseHandler = async (event) => {
    event.preventDefault();

    const exercise = document.querySelector('#exercise').value.trim();
    const reps = document.querySelector('#reps').value.trim();
    const sets = document.querySelector('#sets').value.trim();
    //const id;
    if (exercise && reps && sets && id) {
        const response = await fetch('/api/exercise/add/'+ id, {
            method: 'POST',
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

    //const id;
    if (id) {
        const response = await fetch('/api/exercise/delete/'+ id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};