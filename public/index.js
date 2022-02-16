require([
  "esri/widgets/Sketch",
  "esri/Map",
  "esri/layers/GraphicsLayer",
  "esri/views/MapView",
  "esri/identity/OAuthInfo", 
  "esri/identity/IdentityManager",
  "esri/portal/PortalQueryParams",
  "esri/portal/Portal"
], (Sketch, Map, GraphicsLayer, MapView, OAuthInfo, esriId,PortalQueryParams, Portal) => {

  const info = new OAuthInfo({
    // Swap this ID out with registered application ID
    appId: "oskpHjPU478RAynR",
    // Uncomment the next line and update if using your own portal
    // portalUrl: "https://<host>:<port>/arcgis"
    // Uncomment the next line to prevent the user's signed in state from being shared with other apps on the same domain with the same authNamespace value.
    // authNamespace: "portal_oauth_inline",
    popup: false
  });
  
  esriId.registerOAuthInfos([info]);

  esriId
    .checkSignInStatus(info.portalUrl + "/sharing")
    .then(() => {
      displayItems();
    })
    .catch(() => {
      // Anonymous view
      console.log("an error occured while logging in..")
    });
    const signIn = document.getElementById("sign-in")
    signIn.addEventListener("click", () => {
      // user will be redirected to OAuth Sign In page
      esriId.getCredential(info.portalUrl + "/sharing");
      
    });

    const signOut = document.getElementById("sign-out")
    signOut.addEventListener("click", () => {
      // user will be redirected to OAuth Sign In page
      roleDiv.style.display="none"
      esriId.destroyCredentials();
      window.location.reload();
    });

    function displayItems() {
      const portal = new Portal();
      // Setting authMode to immediate signs the user in once loaded
      portal.authMode = "immediate";
      // Once loaded, user is signed in
      portal.load().then(() => {
        // Create query parameters for the portal search
        const queryParams = new PortalQueryParams({
          query: "owner:" + portal.user.username,
          sortField: "numViews",
          sortOrder: "desc",
          num: 20
        });
        const roleDiv = document.getElementById("role")
        const userIndicator = document.getElementById("user-indicator")
        userIndicator.username =  portal.user.username;
        signIn.style.display="none"
        signOut.style.display="block"
        roleDiv.style.display="block"
        roleDiv.innerHTML=portal.user.role


        // anonPanelElement.style.display = "none";
        // personalPanelElement.style.display = "block";

        // // Query the items based on the queryParams created from portal above
        portal.queryItems(queryParams);
      });
    }

  const graphicsLayer = new GraphicsLayer();

  const map = new Map({
    basemap: "topo-vector",
    layers: [graphicsLayer]
  });

  const view = new MapView({
    container: "map-view",
    map: map,
    zoom: 5,
    center: [90, 45]
  });

  view.when(() => {
    const sketch = new Sketch({
      layer: graphicsLayer,
      view: view,
      layout:"vertical",
      availableCreateTools:['rectangle'],
      // graphic will be selected as soon as it is created
      creationMode: "single",
      visibleElements:{
        selectionTools:{
          "rectangle-selection":false,
          "lasso-selection": false
        },
        settingsMenu: false,
        undoRedoMenu:false,
      }
    });

    view.ui.add(sketch, "top-right");

  });

  var submitModalContours  = document.getElementById("submit-modal-contours")
  var submitButtonContours = document.getElementById('submit-contours')
  var submitModalImagery = document.getElementById("submit-modal-imagery")
  var submitButtonImagery = document.getElementById('submit-imagery')

  submitButtonContours.addEventListener('click', changeToLoadingContours)
  submitButtonImagery.addEventListener('click', changeToLoadingImagery)

  function changeToLoadingContours() {
    submitButtonContours.loading = !submitButtonContours.loading;
    console.log(document.getElementById("export-format").selectedItem.value);
    
    setTimeout(()=>{
      console.log("loaded")

      submitButtonContours.loading = !submitButtonContours.loading;
      submitModalContours.active = !submitModalContours.active
    }, 1000)
    console.log("helo")
    return
  }

  function changeToLoadingImagery() {
    submitButtonImagery.loading = !submitButtonImagery.loading;
    // console.log(document.getElementById("export-format").selectedItem.value);
    document.getElementById("success-modal-imagery").active = 
    setTimeout(()=>{
      console.log("loaded")

      submitButtonImagery.loading = !submitButtonImagery.loading;
      submitModalImagery.active = !submitModalImagery.active
    }, 1000)
    console.log("helo")
    return
  }

});

