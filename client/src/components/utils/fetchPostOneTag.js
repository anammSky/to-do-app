export default async function fetchPostOneTag(tagTitle) {
    try {
        const response = await fetch('http://localhost:5001/tags', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: {
                title: tagTitle
            }
        })
    } catch (error) {
       alert(error.message) 
    }
}