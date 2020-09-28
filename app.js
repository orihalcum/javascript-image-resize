function process() {
  let file = document.querySelector('#upload').files[0]

  if(!file) return 

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = e => {
    const imgElm = document.createElement('img')
    imgElm.src = e.target.result
    document.querySelector('#input').src =  imgElm.src

    imgElm.onload = (e) => {
      let canvas = document.createElement('canvas');
      const MAX_WIDTH = 1280
      const imgScale = MAX_WIDTH / e.target.width
      canvas.width = MAX_WIDTH
      canvas.height = e.target.height * imgScale
      const ctx = canvas.getContext('2d')
      ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)
      const srcEncoded = canvas.toDataURL(e.target, 'image/jpeg', 0.7)
      document.querySelector('#output').src = srcEncoded
      window.open(srcEncoded)
      console.log(e.target)
      console.log(srcEncoded)

      const downloadLink = document.createElement('a');
      document.body.appendChild(srcEncoded);

      downloadLink.href = linkSource;
      downloadLink.target = '_self';
      downloadLink.download = fileName;
      downloadLink.click(); 

    }
  }

}
