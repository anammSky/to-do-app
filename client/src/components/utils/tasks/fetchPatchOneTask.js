export default async function fetchPatchOneTask(taskId, title, content, isComplete, finishBy) {
    try {
        const response = await fetch(`http://localhost:5001/task/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                content: content,
                isComplete: isComplete,
                finishBy: finishBy,
            }),
        });
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
