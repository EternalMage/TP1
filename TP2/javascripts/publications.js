$(document).ready(() => {
    const setTrashEvent = () => $('.fa-trash-o').click((e) => $(e.target).parent().parent().parent().remove())
    setTrashEvent()
})