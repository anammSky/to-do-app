export default async function fetchGetAllTasksOfUser(userId) {
    try {
      const response = await fetch(`http://localhost:5001/user/${userId}/tasks`);
      const data = await response.json();
      return data;
    } catch (error) {
      alert(error.message);
    }
  }
  
  