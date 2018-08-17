const renderContacts = () => {
    const storage = window.localStorage
    const contacts = JSON.parse(storage.getItem('contacts'))
    
    let div = document.querySelector('.contact-list')

    if (contacts) {
        div.innerHTML = ''

        const ul = document.createElement('ul')

        contacts.forEach(contact => {
            let li = document.createElement('li')
            li.innerHTML = `
                    <div class ="block w-auto text-center text-grey-dark></div>
                            <div class="flex max-w w-auto overflow-hidden bg-grey">
                                    <img class="rounded-full opacity-75 w-1/2 m-2" src="https://www.haikudeck.com/static/img/hd-avatar.png" />
                                        </div>
                                        <text class="flex flex-col bg-grey rounded-sm text-2xl font-light text-center text-white mb-1 px-4 py-2">${ contact.name }</text>
                                            
                                        <text class=" flex text-xs font-light text-grey-dark text-left px-2">email</text>
                                                <text class=" flex text-xs font-light border-b hover:border-grey-dark text-grey-darkest text-left px-2 py-1">${ contact.email }</text>

                                            <text class="flex text-xs font-light  leading-tight text-grey-dark text-left px-2 pt-1">phone</text>
                                                <text class="flex text-xs font-light border-b hover:border-grey-dark leading-tight text-grey-darkest text-left px-2 py-1">${ contact.phone }</text>

                                                <text class="flex text-xs font-light  leading-tight text-grey-dark text-left px-2 pt-1">company</text>
                                                    <text class="flex text-xs font-light border-b hover:border-grey-dark leading-tight text-grey-darkest text-left px-2 py-1">${ contact.company }</text>

                                                    <text class="flex text-xs font-light  leading-tight text-grey-dark text-left px-2 pt-1">notes</text>
                                                    <text class="flex text-xs font-light border-b hover:border-grey-dark leading-tight text-grey-darkest text-left px-2 py-1">${ contact.notes }</text>

                                                            <text class="flex text-xs font-light border-b hover:border-grey-dark leading-tight text-grey-darkest text-left mb-8 px-2"><a href="https://www.twitter.com/${ contact.twitter}">
                                                        <div class="w-6 items-center leading-tight">
                                                            <img src= "https://cdn2.iconfinder.com/data/icons/minimalism/512/twitter.png" /></a>    @${ contact.twitter}</text>
                                                        
                                                                </div>
                                                                    </div>
                                                                        </div>
                                                                            </div>
                                                                                </div>
            `
            ul.appendChild(li)
        })
        
        div.appendChild(ul)
    } else {
        div.innerHTML = '<p class>You have no contacts in your address book</p>'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderContacts()
    const addContactForm = document.querySelector('.new-contact-form')
    addContactForm.addEventListener('submit', event => {
        event.preventDefault()
        const storage = window.localStorage
        
        const {
            name,
            email,
            phone,
            company,
            notes,
            twitter,
        } = addContactForm.elements

        const contact = {
            id: Date.now(),
            name: name.value,
            email: email.value,
            phone: phone.value,
            company: company.value,
            notes: notes.value,
            twitter: twitter.value,
        }

        console.log(`Saving the following contact: ${JSON.stringify(contact)}`)
        let contacts = JSON.parse(storage.getItem('contacts')) || []
        contacts.push(contact)
        storage.setItem('contacts', JSON.stringify(contacts))
        renderContacts()
        addContactForm.reset()
    })
})