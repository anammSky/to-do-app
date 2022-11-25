export default async function fetchGetAllTags() {
    try {
        const response = await fetch(`http://localhost:5001/tags`);
        const data = await response.json();
        return data;
      } catch (error) {
        alert(error.message);
      }
}