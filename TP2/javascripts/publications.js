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
    const month_order = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
    const order_by_desc = 'desc'
    const order_by_asc = 'asc'
    const sort_by_title = 'title'
    const sort_by_date = 'date'
    const defaultParam = { order_by: order_by_desc, sort_by: sort_by_date, limit: 10 }
    const defaultElements = $('.publications tbody tr').clone()

    let currentValue = Object.assign({}, defaultParam)

    const resetPublicationsDisplay = () => {
        $('.publications tbody').empty()
        $('.publications tbody').append(defaultElements.clone())
    }

    const setPublicationOrder = (sort_by, order_by) => {
        const orderedPublications = []
        $.map($('.publications tbody tr'), (p) => {
            const currentYear = $(p).find('.annee').text()
            const currentMonth = $(p).find('.mois').text()

            orderedPublications.push({ element: p, year: currentYear, month: currentMonth })
        })

        orderedPublications.sort((a, b) => {
            if (a.year - b.year === 0) {
                return month_order.indexOf(a.month) - month_order.indexOf(b.month);
            }

            return a.year - b.year;
        })

        if (order_by === order_by_desc) {
            orderedPublications.reverse()
        }

        $('.publications tbody').empty()
        orderedPublications.map(p => $('.publications tbody').append(p.element))

    }

    const setPublicationLimit = (limit) => {
        let acc = 0;

        $.map($('.publications tbody tr'), (p) => {
            acc++
            if (acc > limit) {
                $(p).remove()
            }
        })
    }

    const setPublications = (param = currentValue) => {
        resetPublicationsDisplay()
        setPublicationOrder(param.sort_by, param.order_by)
        setPublicationLimit(param.limit)
    }

    const setEventOrder = () => $('#filterAscValueSection').change((e) => {
        currentValue.order_by = e.target.value
        setPublications()
    })
    const setEventLimit = () => $('#elementsPerPageSection').change((e) => {
        currentValue.limit = e.target.value
        setPublications()
    })

    setEventOrder()
    setEventLimit()
    setPublications()




})