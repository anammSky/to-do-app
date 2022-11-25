export default async function fetchGetAllTasksOfUser(userId) {
    try {
        const response = await fetch(`http://localhost:5001/user/${userId}/tasks`);
        const data = await response.json();
        if (response.status === 200) {
            return data;
        } else {
            if (data.errors !== undefined) {
                alert(data.errors[0].msg);
                return;
            }
            alert(data.message);
        }
    } catch (error) {
        alert(error.message);
    }
}
