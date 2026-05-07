const storyForm = document.getElementById('story-form');
if (storyForm) {
    storyForm.addEventListener('submit', storySubmit);
}

async function storySubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const isPublic = document.getElementById("public").checked;
    
    console.log("Story Attempt:", { title, description, isPublic });
    try {
        const response = await fetch('/story/createStory', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({ title, description, isPublic})

        });
    } catch (error) {
        console.error("Error creating story:", error);
    }







}