
$(document).ready(function() {
  renderApp()
});

async function createLab(e){
  lab = await DatArchive.create()
  await lab.mkdir('/contents')
  html = await archive.readFile('lab.html')
  html2 = html.replace(/{{DAT_ARCHIVE_URL}}/g, archive.url)
  await lab.writeFile('index.html', html2)
  labInfo = await lab.getInfo()

  // bioNodes.push(labInfo)
  currentLabs.push(labInfo)
  await archive.writeFile('/data/bionetArchive.json', JSON.stringify(currentLabs))
  window.location = lab.url
}

async function renderApp(){
  //settup dat
  try {
    archive = new DatArchive(window.location)
    archiveInfo = await archive.getInfo()
  } catch {
    console.log('Error reading dat')
  }
  //read data
  try {
    registeredLabs = await archive.readFile('/data/bionetArchive.json', 'utf-8')
    currentLabs = JSON.parse(registeredLabs)

    for(i = 0; i < currentLabs.length; i++){
      console.log(currentLabs[i].title) 
    }
  } catch {
    console.log('Error reading data from Bionet filesystem')
  }
  //mount frontend components
  try {
    $('.title').text(archiveInfo.title)
    $('.description').text(archiveInfo.description)
    $('.url').text(window.location)
    $('.addLabBtn').on('click', createLab)
  } catch {
    console.log('Error mounting front end components')
  }
}
