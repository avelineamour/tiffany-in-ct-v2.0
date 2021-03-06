$(() => {
  bindClickHandlers()
})


function bindClickHandlers() {
  $('.all_sites').on('click', e => {
    e.preventDefault()
    //debugger
    history.pushState(null, null, "sites")
    getSites()
  })

  $(document).on('click', ".show_link", function(e) {
    e.preventDefault()
    $('#app-container').html('')
    //console.log($(this).attr('data-id'))
    let id = $(this).attr('data-id')
    fetch(`/sites/${id}.json`)
    .then(res => res.json())
    .then(site => {
      let newSite = new Site(site)
      let siteHtml = newSite.formatShow()
      $('#app-container').append(siteHtml)
    })
  })

  $(document).on('click', '.next-site', function() {
    console.log($(this).attr('data-id'))
    let id = $(this).attr('data-id')
    fetch(`/sites/${id}/next.json`)
    .then(res => res.json())
    .then(site => {
      let newSite = new Site(site)
      let siteHtml = newSite.formatShow()
      $('#app-container').append(siteHtml)
    })
  })
}

  const getSites = () => {
    fetch(`/sites.json`)
    .then(res => res.json())
    .then(sites => {
      $('#app-container').html('')
      sites.forEach(site => {
        let newSite = new Site(site)
        let siteHtml = newSite.formatIndex()
        $('#app-container').append(siteHtml)
      })
    })
}

$(function(){
 $("a.showWindows").on("click", function(e){
   alert("You clicked this link")
   e.preventDefault();
  })
 })

function Site(site){
  this.id = site.id
  this.image = site.image
  this.name = site.name
  this.street_address = site.street_address
  this.city = site.city
}

Site.prototype.formatIndex = function(){
  let siteHtml = `
  <div class="col-lg-4 col-sm-6 portfolio-item">
  <img class="card-img-top" src="${this.image}">
  <div class="card h-100">
  <a href="/sites/${this.id}" data-id="${this.id}" class="show_link"><h1>${this.name}</h1></a>
  </div>
  </div>
  `
  return siteHtml
}

//using the link within this you should be able to format a fetch function which retrieves
//the windows associated with the site similiar to the show_link function above, appending the
//windows to the site.
Site.prototype.formatShow = function(){
  let siteHtml = `
    <h1>${this.name}</h1>
    <h3>${this.street_address}</h3>
    <h3>${this.city}</h3>
    <br></br>
    <div class="siteWindows">
    <a href="/sites/${this.id}" data-id="${this.id}" id="show-windows-js" class="showWindows"><h1>Show Windows</h1></a>
    </div>
    <button class="next-site" data-id="${this.id}">Next Site</button>
  `
  return siteHtml
}
