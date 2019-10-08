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
    const url = new URL(document.location.href)
    const search_params = new URLSearchParams(url.search)
    const url_order_param = search_params.get('order_by')
    const url_sort_param = search_params.get('sort_by')
    const url_limit_param = search_params.get('limit')
    
    const month_order = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
    const order_by_desc = 'desc'
    const order_by_asc = 'asc'
    const sort_by_title = 'title'
    const sort_by_date = 'date'
    const defaultParam = { order_by: url_order_param, sort_by: url_sort_param, limit: url_limit_param !== null ? url_limit_param : 10 }
    const defaultElements = $('.publications tbody tr').clone()

    let currentValue = Object.assign({}, defaultParam)

    const resetPublicationsDisplay = () => {
        $('.publications tbody').empty()
        $('.publications tbody').append(defaultElements.clone())
    }

    const getPubOrderedByTitle = () => {
        const publications = []
        $.map($('.publications tbody tr'), (p) => {
            const currentTitle = $(p).find('.pubtitle').text()

            publications.push({ element: p, title: currentTitle })
        })

        return publications.sort((a, b) => { return a.title > b.title ? 1 : -1; })
    }
    const getPubOrderedByDate = () => {
        const publications = []

        $.map($('.publications tbody tr'), (p) => {
            const currentYear = $(p).find('.annee').text()
            const currentMonth = $(p).find('.mois').text()

            publications.push({ element: p, year: currentYear, month: currentMonth })
        })

        return publications.sort((a, b) => {
            if (a.year - b.year === 0) {
                return month_order.indexOf(a.month) - month_order.indexOf(b.month);
            }

            return a.year - b.year;
        })
    }
    const setPublicationOrder = (sort_by, order_by) => {
        let orderedPublications = []

        if (sort_by === sort_by_title) {
            orderedPublications = getPubOrderedByTitle()
            document.getElementById("fieldFilterSection").selectedIndex = 1;
        } else {
            orderedPublications = getPubOrderedByDate()
            document.getElementById("fieldFilterSection").selectedIndex = 0;
        }

        if (order_by === order_by_asc) {
            document.getElementById("filterAscValueSection").selectedIndex = 1;
        }
        else{
            orderedPublications.reverse()
            document.getElementById("filterAscValueSection").selectedIndex = 0;
        }

        $('.publications tbody').empty()
        orderedPublications.map(p => $('.publications tbody').append(p.element))

    }

    const setPublicationLimit = (limit) => {
        let acc = 0;
        let limitToIndexArr = {10: 0, 20: 1, 30: 2, 50: 3, 100: 4}
        let elementId = document.getElementById("elementsPerPageSection")
        limitToIndexArr[limit] !== undefined ? elementId.selectedIndex = limitToIndexArr[limit] : elementId.selectedIndex = 1;

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
        setTrashEvent()
    }

    const setEventSort = () => $('#fieldFilterSection').change((e) => {
        currentValue.sort_by = e.target.value
        search_params.set('sort_by', e.target.value)
        url.search=search_params
        document.location.href = url
        //setPublications()
    })
    const setEventOrder = () => $('#filterAscValueSection').change((e) => {
        currentValue.order_by = e.target.value
        search_params.set('order_by', e.target.value)
        url.search=search_params
        document.location.href = url
        //setPublications()
    })
    const setEventLimit = () => $('#elementsPerPageSection').change((e) => {
        currentValue.limit = e.target.value
        currentValue.limit = e.target.value
        search_params.set('limit', e.target.value)
        url.search=search_params
        document.location.href = url
        //setPublications()
    })


    setEventSort()
    setEventOrder()
    setEventLimit()
    setPublications()




})