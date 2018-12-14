$(document).ready(function() {
  renderApp()
});

async function renderApp(){
  try {
    lab = new DatArchive(window.location)
    labInfo = await lab.getInfo()
  } catch {
    console.log('Error finding archive')
  }
  try {
    $('.title').text(labInfo.title)
    $('.description').text(labInfo.description)
    $(".url").text(window.location)
    $('.goHome').on('click', () => {
      window.location = 'dat://3f5b7195b6c488c3b6c157bbd163b9a86a1be5a129a0936b989fb5cff95a4785/'
    })
  } catch {
    console.log('Error mounting front end components')
  }
}