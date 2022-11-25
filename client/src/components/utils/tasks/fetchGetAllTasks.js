export default async function fetchGetAllTasks() {
  try {
    const response = await fetch(`http://localhost:5001/tasks`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
}


