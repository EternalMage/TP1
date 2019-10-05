$(document).ready(() => {
    const index = { page: '', id: 'home-link' }
    const projectsLink = 'projects-link'
    const pages = [{ page: 'project-maillouxmaster', id: projectsLink }, { page: 'project-nbourgoinmaster', id: projectsLink }, { page: 'projects', id: 'projects-link' }, { page: 'team', id: 'team-link' }, { page: 'publications', id: 'publications-link' }]

    const menuActive = (page, search) => {
        return (page.indexOf(search) === -1) ? false : true
    }

    const activateMenu = (id) => {
        $('#' + id).addClass('active')
    }

    const updateMenu = (pages) => {
        const url = $(document)[0].URL.split('/').pop()
        if (url === index.page) {
            activateMenu(index.id)
        } else {
            pages.map(p => {
                if (menuActive(p.page, url)) {
                    activateMenu(p.id)
                }
            })
        }
    }

    updateMenu(pages)
})