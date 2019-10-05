$(document).ready(() => {
    const setTrashEvent = () => $('.fa-trash-o').click((e) => $(e.target).parent().parent().parent().remove())
    setTrashEvent()

    const setMinus = () => $('.fa-minus').click((e) => $(e.target).parent().remove())
    const setAddAuthor = () => {
        $('.fa-plus').click((e) => {
            const newAuthor = `
              <span id="author">
                <input type="text" name="authors[]" placeholder="Auteurs" value="Auteur test" minlength="5" required="">
                <i class="fa fa-minus fa-3x"></i>
              </span>
            `
            $('.author-input').append(newAuthor)
            setMinus()
        })
    }
    setAddAuthor()
})