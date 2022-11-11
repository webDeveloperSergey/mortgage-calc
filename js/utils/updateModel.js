function updateModel(el, data) {
  el.dispatchEvent(new CustomEvent('updateForm', {
    bubbles: true,
    detail: {...data},
  }))
}

export default updateModel