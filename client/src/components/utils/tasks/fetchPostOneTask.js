export default async function fetchPostOneTask(userId ,title, content, finishBy) {
    try {
        const response = await fetch(`http://localhost:5001/user/${userId}/tasks`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: title,
            content: content,
            finishBy: finishBy || " "
        }),
      });
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}