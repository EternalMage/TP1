$(document).ready(() => {

    const showDescription = (paragraphs) => {
        paragraphs.map(p => $('.jumbotron').append('<p>' + p + '</p>'))
    }

    const getDescription = () => {
        $.ajax({
            url: 'http://localhost:3000/api/description',
            context: document.body
        }).done((payloads) => showDescription(payloads.description.split('\n')));
    }

    getDescription()
})