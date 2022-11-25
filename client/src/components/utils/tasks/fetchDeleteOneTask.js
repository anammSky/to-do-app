export default async function fetchDeleteOneTask(taskId) {
    try {
        const response = await fetch(`http://localhost:5001/task/${taskId}`, {
            method: "DELETE",
        });
        const data = await response.json();
        if (response.status === 201) {
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
