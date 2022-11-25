export default async function fetchDeleteOneTask(taskId) {
    try {
      const response = await fetch(`http://localhost:5001/tasks/${taskId}`, {
        method: DELETE
      });
      const data = await response.json();
      return data;
    } catch (error) {
      alert(error.message);
    }
  }
  
  
  