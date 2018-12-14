document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('url').innerText = window.location
})

const labsData = window.localStorage.getItem('labs')
if(labsData) {
  labs = JSON.parse(labsData)
} else {
  labs = []
  window.localStorage.setItem('labs', '[]')
}

renderApp()

async function createLab(e){
  const lab = await DatArchive.create()
  await lab.mkdir('/contents')
  window.localStorage.setItem('labs', JSON.stringify(labs))
  const html = await archive.readFile('lab.html')
  html2 = html.replace(/{{DAT_ARCHIVE_URL}}/g, archive.url)
  await lab.writeFile('index.html', html2)
  await lab.commit()
  window.location = lab.url
  alert(lab.url)
}

function setTitle(title){
  document.title = title
}

async function renderApp(){
  try {
    archive = new DatArchive(window.location)
    archiveInfo = await archive.getInfo()
    seTitle(archiveInfo.title)
  } catch {
    console.log('You got problems')
  }
  document.querySelectorAll('.addLabBtn').forEach(el => el.addEventListener('click', createLab))
}