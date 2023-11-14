let list_html_string = ''
let itemarray = []

function js_add_element() {
  const input = document.querySelector('.js-input')
  const value = input.value.trim()
  if (value) {
    itemarray.push(value)
    input.value = ''
    update_elements()
  }
}

function js_remove_element() {
  if (itemarray.length > 0) {
    itemarray.pop()
    update_elements()
  }
}

function update_elements() {
  list_html_string = itemarray.map(item => `<div>${item}</div>`).join('')
  const elements = document.querySelector('.js-elements')
  elements.innerHTML = list_html_string
}
