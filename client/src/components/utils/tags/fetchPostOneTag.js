export default async function fetchPostOneTag(tagTitle) {
    try {
        const response = await fetch("http://localhost:5001/tags", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: tagTitle,
            }),
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
