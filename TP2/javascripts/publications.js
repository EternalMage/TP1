$(document).ready(() => {
    /* 3.3.1. */
    const setTrashEvent = () => $('.fa-trash-o').click((e) => $(e.target).parent().parent().parent().remove())
    setTrashEvent()

    /* 3.3.2. */
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


    /* 3.3.3. */
    const order_by = ['desc', 'asc']
    const sort_by = ['date', 'title']
    const limit = [10, 20, 30, 50, 100]
    const defaultParam = { order_by: order_by[0], sort_by: sort_by[0], limit: limit[0] }

    const setPublications = (param = defaultParam) => {
        let acc = 0;

        $.map($('.publications tbody tr'), (p) => {
            acc++
            if (acc > 10) {
                alert(acc)
                $(p).remove()
            }
        })
    }

    setPublications()

})