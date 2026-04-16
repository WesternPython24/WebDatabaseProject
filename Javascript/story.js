let storyForm = document.getElementById('story-form');
storyForm.addEventListener('submit', storySubmit)

function storySubmit(e) {
    e.preventDefault();
    const storyAttempt = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        public: document.getElementById("public").checked
    }
    console.log("Story Attempt:", storyAttempt)
}