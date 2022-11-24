export default async function fetchGetOneTasks(taskId) {
    try {
      const response = await fetch(`http://localhost:5001/task/${taskId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      alert(error.message);
    }
  }
  

  