const alert = (message, alertType = 'success') => {
    /*template*/

    return `
  <div class="alert alert-${alertType}" role="alert">
  ${message}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
  `
}

export default alert;